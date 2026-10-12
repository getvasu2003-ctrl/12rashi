import React from 'react';
import {
  Compass, MessageSquare, Video, ShieldCheck, Crown, User,
  Lock, Flame, Sparkles, Smartphone, LogIn, LogOut
} from 'lucide-react';
import { AadhaarVerificationState, UserBoostState } from '../types';

interface NavbarProps {
  activeTab: 'dossiers' | 'messages' | 'trust' | 'membership' | 'profile';
  setActiveTab: (tab: 'dossiers' | 'messages' | 'trust' | 'membership' | 'profile') => void;
  userVerification: AadhaarVerificationState;
  onOpenAadhaarModal: () => void;
  currentTier: 'silver' | 'gold' | 'platinum';
  boostState: UserBoostState;
  unreadCount: number;
  isLoggedIn: boolean;
  userMobile: string;
  onOpenMobileAuth: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  userVerification,
  onOpenAadhaarModal,
  currentTier,
  boostState,
  unreadCount,
  isLoggedIn,
  userMobile,
  onOpenMobileAuth,
  onLogout,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-amber-500/20 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <div
            onClick={() => setActiveTab('dossiers')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-600 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-900/40 border border-amber-300/40 group-hover:scale-105 transition">
              <span className="font-serif-luxury text-slate-950 font-black text-xl tracking-tighter">
                12R
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif-luxury font-bold text-lg sm:text-xl text-white tracking-wide">
                  12Rashi
                </span>
                <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  40+ Exclusive
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans tracking-tight">
                Dating app for mature professionals
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <button
              onClick={() => setActiveTab('dossiers')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
                activeTab === 'dossiers'
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Curated Dossiers</span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`relative px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
                activeTab === 'messages'
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-amber-400" />
              <span>Encrypted Chat</span>
              {unreadCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('trust')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
                activeTab === 'trust'
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Trust &amp; Aadhaar Hub</span>
            </button>

            <button
              onClick={() => setActiveTab('membership')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
                activeTab === 'membership'
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Crown className="w-4 h-4 text-amber-400" />
              <span>Membership &amp; Boosts</span>
            </button>
          </nav>

          {/* Right Status Badges & Profile */}
          <div className="flex items-center space-x-2.5">
            {/* Boost Active Badge */}
            {boostState.active && (
              <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-300 text-xs font-medium gold-glow">
                <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span className="text-[11px] font-mono">Spotlight ON</span>
              </div>
            )}

            {/* Mobile OTP Login Badge & Logout */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={onOpenMobileAuth}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border bg-slate-900 border-slate-700 text-slate-300 hover:border-amber-500/50 transition"
                  title="Mobile Authentication Status (MSG91 & Jio DLT)"
                >
                  <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-mono text-[11px]">+91 {userMobile.slice(0, 5)}...</span>
                </button>
                <button
                  onClick={onLogout}
                  className="p-1.5 rounded-xl border border-slate-700 text-slate-400 hover:text-red-400 hover:border-red-500/40 bg-slate-900 transition"
                  title="Sign Out to Login Page"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenMobileAuth}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold hover:from-amber-400 transition shadow-md shadow-amber-950/40"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Mobile Login (OTP)</span>
              </button>
            )}

            {/* Aadhaar Badge */}
            <button
              onClick={onOpenAadhaarModal}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                userVerification.isVerified
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                  : 'bg-amber-500/10 text-amber-300 border-amber-500/40 hover:bg-amber-500/20'
              }`}
              title="Aadhaar Verification Status"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {userVerification.isVerified ? 'Aadhaar Verified' : 'Verify Aadhaar'}
              </span>
            </button>

            {/* Profile Avatar Button */}
            <button
              onClick={() => setActiveTab('profile')}
              className={`p-1 rounded-full border transition ${
                activeTab === 'profile'
                  ? 'border-amber-400 ring-2 ring-amber-400/20'
                  : 'border-slate-700 hover:border-slate-500'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-200">
                <User className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="md:hidden flex items-center justify-around py-2.5 border-t border-slate-800 text-[11px] font-semibold text-slate-300">
          <button
            onClick={() => setActiveTab('dossiers')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'dossiers' ? 'text-amber-400' : ''}`}
          >
            <Compass className="w-4 h-4" />
            <span>Dossiers</span>
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'messages' ? 'text-amber-400' : ''}`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat</span>
          </button>
          <button
            onClick={() => onOpenMobileAuth()}
            className="flex flex-col items-center gap-1 text-emerald-400"
          >
            <Smartphone className="w-4 h-4" />
            <span>OTP Login</span>
          </button>
          <button
            onClick={() => setActiveTab('membership')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'membership' ? 'text-amber-400' : ''}`}
          >
            <Crown className="w-4 h-4" />
            <span>Cashfree</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-amber-400' : ''}`}
          >
            <User className="w-4 h-4" />
            <span>Profile</span>
          </button>
        </div>
      </div>
    </header>
  );
};
