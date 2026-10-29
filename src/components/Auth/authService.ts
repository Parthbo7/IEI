/**
 * Authentication Service for Smart City Innovation Hackathon 2026
 * Fully integrated with Supabase Auth, sessions, and role-based permissions.
 */

import { supabase, checkIsAdmin } from '../../lib/supabase';

export interface TeamSession {
  teamName: string;
  referenceId: string;
  leaderName: string;
  leaderEmail: string;
  verificationStatus: 'PENDING_VERIFICATION' | 'VERIFIED' | 'REJECTED';
  token: string;
  loginTimestamp: number;
  userId?: string;
  isAdmin?: boolean;
}

export interface LoginResult {
  success: boolean;
  message?: string;
  error?: string;
  session?: TeamSession;
  isAdmin?: boolean;
}

const SESSION_STORAGE_KEY = 'sci2026_team_session';
const REMEMBER_TEAM_KEY = 'sci2026_remembered_team';
const LOGIN_ATTEMPTS_KEY = 'sci2026_login_attempts';

/**
 * Retrieve remembered team name or email if user selected "Remember Me" previously.
 */
export function getRememberedTeamName(): string {
  if (typeof window === 'undefined') return '';
  return window.localStorage.getItem(REMEMBER_TEAM_KEY) || '';
}

/**
 * Save or clear remembered team identifier. Password is NEVER remembered.
 */
export function setRememberedTeamName(teamIdentifier: string, remember: boolean): void {
  if (typeof window === 'undefined') return;
  if (remember && teamIdentifier.trim()) {
    window.localStorage.setItem(REMEMBER_TEAM_KEY, teamIdentifier.trim());
  } else {
    window.localStorage.removeItem(REMEMBER_TEAM_KEY);
  }
}

/**
 * Get active team session from sessionStorage.
 */
export function getActiveSession(): TeamSession | null {
  if (typeof window === 'undefined') return null;
  const raw = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as TeamSession;
  } catch {
    return null;
  }
}

/**
 * Clear team session (Logout) and terminate Supabase session.
 */
export async function logoutTeam(): Promise<void> {
  try {
    await supabase.auth.signOut();
  } catch (err) {
    console.warn('Supabase signOut error:', err);
  } finally {
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
    }
  }
}

/**
 * Check if the currently active session user is an administrator
 */
export async function isCurrentSessionAdmin(): Promise<boolean> {
  const session = getActiveSession();
  if (session?.isAdmin) return true;
  return await checkIsAdmin(session?.userId);
}

/**
 * Authenticate team or admin credentials against Supabase Auth.
 * Accepts either leader email OR registered team name.
 */
export async function authenticateTeam(
  teamIdentifier: string,
  teamPassword: string,
  rememberMe: boolean = false
): Promise<LoginResult> {
  const cleanIdentifier = teamIdentifier.trim();
  const cleanPassword = teamPassword;

  if (!cleanIdentifier) {
    return { success: false, error: 'Email or team name is required.' };
  }
  if (!cleanPassword) {
    return { success: false, error: 'Password is required.' };
  }

  // Rate limiting defense
  const now = Date.now();
  if (typeof window !== 'undefined') {
    const rawAttempts = window.localStorage.getItem(LOGIN_ATTEMPTS_KEY);
    if (rawAttempts) {
      try {
        const attempts: { count: number; lastFailed: number } = JSON.parse(rawAttempts);
        if (attempts.count >= 6 && now - attempts.lastFailed < 30000) {
          const remainingSec = Math.ceil((30000 - (now - attempts.lastFailed)) / 1000);
          return {
            success: false,
            error: `Too many failed login attempts. Please wait ${remainingSec}s before retrying.`,
          };
        }
      } catch {
        // ignore
      }
    }
  }

  try {
    let resolvedEmail = cleanIdentifier;

    // If identifier is NOT an email, look up team leader's email by team name in Supabase
    if (!cleanIdentifier.includes('@')) {
      const { data: teamData } = await supabase
        .from('teams')
        .select('id, team_name, team_leader_id')
        .ilike('team_name', cleanIdentifier)
        .maybeSingle();

      if (teamData?.team_leader_id) {
        const { data: leaderProfile } = await supabase
          .from('profiles')
          .select('email')
          .eq('id', teamData.team_leader_id)
          .maybeSingle();

        if (leaderProfile?.email) {
          resolvedEmail = leaderProfile.email;
        }
      }
    }

    // 1. Sign in with Supabase Auth
    const { data: authResult, error: authError } = await supabase.auth.signInWithPassword({
      email: resolvedEmail,
      password: cleanPassword,
    });

    if (authError || !authResult.user) {
      // Check database 'teams' table for registered teams (bypasses Supabase Auth SMTP)
      try {
        let matchedTeam: any = null;

        // Try lookup by team name
        const { data: teamByName } = await supabase
          .from('teams')
          .select('id, team_name, registration_status, team_password, team_leader_id')
          .ilike('team_name', cleanIdentifier)
          .maybeSingle();

        if (teamByName) {
          matchedTeam = teamByName;
        } else {
          // Try lookup by leader email
          const { data: leaderProf } = await supabase
            .from('profiles')
            .select('id')
            .eq('email', resolvedEmail)
            .maybeSingle();

          if (leaderProf?.id) {
            const { data: teamByLeader } = await supabase
              .from('teams')
              .select('id, team_name, registration_status, team_password, team_leader_id')
              .eq('team_leader_id', leaderProf.id)
              .maybeSingle();
            matchedTeam = teamByLeader;
          }
        }

        if (matchedTeam && (matchedTeam.team_password === cleanPassword || !matchedTeam.team_password)) {
          const { data: leaderProf } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', matchedTeam.team_leader_id)
            .maybeSingle();

          const teamSession: TeamSession = {
            teamName: matchedTeam.team_name,
            referenceId: `SCI26-TEAM-${matchedTeam.id.slice(0, 4).toUpperCase()}`,
            leaderName: leaderProf?.full_name || 'Team Leader',
            leaderEmail: leaderProf?.email || resolvedEmail,
            verificationStatus: matchedTeam.registration_status === 'verified' ? 'VERIFIED' : 'PENDING_VERIFICATION',
            token: `sci_jwt_team_${Date.now()}`,
            loginTimestamp: now,
            userId: matchedTeam.team_leader_id,
            isAdmin: false,
          };

          if (typeof window !== 'undefined') {
            window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(teamSession));
            window.localStorage.removeItem(LOGIN_ATTEMPTS_KEY);
          }
          setRememberedTeamName(cleanIdentifier, rememberMe);
          return {
            success: true,
            message: 'Signed in successfully.',
            session: teamSession,
          };
        }
      } catch (dbAuthErr) {
        console.warn('Database team auth notice:', dbAuthErr);
      }

      // Check built-in demo credentials for offline development fallback
      const isDemo =
        (cleanIdentifier.toLowerCase() === 'urban innovators' ||
          cleanIdentifier.toLowerCase() === 'leader@mgm.edu' ||
          cleanIdentifier.toLowerCase() === 'aditya.sharma@iitn.ac.in') &&
        (cleanPassword === 'Smart2026!' || cleanPassword === 'demo1234');

      if (isDemo) {
        const demoSession: TeamSession = {
          teamName: 'Urban Innovators',
          referenceId: 'SCI26-TEAM-087',
          leaderName: 'Aditya Sharma',
          leaderEmail: 'aditya.sharma@iitn.ac.in',
          verificationStatus: 'VERIFIED',
          token: `sci_jwt_demo_${Date.now()}`,
          loginTimestamp: now,
          isAdmin: false,
        };
        if (typeof window !== 'undefined') {
          window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(demoSession));
          window.localStorage.removeItem(LOGIN_ATTEMPTS_KEY);
        }
        setRememberedTeamName(cleanIdentifier, rememberMe);
        return {
          success: true,
          message: 'Signed in with demo team credentials.',
          session: demoSession,
        };
      }

      recordFailedAttempt();
      return {
        success: false,
        error:
          authError?.message === 'Invalid login credentials'
            ? 'Invalid credentials. Please verify your registered email or team name and password.'
            : authError?.message || 'Authentication failed. Please verify your credentials.',
      };
    }

    // 2. Fetch User Profile
    const userId = authResult.user.id;
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    // 3. Fetch Team Associated with this User
    const { data: userTeam } = await supabase
      .from('teams')
      .select('id, team_name, registration_status, created_at')
      .or(`team_leader_id.eq.${userId}`)
      .maybeSingle();

    // 4. Check if user is an Administrator
    const isAdmin = await checkIsAdmin(userId);

    const teamName = userTeam?.team_name || profile?.full_name || 'Innovator Team';
    const referenceId = userTeam
      ? `SCI26-TEAM-${userTeam.id.slice(0, 4).toUpperCase()}`
      : 'SCI26-TEAM-8492';

    const rawStatus = (userTeam?.registration_status || 'pending').toLowerCase();
    const verificationStatus =
      rawStatus === 'verified'
        ? 'VERIFIED'
        : rawStatus === 'rejected'
        ? 'REJECTED'
        : 'PENDING_VERIFICATION';

    const session: TeamSession = {
      teamName,
      referenceId,
      leaderName: profile?.full_name || authResult.user.user_metadata?.full_name || 'Team Leader',
      leaderEmail: authResult.user.email || resolvedEmail,
      verificationStatus,
      token: authResult.session.access_token,
      loginTimestamp: now,
      userId,
      isAdmin,
    };

    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
      window.localStorage.removeItem(LOGIN_ATTEMPTS_KEY);
    }
    setRememberedTeamName(cleanIdentifier, rememberMe);

    return {
      success: true,
      message: 'Authentication successful. Redirecting...',
      session,
      isAdmin,
    };
  } catch (err: unknown) {
    console.error('[Auth Service Exception]:', err);
    recordFailedAttempt();
    return {
      success: false,
      error: 'A network error occurred while communicating with Supabase.',
    };
  }
}

/**
 * Send password reset email via Supabase Auth
 */
export async function sendPasswordResetEmail(email: string): Promise<{ success: boolean; message: string }> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
      redirectTo: `${window.location.origin}/login`,
    });
    if (error) {
      return { success: false, message: error.message };
    }
    return { success: true, message: 'Password reset link sent to your registered email.' };
  } catch (err) {
    return { success: false, message: 'Failed to initiate password reset.' };
  }
}

function recordFailedAttempt(): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = window.localStorage.getItem(LOGIN_ATTEMPTS_KEY);
    const prev = raw ? JSON.parse(raw) : { count: 0, lastFailed: 0 };
    const updated = {
      count: (prev.count || 0) + 1,
      lastFailed: Date.now(),
    };
    window.localStorage.setItem(LOGIN_ATTEMPTS_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
}
