import React, { useState } from 'react';
import {
  PaymentData,
  RegistrationFormData,
  StepNumber,
  TeamLeaderData,
  TeamMemberData,
  TeamSize
} from './types';
import { RegistrationHeader } from './RegistrationHeader';
import { RegistrationProgress } from './RegistrationProgress';
import { TeamSizeStep } from './steps/TeamSizeStep';
import { TeamLeaderStep } from './steps/TeamLeaderStep';
import { TeamMembersStep } from './steps/TeamMembersStep';
import { PaymentStep } from './steps/PaymentStep';
import { ReviewRegistrationStep } from './steps/ReviewRegistrationStep';
import { ConfirmationModal } from './ConfirmationModal';
import { submitTeamRegistration } from './services/registrationApi';
import { validateCompleteRegistration } from './registrationValidation';

interface RegistrationPageProps {
  onBackToHome: () => void;
}

const INITIAL_FORM_DATA: RegistrationFormData = {
  teamSize: 2,
  leader: {
    teamName: '',
    teamPassword: '',
    confirmPassword: '',
    fullName: '',
    email: '',
    phone: '',
    college: '',
    department: '',
    yearOfStudy: '',
  },
  members: [
    { fullName: '', email: '', phone: '', college: '', department: '', yearOfStudy: '', rollNumber: '' },
    { fullName: '', email: '', phone: '', college: '', department: '', yearOfStudy: '', rollNumber: '' },
    { fullName: '', email: '', phone: '', college: '', department: '', yearOfStudy: '', rollNumber: '' },
  ],
  payment: {
    registrationFee: 600,
    transactionId: '',
    screenshotFile: null,
    verificationStatus: 'PENDING_VERIFICATION',
  },
};

export const RegistrationPage: React.FC<RegistrationPageProps> = ({ onBackToHome }) => {
  const [currentStep, setCurrentStep] = useState<StepNumber>(1);
  const [formData, setFormData] = useState<RegistrationFormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | undefined>();
  const [registeredReferenceId, setRegisteredReferenceId] = useState<string>('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  // Handle Team Size Selection
  const handleSelectTeamSize = (size: TeamSize) => {
    setFormData((prev) => ({
      ...prev,
      teamSize: size,
    }));
  };

  // Update Team Leader Data
  const handleLeaderChange = (leader: TeamLeaderData) => {
    setFormData((prev) => ({
      ...prev,
      leader,
    }));
  };

  // Update Specific Member Data
  const handleMemberChange = (index: number, memberData: TeamMemberData) => {
    setFormData((prev) => {
      const updatedMembers = [...prev.members];
      updatedMembers[index] = memberData;
      return {
        ...prev,
        members: updatedMembers,
      };
    });
  };

  // Update Payment Data
  const handlePaymentChange = (payment: PaymentData) => {
    setFormData((prev) => ({
      ...prev,
      payment,
    }));
  };

  // Final Form Submission
  const handleSubmit = async () => {
    setSubmitError(undefined);

    const validation = validateCompleteRegistration(formData);
    if (!validation.isValid) {
      setSubmitError(validation.error || 'Please correct the highlighted form errors.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await submitTeamRegistration(formData);
      if (response.success && response.referenceId) {
        setRegisteredReferenceId(response.referenceId);
        setShowConfirmationModal(true);
      } else {
        setSubmitError(response.error || response.message || 'Registration failed. Please try again.');
      }
    } catch {
      setSubmitError('Unable to connect to the registration server. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`min-h-screen w-full bg-[#070A0F] text-white flex flex-col items-center relative overflow-x-hidden selection:bg-[#C6FF35] selection:text-black box-border ${
        currentStep === 5
          ? 'overflow-y-auto pb-12'
          : 'lg:h-[100dvh] lg:max-h-[100dvh] lg:overflow-y-auto'
      }`}
    >
      {/* Subtle Background Radial Glow & Ambient Tech Pattern */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] bg-gradient-to-b from-[#C6FF35]/[0.06] via-transparent to-transparent blur-3xl pointer-events-none -z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(198,255,53,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(198,255,53,0.025)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none -z-0" />

      {/* Futuristic Minimal HUD Crosshairs & Star Accents matching reference */}
      <div className="absolute top-[22%] left-[8%] text-[#C6FF35]/40 text-xs font-mono pointer-events-none select-none drop-shadow-[0_0_8px_rgba(198,255,53,0.5)]">+</div>
      <div className="absolute top-[44%] left-[4%] text-[#C6FF35]/30 text-xs font-mono pointer-events-none select-none drop-shadow-[0_0_8px_rgba(198,255,53,0.4)]">+</div>
      <div className="absolute top-[70%] left-[9%] text-[#C6FF35]/25 text-xs font-mono pointer-events-none select-none drop-shadow-[0_0_8px_rgba(198,255,53,0.4)]">+</div>
      <div className="absolute top-[20%] right-[8%] text-[#C6FF35]/35 text-xs font-mono pointer-events-none select-none drop-shadow-[0_0_8px_rgba(198,255,53,0.5)]">+</div>
      <div className="absolute top-[50%] right-[4%] text-[#C6FF35]/40 text-xs font-mono pointer-events-none select-none drop-shadow-[0_0_8px_rgba(198,255,53,0.5)]">+</div>
      <div className="absolute top-[76%] right-[9%] text-[#C6FF35]/25 text-xs font-mono pointer-events-none select-none drop-shadow-[0_0_8px_rgba(198,255,53,0.4)]">+</div>

      {/* Top Dedicated Full-Page Header */}
      <RegistrationHeader onBackToHome={onBackToHome} />

      {/* Main Content Area: Standardized horizontally centered container fitting 100vh */}
      <main
        className={`registration-container pt-1.5 sm:pt-2 z-10 flex-1 flex flex-col items-center w-full box-border ${
          currentStep === 5 ? 'pb-8 justify-start' : 'pb-2.5 sm:pb-3.5 justify-between'
        }`}
      >
        {/* Step 1-5 Introduction Heading Section */}
        <div className="text-center mb-0.5 max-w-2xl shrink-0">
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-[#C6FF35] uppercase font-bold block mb-0.5 drop-shadow-[0_0_10px_rgba(198,255,53,0.3)]">
            SMART CITY INNOVATION 2026 
          </span>
          <h1 className="font-tech text-2xl sm:text-3xl lg:text-[32px] font-black tracking-tight uppercase leading-none mb-0.5">
            <span className="text-white">TEAM </span>
            <span className="text-[#C6FF35] drop-shadow-[0_0_20px_rgba(198,255,53,0.45)]">REGISTRATION</span>
          </h1>
          <p className="font-sans text-[11px] sm:text-xs text-zinc-400 max-w-xl mx-auto leading-normal hidden sm:block">
            Build your team. Bring your ideas to life. Create solutions for tomorrow's cities.
          </p>
        </div>

        {/* 5-Step Progress Indicator */}
        <RegistrationProgress currentStep={currentStep} />

        {/* Step 1: Select Team Size */}
        {currentStep === 1 && (
          <div className="w-full">
            <TeamSizeStep
              selectedSize={formData.teamSize}
              onSelectSize={handleSelectTeamSize}
              onContinue={() => {
                setCurrentStep(2);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onBackToHome={onBackToHome}
            />
          </div>
        )}

        {/* Step 2: Team Leader Details */}
        {currentStep === 2 && (
          <div className="w-full">
            <TeamLeaderStep
              data={formData.leader}
              onChange={handleLeaderChange}
              onContinue={() => {
                setCurrentStep(3);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onBack={() => {
                setCurrentStep(1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* Step 3: Team Member Details */}
        {currentStep === 3 && (
          <div className="w-full">
            <TeamMembersStep
              formData={formData}
              onChangeMember={handleMemberChange}
              onContinue={() => {
                setCurrentStep(4);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onBack={() => {
                setCurrentStep(2);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* Step 4: Registration Payment */}
        {currentStep === 4 && (
          <div className="w-full">
            <PaymentStep
              payment={formData.payment}
              onChange={handlePaymentChange}
              onContinue={() => {
                setCurrentStep(5);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onBack={() => {
                setCurrentStep(3);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* Step 5: Review and Submit */}
        {currentStep === 5 && (
          <div className="w-full">
            <ReviewRegistrationStep
              formData={formData}
              onEditTeam={() => {
                setCurrentStep(1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onEditPayment={() => {
                setCurrentStep(4);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSubmit={handleSubmit}
              onBack={() => {
                setCurrentStep(4);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              isSubmitting={isSubmitting}
              errorMessage={submitError}
            />
          </div>
        )}

        {/* Registration Confirmation Popup */}
        <ConfirmationModal
          isOpen={showConfirmationModal}
          referenceId={registeredReferenceId}
          teamName={formData.leader.teamName}
          formData={formData}
          onReturnHome={onBackToHome}
          onClose={() => setShowConfirmationModal(false)}
        />
      </main>
    </div>
  );
};

export default RegistrationPage;
