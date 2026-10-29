export type AdminViewType =
  | 'overview'
  | 'registrations'
  | 'participants'
  | 'email_center'
  | 'announcements'
  | 'problem_statements'
  | 'event_settings'
  | 'admin_settings'
  | 'audit_logs';

export type RegistrationStatus = 'Confirmed' | 'Pending' | 'Cancelled';
export type EmailDeliveryStatus = 'Delivered' | 'Sent' | 'Pending' | 'Failed';

export interface TeamMemberRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  college: string;
  branch: string;
  year?: string;
  rollNumber?: string;
  role: 'Team Leader' | 'Member';
}

export interface TeamRegistration {
  id: string;
  registrationId: string; // e.g. SCI2026-087
  teamName: string;
  teamLeader: string;
  leaderEmail: string;
  leaderPhone: string;
  college: string;
  branch: string;
  teamSize: number; // 2, 3, or 4
  registrationDate: string; // e.g. 12 Apr 2026
  timestamp: number;
  status: RegistrationStatus;
  confirmationEmailStatus: EmailDeliveryStatus;
  confirmationSentAt?: string;
  members: TeamMemberRecord[];
  notes?: string;
  payment?: {
    amount: number;
    transactionId: string;
    screenshotPath: string;
    paymentStatus: 'pending' | 'verified' | 'rejected';
  };
}

export interface ParticipantRecord {
  id: string;
  fullName: string;
  role: 'Team Leader' | 'Member';
  teamName: string;
  teamRegistrationId: string;
  email: string;
  phone: string;
  college: string;
  branch: string;
  status: RegistrationStatus;
}

export interface EmailLog {
  id: string;
  subject: string;
  recipientCategory: 'All Participants' | 'All Team Leaders' | 'All Registered Teams' | 'Specific Teams' | 'Specific Participants';
  recipientCount: number;
  recipientEmails: string[];
  sentAt: string;
  status: 'Sent' | 'Failed' | 'Draft';
  sentBy: string;
  bodyPreview: string;
  category: 'Registration Confirmation' | 'Important Event Update' | 'Schedule Announcement' | 'Problem Statement Release' | 'General Announcement';
}

export interface ProblemStatementAdminItem {
  id: string;
  referenceCode: string; // e.g. PS-SCI-2026-01
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  requirements: string[];
  expectedOutcomes: string[];
  referenceResources?: string[];
  status: 'Draft' | 'Scheduled' | 'Published' | 'Archived';
  createdAt: string;
  publishedAt?: string;
  publishedBy?: string;
  selectedByTeamsCount?: number;
}

export interface AuditLogEntry {
  id: string;
  adminName: string;
  adminRole: string;
  action: string;
  details: string;
  timestamp: string;
  recordRef?: string;
  status: 'Success' | 'Failed';
}

export interface AdminStats {
  totalRegistrations: number; // teams
  totalParticipants: number; // unique individuals
  totalTeamLeaders: number;
  totalTeamMembers: number;
  pendingConfirmations: number;
  confirmedRegistrations: number;
  cancelledRegistrations: number;
  teamSizeDistribution: {
    size2: number;
    size3: number;
    size4: number;
  };
  registrationsOverTime: Array<{
    date: string;
    count: number;
  }>;
}

export interface EventSettings {
  registrationOpen: boolean;
  allowedTeamSizes: number[];
  problemStatementsPublished: boolean;
  problemStatementSelectionOpen: boolean;
  selectionDeadline?: string;
  maxTeamsPerProblemStatement?: number;
}
