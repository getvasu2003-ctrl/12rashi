import React, { useState, useEffect } from 'react';
import {
  Smartphone, ShieldCheck, Lock, RefreshCw, AlertCircle,
  CheckCircle2, ArrowRight, X, KeyRound, Radio, Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MobileAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (userData: {
    mobile: string;
    token: string;
    name: string;
    age: number;
    profession: string;
  }) => void;
  currentMobile?: string;
  isLoggedIn: boolean;
}

export const MobileAuthModal: React.FC<MobileAuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  currentMobile,
  isLoggedIn,
}) => {
  const [mobileInput, setMobileInput] = useState(currentMobile ? currentMobile.replace(/\D/g, '').slice(-10) : '9876543210');
  const [otpInput, setOtpInput] = useState('');
  const [step, setStep] = useState<'mobile' | 'otp'>('mobile');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [simulatedOtp, setSimulatedOtp] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(45);
  const [dltMetadata, setDltMetadata] = useState<{
    entityId: string;
    templateId: string;
    senderId: string;
  } | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 'otp' && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  if (!isOpen) return null;

  const handleSendOtp = async () => {
    const clean = mobileInput.replace(/\D/g, '').slice(-10);
    if (clean.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: clean }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send OTP');
      }

      setDltMetadata(data.dltInfo || {
        entityId: '1101452890000012345',
        templateId: '1107161829482718293',
        senderId: 'TWLRSH',
      });

      if (data.simulatedOtp) {
        setSimulatedOtp(data.simulatedOtp);
      }

      setStep('otp');
      setResendTimer(45);
    } catch (err: any) {
      setErrorMsg(err.message || 'Network error occurred while connecting to SMS gateway');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otpInput.trim().length !== 6) {
      setErrorMsg('Please enter the 6-digit OTP code.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mobile: mobileInput.replace(/\D/g, '').slice(-10),
          otp: otpInput.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Invalid OTP code');
      }

      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });

      onLoginSuccess({
        mobile: data.user.mobile,
        token: data.token,
        name: data.user.name,
        age: data.user.age,
        profession: data.user.profession,
      });

      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to authenticate OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: mobileInput.replace(/\D/g, '').slice(-10) }),
      });
      const data = await res.json();
      if (data.simulatedOtp) {
        setSimulatedOtp(data.simulatedOtp);
      }
      setResendTimer(45);
    } catch (err: any) {
      setErrorMsg('Failed to resend OTP');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-slate-900 border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 p-6 border-b border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-900/30">
              <Smartphone className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h3 className="text-base font-bold font-serif-luxury text-amber-100 flex items-center gap-2">
                Mobile OTP Authentication
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">
                  Jio DLT Verified
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Powered by MSG91 Enterprise Gateway &amp; Jio DLT
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

        {/* DLT Protocol Badge */}
        <div className="bg-slate-950/80 px-5 py-2.5 border-b border-slate-800 text-[11px] flex items-center justify-between text-slate-400">
          <span className="flex items-center gap-1.5 text-slate-300">
            <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
            DLT Header: <strong className="text-amber-300 font-mono">TWLRSH</strong>
          </span>
          <span className="font-mono text-[10px] text-slate-500">
            Entity: 1101452890000012345
          </span>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {errorMsg && (
            <div className="bg-red-950/40 border border-red-500/40 rounded-xl p-3 text-xs text-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {step === 'mobile' ? (
            <div className="space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed">
                Enter your registered mobile number. A 6-digit one-time password will be dispatched to your phone through Jio DLT-approved transactional SMS route.
              </p>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Mobile Number (India +91)
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 font-semibold text-sm text-amber-300 flex items-center gap-1">
                    <span>🇮🇳</span> +91
                  </div>
                  <input
                    type="tel"
                    value={mobileInput}
                    onChange={(e) => {
                      setMobileInput(e.target.value.replace(/\D/g, '').slice(0, 10));
                      setErrorMsg('');
                    }}
                    maxLength={10}
                    placeholder="98765 43210"
                    className="w-full bg-slate-950 border border-slate-700 focus:border-amber-500 rounded-xl pl-18 pr-4 py-3 text-base font-mono text-white tracking-wider focus:outline-none focus:ring-1 focus:ring-amber-500 transition"
                  />
                </div>
              </div>

              {/* Demo Helper */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setMobileInput('9876543210')}
                  className="text-[11px] text-amber-400/80 hover:text-amber-300 underline underline-offset-2 flex items-center gap-1"
                >
                  <KeyRound className="w-3 h-3" /> Use demo executive mobile: +91 98765 43210
                </button>
              </div>

              <button
                type="button"
                onClick={handleSendOtp}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-amber-950/40 disabled:opacity-50 text-xs"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Connecting to MSG91 &amp; Jio DLT...
                  </>
                ) : (
                  <>
                    <span>Request 6-Digit OTP</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3.5 text-center">
                <p className="text-xs text-slate-300">
                  Verification code dispatched to{' '}
                  <strong className="text-amber-300 font-mono">+91 {mobileInput}</strong>
                </p>
                {simulatedOtp && (
                  <div className="mt-2.5 bg-slate-950 border border-amber-400/40 rounded-lg p-2 text-xs flex items-center justify-between text-amber-200">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                      DLT SMS: <strong className="font-mono text-white tracking-widest">{simulatedOtp}</strong>
                    </span>
                    <button
                      onClick={() => setOtpInput(simulatedOtp)}
                      className="text-[11px] bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30"
                    >
                      Auto-Fill
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 text-center">
                  Enter 6-Digit Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                  placeholder="• • • • • •"
                  className="w-full text-center tracking-[0.5em] text-2xl font-mono bg-slate-950 border border-slate-700 focus:border-amber-500 rounded-xl py-3 text-amber-200 focus:outline-none"
                />
                <div className="flex justify-between items-center mt-2 text-xs text-slate-400">
                  <span>Resend in {resendTimer}s</span>
                  <button
                    disabled={resendTimer > 0}
                    onClick={handleResend}
                    className="text-amber-400 hover:text-amber-300 disabled:opacity-40"
                  >
                    Resend OTP
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('mobile')}
                  className="w-1/3 bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 rounded-xl font-medium text-xs transition"
                >
                  Change
                </button>
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={isLoading || otpInput.length !== 6}
                  className="w-2/3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 text-slate-950 font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 text-xs disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Verifying Token...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      Verify &amp; Log In
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
