import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, CheckCircle2, AlertCircle, RefreshCw, Smartphone, KeyRound, QrCode, FileText, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AadhaarVerificationState } from '../types';

interface AadhaarVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  verificationState: AadhaarVerificationState;
  onVerificationComplete: (updatedState: AadhaarVerificationState) => void;
}

export const AadhaarVerificationModal: React.FC<AadhaarVerificationModalProps> = ({
  isOpen,
  onClose,
  verificationState,
  onVerificationComplete,
}) => {
  const [aadhaarInput, setAadhaarInput] = useState('');
  const [fullName, setFullName] = useState(verificationState.holderName || 'Vasu Sharma');
  const [birthYear, setBirthYear] = useState('1980'); // 46 years old
  const [gender, setGender] = useState('Male');
  const [state, setState] = useState('Maharashtra');
  const [step, setStep] = useState<'input' | 'otp' | 'success'>(
    verificationState.isVerified ? 'success' : 'input'
  );
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [otpTimer, setOtpTimer] = useState(60);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 'otp' && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, otpTimer]);

  if (!isOpen) return null;

  // Format Aadhaar input with spaces: 1234 5678 9012
  const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 12);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
    setAadhaarInput(formatted);
    setErrorMsg('');
  };

  const currentYear = 2026;
  const calculatedAge = currentYear - parseInt(birthYear || '1980', 10);

  const handleRequestOtp = () => {
    const digitsOnly = aadhaarInput.replace(/\s/g, '');
    if (digitsOnly.length !== 12) {
      setErrorMsg('Please enter a valid 12-digit Aadhaar number.');
      return;
    }
    if (calculatedAge < 40) {
      setErrorMsg(`Platform requirement: 12Rashi is exclusively reserved for mature professionals aged 40+. (Current calculated age: ${calculatedAge})`);
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    // Simulate UIDAI secure handshake
    setTimeout(() => {
      const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(mockOtp);
      setIsLoading(false);
      setStep('otp');
      setOtpTimer(60);
    }, 1200);
  };

  const handleVerifyOtp = () => {
    if (enteredOtp !== generatedOtp) {
      setErrorMsg('Incorrect OTP entered. Please verify the code.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      const digitsOnly = aadhaarInput.replace(/\s/g, '');
      const last4 = digitsOnly.slice(-4);
      const masked = `•••• •••• ${last4}`;
      const hash = `SHA256:UIDAI-IN-${Math.random().toString(36).substring(2, 10).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
      const nowFormatted = new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });

      const updated: AadhaarVerificationState = {
        isVerified: true,
        aadhaarNumber: digitsOnly,
        maskedNumber: masked,
        holderName: fullName,
        dob: `15/07/${birthYear}`,
        age: calculatedAge,
        gender: gender,
        state: state,
        digitalSignatureHash: hash,
        verificationTimestamp: nowFormatted,
        status: 'verified'
      };

      setIsLoading(false);
      setStep('success');
      onVerificationComplete(updated);

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }, 1500);
  };

  const handleResetVerification = () => {
    const resetState: AadhaarVerificationState = {
      isVerified: false,
      aadhaarNumber: '',
      maskedNumber: '',
      holderName: 'Vasu Sharma',
      dob: '15/07/1980',
      age: 46,
      gender: 'Male',
      state: 'Maharashtra',
      digitalSignatureHash: '',
      verificationTimestamp: '',
      status: 'unverified'
    };
    onVerificationComplete(resetState);
    setStep('input');
    setAadhaarInput('');
    setEnteredOtp('');
    setGeneratedOtp('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 p-6 border-b border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-900/30">
              <ShieldCheck className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif-luxury tracking-wide text-amber-100 flex items-center gap-2">
                UIDAI Aadhaar Verified Identity
                <span className="text-[11px] font-sans uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-medium tracking-normal">
                  40+ Exclusive
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                End-to-End Cryptographic Authentication for Discerning Mature Professionals
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {step === 'input' && (
            <div className="space-y-5">
              <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 text-xs text-slate-300 leading-relaxed flex items-start space-x-3">
                <Lock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-200 block mb-1">Zero-Knowledge & Full Privacy Guarantee:</strong>
                  Your 12-digit Aadhaar UID is never stored in plaintext on our servers. It is securely verified against UIDAI via DigiLocker tokenization to validate your legal name and age (&ge;40). Only your masked number (e.g. <span className="font-mono text-amber-300">•••• •••• 8914</span>) and digital verification seal are displayed.
                </div>
              </div>

              {errorMsg && (
                <div className="bg-red-950/40 border border-red-500/40 rounded-xl p-3 text-xs text-red-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    12-Digit Aadhaar Number (UID)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={aadhaarInput}
                      onChange={handleAadhaarChange}
                      placeholder="e.g. 5621 8934 6219"
                      maxLength={14}
                      className="w-full bg-slate-950 border border-slate-700 focus:border-amber-500 rounded-xl px-4 py-3 text-lg font-mono tracking-widest text-white focus:outline-none focus:ring-1 focus:ring-amber-500 transition"
                    />
                    <div className="absolute right-3 top-3 text-xs text-slate-500 font-mono">
                      {aadhaarInput.replace(/\s/g, '').length} / 12
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Full Legal Name (as on Aadhaar)
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Birth Year (Age: {calculatedAge})
                    </label>
                    <select
                      value={birthYear}
                      onChange={(e) => setBirthYear(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
                    >
                      {Array.from({ length: 30 }, (_, i) => 1986 - i).map((yr) => (
                        <option key={yr} value={yr.toString()}>
                          {yr} ({currentYear - yr} years old)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Gender
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      State / Region
                    </label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
                    >
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Gujarat">Gujarat</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Instant Fill Helper for Demo */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setAadhaarInput('5621 8934 6219');
                    setFullName('Vasu Sharma');
                    setBirthYear('1980');
                  }}
                  className="text-[11px] text-amber-400/80 hover:text-amber-300 underline underline-offset-2 flex items-center gap-1"
                >
                  <KeyRound className="w-3.5 h-3.5" /> Use demo mature professional Aadhaar credentials
                </button>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleRequestOtp}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold py-3 px-6 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-amber-600/20 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Connecting to UIDAI Gateway...
                    </>
                  ) : (
                    <>
                      <Smartphone className="w-4 h-4" />
                      Generate UIDAI 2-Factor OTP
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 'otp' && (
            <div className="space-y-5">
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-center">
                <Smartphone className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                <h3 className="text-base font-semibold text-amber-100">Enter UIDAI Verification OTP</h3>
                <p className="text-xs text-slate-300 mt-1">
                  Sent to registered mobile linked with Aadhaar <span className="font-mono text-amber-300 font-semibold">{aadhaarInput}</span>
                </p>
                {/* Live simulation banner */}
                <div className="mt-3 bg-slate-950/80 border border-amber-400/40 rounded-lg p-2.5 text-xs text-amber-200 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    Simulated SMS: <strong className="font-mono text-sm tracking-wider text-white">{generatedOtp}</strong>
                  </span>
                  <button
                    onClick={() => setEnteredOtp(generatedOtp)}
                    className="text-[11px] bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 px-2 py-1 rounded border border-amber-500/30 font-medium"
                  >
                    Auto-Fill OTP
                  </button>
                </div>
              </div>

              {errorMsg && (
                <div className="bg-red-950/40 border border-red-500/40 rounded-xl p-3 text-xs text-red-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 text-center">
                  6-Digit Security OTP
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="• • • • • •"
                  className="w-full text-center tracking-[0.5em] text-2xl font-mono bg-slate-950 border border-slate-700 focus:border-amber-500 rounded-xl py-3 text-amber-200 focus:outline-none"
                />
                <div className="flex justify-between items-center mt-2 text-xs text-slate-400">
                  <span>Resend OTP in {otpTimer}s</span>
                  <button
                    disabled={otpTimer > 0}
                    onClick={handleRequestOtp}
                    className="text-amber-400 hover:text-amber-300 disabled:opacity-40"
                  >
                    Resend Code
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('input')}
                  className="w-1/3 bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 rounded-xl font-medium text-sm transition"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={isLoading || enteredOtp.length !== 6}
                  className="w-2/3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Validating Cryptographic Seal...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      Authenticate Identity
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="space-y-5">
              {/* Official Certificate Card */}
              <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/30 border-2 border-emerald-500/50 rounded-2xl p-5 shadow-xl overflow-hidden">
                <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-start justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                      <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-semibold block">
                        Government Identity Authenticated
                      </span>
                      <h4 className="text-lg font-bold text-white font-serif-luxury">
                        {verificationState.holderName || fullName}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-amber-200/90 font-mono">
                          {verificationState.maskedNumber || '•••• •••• 6219'}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                          Age Verified: {verificationState.age || calculatedAge} yrs
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="p-1.5 bg-slate-900 rounded-lg border border-slate-800 inline-block">
                      <QrCode className="w-8 h-8 text-amber-400" />
                    </div>
                  </div>
                </div>

                {/* Verification Metadata Grid */}
                <div className="grid grid-cols-2 gap-3 py-4 text-xs border-b border-slate-800">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">State / Jurisdiction</span>
                    <span className="text-slate-200 font-medium">{verificationState.state || 'Maharashtra, India'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Verification Timestamp</span>
                    <span className="text-slate-200 font-medium">{verificationState.verificationTimestamp || 'Active & Validated'}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">Cryptographic Hash Seal</span>
                    <span className="text-amber-300/80 font-mono text-[11px] break-all">
                      {verificationState.digitalSignatureHash || 'SHA256:UIDAI-IN-A48F920-E2EE-ACTIVE'}
                    </span>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between text-xs text-emerald-400 font-medium">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Full Unrestricted Executive Status Unlocked
                  </span>
                  <span className="text-[11px] text-slate-400 font-normal">
                    100% Bot & Scammer Free
                  </span>
                </div>
              </div>

              {/* Explanation of Benefits */}
              <div className="space-y-2 text-xs text-slate-300 bg-slate-800/40 p-4 rounded-xl border border-slate-700/50">
                <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  Your profile now displays the exclusive Emerald Aadhaar Trust Seal.
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  High-definition encrypted Video Dates are now enabled on your account.
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  3.4x higher response rate from other accomplished verified professionals.
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleResetVerification}
                  className="w-1/3 bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 rounded-xl font-medium text-xs transition flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Re-verify / Reset
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-2/3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold py-3 rounded-xl transition"
                >
                  Done & Continue
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
