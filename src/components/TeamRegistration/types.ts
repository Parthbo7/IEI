export type TeamSize = 2 | 3 | 4;

export interface TeamLeaderData {
  teamName: string;
  teamPassword: string;
  confirmPassword: string;
  fullName: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  yearOfStudy: string;
}

export interface TeamMemberData {
  fullName: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  yearOfStudy: string;
  rollNumber?: string;
}

export interface PaymentData {
  registrationFee: number; // Always 600
  transactionId: string;
  screenshotFile: File | null;
  screenshotPreviewUrl?: string;
  screenshotFileName?: string;
  verificationStatus: 'PENDING_VERIFICATION' | 'APPROVED' | 'REJECTED';
}

export interface RegistrationFormData {
  teamSize: TeamSize;
  leader: TeamLeaderData;
  members: TeamMemberData[];
  payment: PaymentData;
}

export type StepNumber = 1 | 2 | 3 | 4 | 5; // 1: Size, 2: Leader, 3: Members, 4: Payment, 5: Review & Submit

export interface RegistrationApiResponse {
  success: boolean;
  referenceId?: string;
  teamName?: string;
  message: string;
  error?: string;
}
