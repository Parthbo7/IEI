import { PaymentData, RegistrationFormData, TeamLeaderData, TeamMemberData } from './types';

export interface ValidationErrors {
  [key: string]: string;
}

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const isValidPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/[\s\-()]/g, '');
  const phoneRegex = /^(\+?\d{1,3})?\d{10}$/;
  return phoneRegex.test(cleaned);
};

export const validateTeamLeader = (data: TeamLeaderData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!data.teamName.trim()) {
    errors.teamName = 'Team name is required.';
  } else if (data.teamName.trim().length < 3) {
    errors.teamName = 'Team name must be at least 3 characters.';
  }

  if (!data.fullName.trim()) {
    errors.fullName = 'Full name is required.';
  }

  if (!data.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!data.phone.trim()) {
    errors.phone = 'Mobile number is required.';
  } else if (!isValidPhone(data.phone)) {
    errors.phone = 'Please enter a valid 10-digit mobile number.';
  }

  if (!data.college.trim()) {
    errors.college = 'College / Institution name is required.';
  }

  if (!data.department.trim()) {
    errors.department = 'Department is required.';
  }

  if (!data.yearOfStudy.trim()) {
    errors.yearOfStudy = 'Year of study is required.';
  }

  if (!data.teamPassword) {
    errors.teamPassword = 'Password is required.';
  } else if (data.teamPassword.length < 6) {
    errors.teamPassword = 'Password must be at least 6 characters.';
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = 'Confirm password is required.';
  } else if (data.teamPassword !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return errors;
};

export const validateTeamMember = (
  member: TeamMemberData,
  memberIndex: number,
  formData: RegistrationFormData
): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!member.fullName.trim()) {
    errors.fullName = 'Full name is required.';
  }

  if (!member.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!isValidEmail(member.email)) {
    errors.email = 'Please enter a valid email address.';
  } else {
    // Check duplicate with Team Leader
    const normalizedEmail = member.email.trim().toLowerCase();
    if (formData.leader.email.trim().toLowerCase() === normalizedEmail) {
      errors.email = 'Email matches Team Leader. Each member must have a unique email.';
    } else {
      // Check duplicate with other members
      for (let i = 0; i < formData.members.length; i++) {
        if (i !== memberIndex && formData.members[i]?.email.trim().toLowerCase() === normalizedEmail) {
          errors.email = `Email matches Team Member ${i + 1}. All members must have unique emails.`;
          break;
        }
      }
    }
  }

  if (!member.phone.trim()) {
    errors.phone = 'Mobile number is required.';
  } else if (!isValidPhone(member.phone)) {
    errors.phone = 'Please enter a valid 10-digit mobile number.';
  }

  if (!member.college.trim()) {
    errors.college = 'College name is required.';
  }

  if (!member.department.trim()) {
    errors.department = 'Department is required.';
  }

  if (!member.yearOfStudy.trim()) {
    errors.yearOfStudy = 'Year of study is required.';
  }

  return errors;
};

export const validatePayment = (payment: PaymentData): ValidationErrors => {
  const errors: ValidationErrors = {};

  const trimmedTxId = payment.transactionId.trim();
  if (!trimmedTxId) {
    errors.transactionId = 'UPI Transaction ID / Reference Number is required.';
  } else if (trimmedTxId.length < 6) {
    errors.transactionId = 'Transaction ID is too short. Please enter a valid reference number.';
  } else if (!/^[A-Za-z0-9\-_./]+$/.test(trimmedTxId)) {
    errors.transactionId = 'Transaction ID contains invalid characters.';
  }

  if (!payment.screenshotFile && !payment.screenshotFileName) {
    errors.screenshot = 'Payment screenshot is required.';
  } else if (payment.screenshotFile) {
    const validExtensions = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!validExtensions.includes(payment.screenshotFile.type)) {
      errors.screenshot = 'Unsupported file format. Please upload a PNG, JPG, JPEG, or WEBP image.';
    } else if (payment.screenshotFile.size > 5 * 1024 * 1024) {
      errors.screenshot = 'File size exceeds 5 MB. Please upload a smaller screenshot.';
    }
  }

  return errors;
};

export const validateCompleteRegistration = (
  formData: RegistrationFormData
): { isValid: boolean; error?: string } => {
  const leaderErrors = validateTeamLeader(formData.leader);
  if (Object.keys(leaderErrors).length > 0) {
    return { isValid: false, error: 'Please correct the highlighted errors in Team Leader details.' };
  }

  const additionalMembersCount = formData.teamSize - 1;
  const emails = new Set<string>([formData.leader.email.trim().toLowerCase()]);

  for (let i = 0; i < additionalMembersCount; i++) {
    const member = formData.members[i];
    if (!member) {
      return { isValid: false, error: `Details for Team Member ${i + 1} are missing.` };
    }
    const memberErrors = validateTeamMember(member, i, formData);
    if (Object.keys(memberErrors).length > 0) {
      return { isValid: false, error: `Please correct the highlighted errors in Team Member ${i + 1} details.` };
    }
    const mEmail = member.email.trim().toLowerCase();
    if (emails.has(mEmail)) {
      return { isValid: false, error: `Duplicate email detected: ${mEmail}. All team members must have unique emails.` };
    }
    emails.add(mEmail);
  }

  const paymentErrors = validatePayment(formData.payment);
  if (Object.keys(paymentErrors).length > 0) {
    return { isValid: false, error: 'Please enter a valid Transaction ID and upload the payment screenshot.' };
  }

  return { isValid: true };
};
