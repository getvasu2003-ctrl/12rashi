import React from 'react';
import { ShieldCheck, Lock, Key, EyeOff, ShieldAlert, Award, FileCheck2, Cpu, CheckCircle } from 'lucide-react';
import { AadhaarVerificationState } from '../types';

interface TrustHubProps {
  userVerification: AadhaarVerificationState;
  onOpenAadhaarModal: () => void;
  incognitoMode: boolean;
  onToggleIncognito: () => void;
  discreetPhotoBlur: boolean;
  onTogglePhotoBlur: () => void;
}

export const TrustHub: React.FC<TrustHubProps> = ({
  userVerification,
  onOpenAadhaarModal,
  incognitoMode,
  onToggleIncognito,
  discreetPhotoBlur,
  onTogglePhotoBlur,
}) => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-in fade-in duration-300">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-amber-950/40 border border-amber-500/20 p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              100% Aadhaar-Authenticated & Encrypted Network
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-serif-luxury text-slate-100">
              The Fortress of Trust & Privacy for 40+ Leaders
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Mature professionals require non-negotiable confidentiality, verified credentials, and complete protection from impersonation. At 12Rashi, superficial anonymity is eliminated in favor of government-verified identity and end-to-end cryptographic privacy.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shrink-0 w-full md:w-72 text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider block">Your Trust Status</span>
              <span className="text-lg font-bold text-white font-serif-luxury">
                {userVerification.isVerified ? 'Aadhaar Verified' : 'Action Required'}
              </span>
            </div>
            {userVerification.isVerified ? (
              <div className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 py-1.5 px-3 rounded-lg border border-emerald-500/20">
                {userVerification.maskedNumber} • Age {userVerification.age}
              </div>
            ) : (
              <p className="text-xs text-amber-300/90">
                Verify with Aadhaar to access Video Dates and private dossiers.
              </p>
            )}
            <button
              onClick={onOpenAadhaarModal}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold py-2.5 px-4 rounded-xl text-xs transition"
            >
              {userVerification.isVerified ? 'View Aadhaar Certificate' : 'Complete Verification'}
            </button>
          </div>
        </div>
      </div>

      {/* 4 Pillars of Executive Security */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pillar 1: Aadhaar Integration */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <FileCheck2 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold font-serif-luxury text-slate-100">
            Aadhaar-Backed Identity Verification
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Eliminates catfishing, fake executive personas, and romance fraud. Every profile undergoes automated DigiLocker/UIDAI verification confirming legal identity and enforcing the strictly mature 40+ requirement.
          </p>
          <div className="space-y-2 text-xs text-slate-400 pt-2 border-t border-slate-800">
            <div className="flex items-center gap-2 text-slate-200">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              12-digit UID verified through 2-Factor OTP
            </div>
            <div className="flex items-center gap-2 text-slate-200">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              UID masked publicly (e.g. •••• •••• 6219)
            </div>
            <div className="flex items-center gap-2 text-slate-200">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Permanent cryptographic verification seal
            </div>
          </div>
        </div>

        {/* Pillar 2: End-to-End Encryption */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold font-serif-luxury text-slate-100">
            End-to-End Encryption (E2EE)
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            All private communications, audio messages, rendezvous proposals, and high-definition video dates are encrypted using Curve25519 &amp; AES-256-GCM. No staff member or external party can read your conversations.
          </p>
          <div className="space-y-2 text-xs text-slate-400 pt-2 border-t border-slate-800">
            <div className="flex items-center gap-2 text-slate-200">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Device-level private key generation
            </div>
            <div className="flex items-center gap-2 text-slate-200">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Safety numbers for out-of-band identity check
            </div>
            <div className="flex items-center gap-2 text-slate-200">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Zero-knowledge server telemetry
            </div>
          </div>
        </div>

        {/* Pillar 3: Executive Discreet Mode */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <EyeOff className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold font-serif-luxury text-slate-100">
            Executive Discretion Controls
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Senior executives, public figures, and physicians often require elevated privacy. Configure selective photo disclosure and incognito discovery.
          </p>
          <div className="pt-2 space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              <div>
                <span className="text-xs font-semibold text-slate-200 block">Incognito Executive Browsing</span>
                <span className="text-[11px] text-slate-400">Only visible to profiles you choose to interact with</span>
              </div>
              <button
                onClick={onToggleIncognito}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  incognitoMode ? 'bg-amber-500' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    incognitoMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              <div>
                <span className="text-xs font-semibold text-slate-200 block">Discreet Photo Shield</span>
                <span className="text-[11px] text-slate-400">Gently blur photos until mutual connection is made</span>
              </div>
              <button
                onClick={onTogglePhotoBlur}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  discreetPhotoBlur ? 'bg-amber-500' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    discreetPhotoBlur ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Pillar 4: AI Integrity & Quality Standards */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold font-serif-luxury text-slate-100">
            Responsible AI & Compatibility Engine
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Our AI runs on modern Gemini models to interpret mature relationship nuances: career transitions, empty-nest stages, communication temperaments, and long-term companionship desires.
          </p>
          <div className="space-y-2 text-xs text-slate-400 pt-2 border-t border-slate-800">
            <div className="flex items-center gap-2 text-slate-200">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Prioritizes life-stage resonance over superficial metrics
            </div>
            <div className="flex items-center gap-2 text-slate-200">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Suggests intellectual icebreakers and dignified rendezvous
            </div>
            <div className="flex items-center gap-2 text-slate-200">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Strictly zero algorithmic rage-bait or gamified addiction loops
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
