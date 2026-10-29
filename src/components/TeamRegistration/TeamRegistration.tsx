import React from 'react';
import { RegistrationPage } from './RegistrationPage';

export { RegistrationPage };
export default RegistrationPage;

// Backward-compatibility wrapper for any component that still references TeamRegistration
export interface TeamRegistrationProps {
  isOpen?: boolean;
  onClose?: () => void;
  onBackToHome?: () => void;
}

export const TeamRegistration: React.FC<TeamRegistrationProps> = ({
  isOpen = true,
  onClose,
  onBackToHome,
}) => {
  if (!isOpen) return null;
  return <RegistrationPage onBackToHome={onBackToHome || onClose || (() => {})} />;
};
