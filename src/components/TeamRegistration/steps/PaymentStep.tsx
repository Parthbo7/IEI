import React, { useRef, useState } from 'react';
import {
  UploadCloud,
  FileCheck,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Hash,
  X,
  CreditCard,
  ShieldCheck,
  Copy,
  Check,
  RotateCw
} from 'lucide-react';
import { PaymentData } from '../types';
import { validatePayment, ValidationErrors } from '../registrationValidation';

interface PaymentStepProps {
  payment: PaymentData;
  onChange: (payment: PaymentData) => void;
  onContinue: () => void;
  onBack: () => void;
}

export const PaymentStep: React.FC<PaymentStepProps> = ({
  payment,
  onChange,
  onContinue,
  onBack,
}) => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [copiedUPI, setCopiedUPI] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTxIdChange = (val: string) => {
    const updated: PaymentData = {
      ...payment,
      transactionId: val,
    };
    onChange(updated);

    if (hasAttemptedSubmit) {
      setErrors(validatePayment(updated));
    }
  };

  const handleCopyUPI = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText('iei.hackathon@upi');
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = 'iei.hackathon@upi';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiedUPI(true);
      setTimeout(() => setCopiedUPI(false), 2000);
    } catch {
      setCopiedUPI(true);
      setTimeout(() => setCopiedUPI(false), 2000);
    }
  };

  const handleFileProcess = (file: File) => {
    const validExtensions = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!validExtensions.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        screenshot: 'Unsupported file format. Please upload a PNG, JPG, JPEG, or WEBP image.',
      }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        screenshot: 'File size exceeds 5 MB. Please upload a smaller screenshot.',
      }));
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    const updated: PaymentData = {
      ...payment,
      screenshotFile: file,
      screenshotFileName: file.name,
      screenshotPreviewUrl: previewUrl,
    };
    onChange(updated);

    if (hasAttemptedSubmit) {
      setErrors(validatePayment(updated));
    } else {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.screenshot;
        return next;
      });
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileProcess(files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (payment.screenshotPreviewUrl) {
      URL.revokeObjectURL(payment.screenshotPreviewUrl);
    }
    const updated: PaymentData = {
      ...payment,
      screenshotFile: null,
      screenshotFileName: undefined,
      screenshotPreviewUrl: undefined,
    };
    onChange(updated);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);
    const validationErrors = validatePayment(payment);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onContinue();
    }
  };

  return (
    <form onSubmit={handleContinue} className="w-full flex flex-col items-center">
      {/* Section Header */}
      <div className="text-center mb-2 sm:mb-2.5 max-w-2xl shrink-0">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold font-sans text-white tracking-tight mb-0.5">
          Registration Fee Payment
        </h2>
        <p className="text-[11px] sm:text-xs text-zinc-400 font-sans leading-normal">
          Scan the official hackathon UPI QR code, complete the payment, and upload your transaction receipt.
        </p>
      </div>

      {/* Main Payment Container matching Image 2 */}
      <div className="payment-form-panel mb-2 sm:mb-3">
        <div className="payment-layout">
          {/* LEFT PANEL: Registration Fee Badge, QR Code, UPI ID, and Accepted Methods */}
          <div className="flex flex-col items-center justify-between text-center py-1 sm:py-2">
            {/* 1. Registration Fee Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-[#C6FF35] text-[#C6FF35] font-mono text-[11px] font-bold mb-2 tracking-wider uppercase bg-[#C6FF35]/[0.05]">
              <CreditCard className="w-3 h-3" />
              <span>REGISTRATION FEE: ₹{payment.registrationFee} PER TEAM</span>
            </div>

            {/* 2. High-Contrast Sharp QR Frame with soft neon glow */}
            <div className="relative p-2.5 rounded-xl bg-white shadow-[0_0_24px_rgba(198,255,53,0.2)] mb-2 flex items-center justify-center">
              <img
                src="/iei qr.jpeg"
                alt="Hackathon Registration UPI QR Code"
                className="w-32 h-32 sm:w-36 sm:h-36 object-contain rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src.endsWith('.jpeg')) {
                    target.src = '/iei-qr.png';
                  }
                }}
              />
            </div>

            {/* 3. Instruction underneath QR code */}
            <span className="font-mono text-[9.5px] tracking-widest text-zinc-400 uppercase mb-2">
              SCAN VIA ANY UPI APP
            </span>

            {/* 4. Official UPI ID with Copy Button */}
            <div className="w-full max-w-[320px] flex flex-col items-center">
              <div className="flex items-center gap-2 mb-1 w-full justify-center">
                <div className="h-[1px] bg-slate-800 flex-1 max-w-[32px]" />
                <span className="font-mono text-[9.5px] font-semibold text-zinc-400 tracking-widest uppercase">
                  UPI ID
                </span>
                <div className="h-[1px] bg-slate-800 flex-1 max-w-[32px]" />
              </div>

              <div className="w-full h-[38px] px-3 rounded-lg bg-[#070B10] border border-[#26384b] flex items-center justify-between">
                <code className="font-mono text-xs font-bold text-white tracking-wide select-all">
                  iei.hackathon@upi
                </code>
                <button
                  type="button"
                  onClick={handleCopyUPI}
                  className="p-1 rounded text-zinc-400 hover:text-[#C6FF35] hover:bg-white/[0.06] transition-all flex items-center gap-1 cursor-pointer"
                  title="Copy UPI ID to clipboard"
                >
                  {copiedUPI ? (
                    <div className="flex items-center gap-1 text-[#C6FF35] text-[10px] font-mono">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                      <span>COPIED</span>
                    </div>
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* 5. Accepted Payment Methods */}
              <p className="text-[10px] font-sans text-zinc-500 mt-1.5 text-center leading-tight">
                Accepted: Google Pay, PhonePe, Paytm, BHIM, or any UPI App
              </p>
            </div>
          </div>

          {/* RIGHT PANEL: Form Inputs, Screenshot Upload, and Verification Notice */}
          <div className="flex flex-col justify-between gap-3 py-1 sm:py-2">
            {/* Top Section: Transaction ID & Screenshot Upload */}
            <div className="flex flex-col gap-3">
              {/* Field 1: UPI / Bank Transaction ID (UTR) * */}
              <div className="flex flex-col text-left w-full min-w-0">
                <label className="flex items-center gap-1 text-[11px] sm:text-xs font-sans font-medium text-zinc-200 mb-1 select-none">
                  <span>UPI / Bank Transaction ID (UTR)</span>
                  <span className="text-[#C6FF35] font-bold text-xs">*</span>
                </label>

                <div className="relative flex items-center w-full min-w-0">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none flex items-center justify-center shrink-0">
                    <Hash className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="transactionId"
                    value={payment.transactionId}
                    onChange={(e) => handleTxIdChange(e.target.value)}
                    placeholder="Enter your transaction ID"
                    style={{ paddingLeft: '38px', paddingRight: '14px' }}
                    className={`w-full h-[40px] sm:h-[42px] rounded-[10px] text-xs sm:text-[13px] font-sans bg-[#070B10] border transition-all duration-200 outline-none text-white placeholder-zinc-500 ${
                      errors.transactionId
                        ? 'border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500/30'
                        : 'border-[#1E293B] hover:border-slate-700 focus:border-[#C6FF35] focus:ring-1 focus:ring-[#C6FF35]/30'
                    }`}
                  />
                </div>

                <span className="text-[10px] font-sans text-zinc-500 mt-1 block">
                  Found in UPI app receipt details (12-digit numeric or alphanumeric).
                </span>

                {errors.transactionId && (
                  <span className="text-[10px] font-mono text-red-400 mt-0.5 flex items-center gap-1">
                    <span>⚠</span> {errors.transactionId}
                  </span>
                )}
              </div>

              {/* Field 2: Payment Screenshot * */}
              <div className="flex flex-col text-left w-full min-w-0">
                <label className="flex items-center gap-1 text-[11px] sm:text-xs font-sans font-medium text-zinc-200 mb-1 select-none">
                  <span>Payment Screenshot</span>
                  <span className="text-[#C6FF35] font-bold text-xs">*</span>
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={handleFileInputChange}
                  className="hidden"
                  id="screenshot-file-input"
                />

                {!payment.screenshotFile && !payment.screenshotPreviewUrl ? (
                  /* Empty State Dropzone matching Image 2 */
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`w-full min-h-[96px] sm:min-h-[105px] rounded-xl border-2 border-dashed p-3 sm:p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 group ${
                      isDragging
                        ? 'border-[#C6FF35] bg-[#C6FF35]/10 shadow-[0_0_20px_rgba(198,255,53,0.2)]'
                        : errors.screenshot
                        ? 'border-red-500/80 bg-red-950/10 hover:border-red-500'
                        : 'border-[#22374E] bg-[#070B10]/70 hover:border-[#C6FF35]/70 hover:bg-[#C6FF35]/[0.02]'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-1.5 group-hover:text-[#C6FF35] group-hover:scale-105 transition-all">
                      <UploadCloud className="w-4 h-4 text-zinc-300 group-hover:text-[#C6FF35]" />
                    </div>
                    <div className="font-sans text-xs font-medium text-white">
                      Upload payment screenshot
                    </div>
                    <div className="font-mono text-[10px] text-zinc-500">
                      PNG, JPG or JPEG
                    </div>
                  </div>
                ) : (
                  /* Selected File State matching Image 2 */
                  <div className="w-full min-h-[96px] sm:min-h-[105px] rounded-xl border border-[#C6FF35]/40 bg-[#070B10] p-3 sm:p-3.5 flex items-center justify-between shadow-[0_0_16px_rgba(198,255,53,0.12)]">
                    <div className="flex items-center gap-3 min-w-0">
                      {payment.screenshotPreviewUrl ? (
                        <img
                          src={payment.screenshotPreviewUrl}
                          alt="Receipt Preview"
                          className="w-12 h-12 rounded-lg object-cover border border-white/[0.1] shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-[#C6FF35]/15 border border-[#C6FF35]/30 flex items-center justify-center shrink-0">
                          <FileCheck className="w-6 h-6 text-[#C6FF35]" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-white truncate max-w-[180px] sm:max-w-xs">
                          {payment.screenshotFileName || payment.screenshotFile?.name || 'receipt_screenshot.png'}
                        </div>
                        <div className="font-mono text-[10px] text-zinc-400">
                          {payment.screenshotFile
                            ? `${(payment.screenshotFile.size / 1024).toFixed(1)} KB`
                            : 'Attached'}
                        </div>
                        <div className="font-mono text-[10px] text-[#C6FF35] flex items-center gap-1 mt-0.5">
                          <ShieldCheck className="w-3 h-3" />
                          <span>Ready for submission</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-2.5 py-1 rounded-md border border-slate-700 hover:border-slate-500 text-[11px] font-mono text-zinc-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                        title="Replace receipt"
                      >
                        <RotateCw className="w-3 h-3" />
                        <span className="hidden sm:inline">Replace</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        className="p-1 rounded-md text-zinc-400 hover:text-red-400 hover:bg-white/[0.05] transition-colors cursor-pointer"
                        title="Remove receipt"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {errors.screenshot && (
                  <span className="text-[10px] font-mono text-red-400 mt-0.5 flex items-center gap-1">
                    <span>⚠</span> {errors.screenshot}
                  </span>
                )}
              </div>
            </div>

            {/* Compact Amber Payment Verification Notice matching Image 2 */}
            <div className="w-full p-2.5 rounded-lg bg-amber-950/20 border border-amber-600/40 flex items-start gap-2.5 mt-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-[11px] leading-relaxed text-zinc-300">
                <span className="text-amber-400 font-mono font-bold uppercase tracking-wider">
                  AWAITING VERIFICATION:{' '}
                </span>
                Payment receipt reviewed by committee. Confirmation shared via email.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation Buttons matching Image 2 */}
      <div className="registration-navigation">
        <button
          type="button"
          onClick={onBack}
          className="h-[40px] sm:h-[42px] px-6 sm:px-7 rounded-[10px] border border-slate-700/80 hover:border-slate-500 bg-black/40 hover:bg-white/[0.04] text-white font-mono text-xs sm:text-[13px] font-bold tracking-wider inline-flex items-center gap-2 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#C6FF35]" />
          <span>BACK</span>
        </button>

        <button
          type="submit"
          className="h-[40px] sm:h-[42px] px-7 sm:px-8 rounded-[10px] bg-[#C6FF35] hover:bg-[#bcf026] text-black font-mono text-xs sm:text-[13px] font-bold tracking-wider inline-flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(198,255,53,0.4)] cursor-pointer"
        >
          <span>CONTINUE</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>
    </form>
  );
};
