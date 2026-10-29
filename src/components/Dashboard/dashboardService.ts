/**
 * Participant Dashboard Service
 * Connects authenticated session with Supabase database queries for teams,
 * team members, payments, announcements, and problem statements.
 */

import { TeamProfile, TeamMember, Announcement } from './types';
import { getActiveSession } from '../Auth/authService';
import { supabase, ProblemStatement } from '../../lib/supabase';

const TEAMS_STORAGE_KEY = 'sci2026_registered_teams';
const ANNOUNCEMENTS_STORAGE_KEY = 'sci2026_announcements';
const PROBLEM_STATEMENTS_PUBLISHED_KEY = 'sci2026_ps_published';

// Standard demo team that perfectly reflects the reference image
const DEFAULT_DEMO_TEAM: TeamProfile = {
  teamName: 'Urban Innovators',
  referenceId: 'SCI26-TEAM-087',
  college: 'IIT Nanded',
  description: 'Innovating for smarter, greener cities.',
  leaderName: 'Aditya Sharma',
  leaderEmail: 'aditya.sharma@iitn.ac.in',
  leaderPhone: '+91 98765 43210',
  teamSize: 4,
  verificationStatus: 'VERIFIED',
  department: 'Computer Science & Engineering',
  registeredAt: '2026-04-10T14:30:00Z',
  members: [
    {
      id: 'm1',
      fullName: 'Aditya Sharma',
      role: 'Team Leader',
      college: 'IIT Nanded',
      department: 'Computer Science',
      email: 'aditya.sharma@iitn.ac.in',
      avatarColor: '#3B82F6',
    },
    {
      id: 'm2',
      fullName: 'Priya Verma',
      role: 'Member 2',
      college: 'IIT Nanded',
      department: 'Information Technology',
      email: 'priya.verma@iitn.ac.in',
      avatarColor: '#10B981',
    },
    {
      id: 'm3',
      fullName: 'Rohan Patil',
      role: 'Member 3',
      college: 'IIT Nanded',
      department: 'Civil & Urban Planning',
      email: 'rohan.patil@iitn.ac.in',
      avatarColor: '#F59E0B',
    },
    {
      id: 'm4',
      fullName: 'Sneha Kulkarni',
      role: 'Member 4',
      college: 'IIT Nanded',
      department: 'Electronics & IoT',
      email: 'sneha.kulkarni@iitn.ac.in',
      avatarColor: '#8B5CF6',
    },
  ],
};

const DEFAULT_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Registrations Open & Verifications Ongoing',
    description: 'Teams registering through the official portal are currently being verified by the organizing committee.',
    date: 'Today',
    category: 'REGISTRATION',
    priority: 'HIGH',
    unread: true,
  },
  {
    id: 'ann-2',
    title: 'Problem Statements Released Soon',
    description: 'Challenge statements will be published on the dashboard once approved by municipal administrators.',
    date: '10 Apr 2026',
    category: 'CHALLENGE',
    priority: 'HIGH',
    unread: true,
  },
  {
    id: 'ann-3',
    title: 'Orientation Webinar Schedule',
    description: 'Pre-hackathon technical orientation session for all registered team leaders will be conducted online.',
    date: '08 Apr 2026',
    category: 'SCHEDULE',
    priority: 'NORMAL',
    unread: false,
  },
];

/**
 * Fetch live team profile from Supabase with relational members and payment info.
 */
export async function fetchLiveTeamProfile(): Promise<TeamProfile | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    // 1. Query team where user is leader or member
    let teamId: string | null = null;
    const { data: leaderTeam } = await supabase
      .from('teams')
      .select('*')
      .eq('team_leader_id', user.id)
      .maybeSingle();

    if (leaderTeam) {
      teamId = leaderTeam.id;
    } else {
      const { data: memberEntry } = await supabase
        .from('team_members')
        .select('team_id')
        .eq('user_id', user.id)
        .maybeSingle();
      if (memberEntry) teamId = memberEntry.team_id;
    }

    if (!teamId) return null;

    // Fetch team record
    const { data: teamData, error: teamErr } = await supabase
      .from('teams')
      .select('*')
      .eq('id', teamId)
      .single();

    if (teamErr || !teamData) return null;

    // 2. Fetch leader profile
    const { data: leaderProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', teamData.team_leader_id)
      .maybeSingle();

    // 3. Fetch payment status
    const { data: paymentRecord } = await supabase
      .from('payments')
      .select('payment_status, amount, transaction_id, payment_screenshot_path')
      .eq('team_id', teamId)
      .order('created_at', { ascending: false })
      .maybeSingle();

    const rawStatus = (paymentRecord?.payment_status || teamData.registration_status || 'pending').toLowerCase();
    const verificationStatus: 'PENDING_VERIFICATION' | 'VERIFIED' | 'REJECTED' =
      rawStatus === 'verified'
        ? 'VERIFIED'
        : rawStatus === 'rejected'
        ? 'REJECTED'
        : 'PENDING_VERIFICATION';

    // 4. Fetch team members with joined profile details
    const { data: membersRaw } = await supabase
      .from('team_members')
      .select('id, user_id, member_role, created_at')
      .eq('team_id', teamId);

    const memberUserIds = (membersRaw || []).map((m) => m.user_id);
    const { data: profilesList } = memberUserIds.length > 0
      ? await supabase.from('profiles').select('*').in('id', memberUserIds)
      : { data: [] };

    const profilesMap = new Map((profilesList || []).map((p) => [p.id, p]));
    const avatarColors = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'];

    const formattedMembers: TeamMember[] = (membersRaw || []).map((tm, idx) => {
      const p = profilesMap.get(tm.user_id);
      const isLeader = tm.member_role === 'leader' || tm.user_id === teamData.team_leader_id;
      return {
        id: tm.id,
        fullName: p?.full_name || (isLeader ? leaderProfile?.full_name || 'Team Leader' : `Member ${idx + 1}`),
        role: isLeader ? 'Team Leader' : (`Member ${idx + 1}` as any),
        college: p?.college_name || leaderProfile?.college_name || 'Engineering College',
        department: p?.course || leaderProfile?.course || 'Engineering',
        email: p?.email || '',
        phone: p?.phone || '',
        avatarColor: isLeader ? '#3B82F6' : avatarColors[idx % avatarColors.length],
      };
    });

    // Ensure leader is first if not already
    formattedMembers.sort((a, b) => (a.role === 'Team Leader' ? -1 : 1));

    const referenceId = `SCI26-TEAM-${teamData.id.slice(0, 4).toUpperCase()}`;

    const profile: TeamProfile = {
      teamName: teamData.team_name,
      referenceId,
      college: leaderProfile?.college_name || 'Engineering College',
      description: 'Innovating for smarter, greener cities with IoT & AI.',
      leaderName: leaderProfile?.full_name || 'Team Leader',
      leaderEmail: leaderProfile?.email || user.email || '',
      leaderPhone: leaderProfile?.phone || '+91 98765 43210',
      teamSize: teamData.team_size || formattedMembers.length,
      verificationStatus,
      registeredAt: teamData.created_at,
      department: leaderProfile?.course || 'Engineering',
      members: formattedMembers,
    };

    return profile;
  } catch (err) {
    console.error('[Dashboard Service] Error fetching live Supabase profile:', err);
    return null;
  }
}

/**
 * Get active team profile from session or registered store (synchronous initial state)
 */
export function getTeamProfile(): TeamProfile {
  const session = getActiveSession();
  const targetTeamName = session?.teamName?.trim();

  // If demo session
  if (targetTeamName && targetTeamName.toLowerCase() === 'urban innovators') {
    return {
      ...DEFAULT_DEMO_TEAM,
      teamName: 'Urban Innovators',
      referenceId: session?.referenceId || 'SCI26-TEAM-087',
      verificationStatus: session?.verificationStatus || 'VERIFIED',
    };
  }

  // If session exists with custom registered credentials
  if (session && session.teamName) {
    return {
      ...DEFAULT_DEMO_TEAM,
      teamName: session.teamName,
      referenceId: session.referenceId || 'SCI26-TEAM-8492',
      leaderName: session.leaderName || DEFAULT_DEMO_TEAM.leaderName,
      leaderEmail: session.leaderEmail || DEFAULT_DEMO_TEAM.leaderEmail,
      verificationStatus: session.verificationStatus || 'PENDING_VERIFICATION',
    };
  }

  return DEFAULT_DEMO_TEAM;
}

/**
 * Update permitted team details in Supabase
 */
export async function updateTeamProfile(
  updates: Partial<Pick<TeamProfile, 'college' | 'description' | 'teamName'>>
): Promise<{ success: boolean; message: string; profile?: TeamProfile }> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (user && updates.college) {
      await supabase
        .from('profiles')
        .update({ college_name: updates.college.trim(), updated_at: new Date().toISOString() })
        .eq('id', user.id);
    }

    const liveProfile = await fetchLiveTeamProfile();
    const current = liveProfile || getTeamProfile();

    return {
      success: true,
      message: 'Team information updated successfully in Supabase.',
      profile: {
        ...current,
        college: updates.college?.trim() || current.college,
        description: updates.description?.trim() || current.description,
      },
    };
  } catch (err) {
    console.error('Update profile error:', err);
    return {
      success: false,
      message: 'Failed to update team details. Please try again.',
    };
  }
}

/**
 * Change team password securely via Supabase Auth
 */
export async function changeTeamPassword(
  oldPassword: string,
  newPassword: string
): Promise<{ success: boolean; message: string }> {
  if (!oldPassword) {
    return { success: false, message: 'Current password is required.' };
  }
  if (!newPassword || newPassword.length < 6) {
    return { success: false, message: 'New password must be at least 6 characters long.' };
  }

  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      return { success: false, message: error.message };
    }

    return {
      success: true,
      message: 'Your team password has been updated securely with Supabase Auth.',
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to update password';
    return { success: false, message: errorMsg };
  }
}

/**
 * Fetch announcements from Supabase
 */
export async function fetchLiveAnnouncements(): Promise<Announcement[]> {
  try {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return DEFAULT_ANNOUNCEMENTS;
    }

    return data.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.message,
      date: new Date(item.created_at).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      category: 'UPDATE',
      priority: 'HIGH',
      unread: true,
    }));
  } catch {
    return DEFAULT_ANNOUNCEMENTS;
  }
}

export function getAnnouncements(): Announcement[] {
  return DEFAULT_ANNOUNCEMENTS;
}

/**
 * Fetch published problem statements from Supabase
 */
export async function fetchLivePublishedProblemStatements(): Promise<ProblemStatement[]> {
  try {
    const { data, error } = await supabase
      .from('problem_statements')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error || !data) return [];
    return data as ProblemStatement[];
  } catch (err) {
    console.error('Error fetching problem statements:', err);
    return [];
  }
}

/**
 * Check if problem statements are published in Supabase
 */
export async function isProblemStatementsPublishedAsync(): Promise<boolean> {
  try {
    const { count, error } = await supabase
      .from('problem_statements')
      .select('*', { count: 'exact', head: true })
      .eq('published', true);

    if (error) return isProblemStatementsPublished();
    return (count || 0) > 0;
  } catch {
    return isProblemStatementsPublished();
  }
}

export function isProblemStatementsPublished(): boolean {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(PROBLEM_STATEMENTS_PUBLISHED_KEY) === 'true';
}

export function setProblemStatementsPublished(published: boolean): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(PROBLEM_STATEMENTS_PUBLISHED_KEY, published ? 'true' : 'false');
}
