/**
 * Participant Dashboard Type Definitions
 * Smart City Innovation Hackathon 2026
 */

export type DashboardViewType =
  | 'dashboard'
  | 'problem-statements'
  | 'team-details'
  | 'announcements'
  | 'profile-security';

export interface TeamMember {
  id: string;
  fullName: string;
  role: 'Team Leader' | 'Member 2' | 'Member 3' | 'Member 4';
  college?: string;
  department?: string;
  email?: string;
  phone?: string;
  avatarColor?: string;
}

export interface TeamProfile {
  teamName: string;
  referenceId: string;
  college: string;
  description: string;
  leaderName: string;
  leaderEmail: string;
  leaderPhone: string;
  teamSize: number;
  verificationStatus: 'PENDING_VERIFICATION' | 'VERIFIED' | 'REJECTED';
  members: TeamMember[];
  registeredAt?: string;
  department?: string;
}

export interface Announcement {
  id: string;
  title: string;
  description: string;
  date: string;
  category?: 'REGISTRATION' | 'CHALLENGE' | 'SCHEDULE' | 'UPDATE';
  priority?: 'HIGH' | 'NORMAL';
  unread?: boolean;
}
