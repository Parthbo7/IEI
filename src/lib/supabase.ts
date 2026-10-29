import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase credentials missing! Ensure VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY are defined in .env'
  );
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '', {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  phone?: string | null;
  college_name?: string | null;
  course?: string | null;
  year_of_study?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Team {
  id: string;
  team_name: string;
  team_leader_id: string;
  team_size: number;
  registration_status: 'pending' | 'verified' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  team_id: string;
  user_id: string;
  member_role: 'leader' | 'member';
  created_at: string;
  // Joined fields:
  profile?: Profile;
}

export interface Payment {
  id: string;
  team_id: string;
  submitted_by: string;
  amount: number;
  transaction_id: string;
  payment_screenshot_path: string;
  payment_status: 'pending' | 'verified' | 'rejected';
  verified_by?: string | null;
  verified_at?: string | null;
  created_at: string;
}

export interface ProblemStatement {
  id: string;
  title: string;
  description: string;
  category: string;
  organization: string;
  published: boolean;
  created_by?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  audience: 'all' | 'leaders' | 'participants';
  created_by?: string | null;
  created_at: string;
}

export interface EmailLog {
  id: string;
  recipient_email: string;
  subject: string;
  email_type: string;
  status: 'sent' | 'failed' | 'queued';
  sent_by?: string | null;
  created_at: string;
}

export interface AdminUser {
  id: string;
  user_id: string;
  created_at: string;
}

/**
 * Check if the currently signed-in user is registered in the admin_users allowlist.
 */
export async function checkIsAdmin(userId?: string): Promise<boolean> {
  try {
    let uid = userId;
    if (!uid) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;
      uid = user.id;
    }

    const { data, error } = await supabase
      .from('admin_users')
      .select('id')
      .eq('user_id', uid)
      .maybeSingle();

    if (error || !data) return false;
    return true;
  } catch (err) {
    console.error('Error checking admin status:', err);
    return false;
  }
}
