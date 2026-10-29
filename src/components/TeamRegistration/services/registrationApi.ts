import { RegistrationApiResponse, RegistrationFormData } from '../types';
import { supabase } from '../../../lib/supabase';

const LOCAL_STORAGE_KEY = 'sci2026_registered_teams';

/**
 * Team Registration API Service
 * Saves registration directly to PostgreSQL relational tables ('profiles', 'teams', 'team_members', 'payments')
 * and Supabase Storage ('payment-screenshots').
 *
 * NOTE: Automatic email dispatch and Supabase Auth email triggers have been removed.
 * All confirmation and announcement emails are managed manually by the organizing committee.
 */
export async function submitTeamRegistration(
  formData: RegistrationFormData
): Promise<RegistrationApiResponse> {
  const payload = {
    teamName: formData.leader.teamName.trim(),
    teamSize: formData.teamSize,
    teamLeader: {
      fullName: formData.leader.fullName.trim(),
      email: formData.leader.email.trim().toLowerCase(),
      phone: formData.leader.phone.trim(),
      college: formData.leader.college.trim(),
      department: formData.leader.department.trim(),
      yearOfStudy: formData.leader.yearOfStudy.trim(),
      password: formData.leader.teamPassword || 'Smart2026!',
    },
    members: formData.members.slice(0, formData.teamSize - 1).map((m, idx) => ({
      memberNumber: idx + 1,
      fullName: m.fullName.trim(),
      email: m.email.trim().toLowerCase(),
      phone: m.phone.trim(),
      college: m.college.trim(),
      department: m.department.trim(),
      yearOfStudy: m.yearOfStudy.trim(),
      rollNumber: m.rollNumber?.trim() || '',
    })),
    payment: {
      registrationFee: formData.payment.registrationFee || 600,
      transactionId: formData.payment.transactionId.trim(),
      screenshotFileName: formData.payment.screenshotFileName || 'payment_screenshot.png',
      verificationStatus: 'PENDING_VERIFICATION' as const,
      submissionStatus: 'PENDING_VERIFICATION' as const,
    },
    registeredAt: new Date().toISOString(),
  };

  try {
    // -------------------------------------------------------------------------
    // 1. Check for Duplicate Team Name in Supabase
    // -------------------------------------------------------------------------
    const { data: existingTeam } = await supabase
      .from('teams')
      .select('id, team_name')
      .ilike('team_name', payload.teamName)
      .maybeSingle();

    if (existingTeam) {
      return {
        success: false,
        message: `The team name "${payload.teamName}" is already registered. Please choose a different team name.`,
        error: 'Duplicate team name',
      };
    }

    // -------------------------------------------------------------------------
    // 2. Identify or Create Team Leader Profile
    // (Bypasses Supabase Auth SMTP to avoid 'email rate limit exceeded' errors)
    // -------------------------------------------------------------------------
    let leaderUserId: string;

    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', payload.teamLeader.email)
      .maybeSingle();

    if (existingProfile?.id) {
      leaderUserId = existingProfile.id;
      // Update existing leader profile with latest submitted details
      await supabase.from('profiles').update({
        full_name: payload.teamLeader.fullName,
        phone: payload.teamLeader.phone,
        college_name: payload.teamLeader.college,
        course: payload.teamLeader.department,
        year_of_study: payload.teamLeader.yearOfStudy,
        updated_at: new Date().toISOString(),
      }).eq('id', leaderUserId);
    } else {
      leaderUserId = crypto.randomUUID();
      const { error: profileError } = await supabase.from('profiles').insert({
        id: leaderUserId,
        full_name: payload.teamLeader.fullName,
        email: payload.teamLeader.email,
        phone: payload.teamLeader.phone,
        college_name: payload.teamLeader.college,
        course: payload.teamLeader.department,
        year_of_study: payload.teamLeader.yearOfStudy,
      });

      if (profileError) {
        console.warn('[Supabase Profile Insert Notice]:', profileError.message);
      }
    }

    // -------------------------------------------------------------------------
    // 3. Upload Payment Screenshot to Supabase Storage
    // -------------------------------------------------------------------------
    let screenshotStoragePath = `receipts/${payload.teamName.replace(/\s+/g, '_')}_${Date.now()}.png`;

    if (formData.payment.screenshotFile) {
      const file = formData.payment.screenshotFile;
      const fileExt = file.name.split('.').pop() || 'png';
      const safePath = `${leaderUserId}/${Date.now()}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('payment-screenshots')
        .upload(safePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (!uploadError && uploadData) {
        screenshotStoragePath = uploadData.path;
      } else {
        console.warn('[Supabase Storage Upload Notice]:', uploadError?.message);
        screenshotStoragePath = `pending-review/${file.name}`;
      }
    }

    // -------------------------------------------------------------------------
    // 4. Create Team in 'teams' Table
    // -------------------------------------------------------------------------
    const { data: newTeam, error: teamInsertError } = await supabase
      .from('teams')
      .insert({
        team_name: payload.teamName,
        team_leader_id: leaderUserId,
        team_size: payload.teamSize,
        registration_status: 'pending',
        team_password: payload.teamLeader.password,
      })
      .select('id, team_name, created_at')
      .single();

    if (teamInsertError || !newTeam) {
      throw new Error(`Failed to create team record: ${teamInsertError?.message || 'Database insert error'}`);
    }

    // Format human-friendly registration reference code (e.g. SCI26-TEAM-8492)
    const referenceId = `SCI26-TEAM-${newTeam.id.slice(0, 4).toUpperCase()}`;

    // -------------------------------------------------------------------------
    // 5. Register Team Leader in 'team_members' Table
    // -------------------------------------------------------------------------
    await supabase.from('team_members').insert({
      team_id: newTeam.id,
      user_id: leaderUserId,
      member_role: 'leader',
    });

    // -------------------------------------------------------------------------
    // 6. Register Additional Team Members in 'profiles' and 'team_members'
    // -------------------------------------------------------------------------
    for (const member of payload.members) {
      const memberUserId = crypto.randomUUID();

      const { data: createdMemberProfile } = await supabase
        .from('profiles')
        .insert({
          id: memberUserId,
          full_name: member.fullName,
          email: member.email,
          phone: member.phone,
          college_name: member.college,
          course: member.department,
          year_of_study: member.yearOfStudy,
        })
        .select('id')
        .maybeSingle();

      const actualMemberId = createdMemberProfile?.id || memberUserId;

      await supabase.from('team_members').insert({
        team_id: newTeam.id,
        user_id: actualMemberId,
        member_role: 'member',
      });
    }

    // -------------------------------------------------------------------------
    // 7. Record Payment in 'payments' Table
    // -------------------------------------------------------------------------
    await supabase.from('payments').insert({
      team_id: newTeam.id,
      submitted_by: leaderUserId,
      amount: payload.payment.registrationFee,
      transaction_id: payload.payment.transactionId,
      payment_screenshot_path: screenshotStoragePath,
      payment_status: 'pending',
    });

    // -------------------------------------------------------------------------
    // 8. Sync to Local Storage for Seamless Instant Offline/Client State
    // -------------------------------------------------------------------------
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      try {
        const rawExisting = window.localStorage.getItem(LOCAL_STORAGE_KEY);
        const teamsList = rawExisting ? JSON.parse(rawExisting) : [];
        teamsList.push({
          id: newTeam.id,
          teamName: payload.teamName,
          referenceId,
          leaderEmail: payload.teamLeader.email,
          teamLeader: payload.teamLeader,
          members: payload.members,
          transactionId: payload.payment.transactionId,
          verificationStatus: 'PENDING_VERIFICATION',
          paymentStatus: 'pending',
          screenshotPath: screenshotStoragePath,
          timestamp: Date.now(),
        });
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(teamsList));
      } catch (storageErr) {
        console.warn('Local storage sync warning:', storageErr);
      }
    }

    return {
      success: true,
      referenceId,
      teamName: payload.teamName,
      message: 'Registration and payment details submitted to Supabase successfully. Awaiting administrator verification.',
    };
  } catch (err: unknown) {
    console.error('[Registration API Error]:', err);
    const errorMsg = err instanceof Error ? err.message : 'An unexpected error occurred during registration.';
    return {
      success: false,
      message: errorMsg,
      error: errorMsg,
    };
  }
}

export const submitRegistration = submitTeamRegistration;
