import React, { useState, useEffect } from 'react';
import {
  Profile, AadhaarVerificationState, Message, UserBoostState, SubscriptionTier
} from './types';
import {
  INITIAL_PROFILES, INITIAL_USER_PROFILE, INITIAL_CONVERSATIONS
} from './data/mockProfiles';
import { Navbar } from './components/Navbar';
import { CuratedDossiers } from './components/CuratedDossiers';
import { EncryptedChat } from './components/EncryptedChat';
import { VideoDateRoom } from './components/VideoDateRoom';
import { TrustHub } from './components/TrustHub';
import { MembershipAndBoosts } from './components/MembershipAndBoosts';
import { UserProfileEditor } from './components/UserProfileEditor';
import { AadhaarVerificationModal } from './components/AadhaarVerificationModal';
import { AICompatibilityModal } from './components/AICompatibilityModal';
import { MobileAuthModal } from './components/MobileAuthModal';
import { LoginPage } from './components/LoginPage';
import confetti from 'canvas-confetti';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<'dossiers' | 'messages' | 'trust' | 'membership' | 'profile'>('dossiers');

  // Mobile Auth state (MSG91 & Jio DLT) - defaults to false so Login Page opens first
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userMobile, setUserMobile] = useState('9876543210');
  const [isMobileAuthOpen, setIsMobileAuthOpen] = useState(false);

  // Profiles and User state
  const [profiles, setProfiles] = useState<Profile[]>(INITIAL_PROFILES);
  const [userProfile, setUserProfile] = useState<Profile>(INITIAL_USER_PROFILE);

  // Aadhaar Verification state
  const [userVerification, setUserVerification] = useState<AadhaarVerificationState>({
    isVerified: true,
    aadhaarNumber: '562189346219',
    maskedNumber: '•••• •••• 6219',
    holderName: 'Vasu Sharma',
    dob: '15/07/1980',
    age: 46,
    gender: 'Male',
    state: 'Maharashtra',
    digitalSignatureHash: 'SHA256:UIDAI-IN-A48F920-E2EE-ACTIVE',
    verificationTimestamp: '10 Feb 2026',
    status: 'verified'
  });

  // Conversations
  const [conversations, setConversations] = useState<Record<string, Message[]>>(INITIAL_CONVERSATIONS);

  // Membership & Monetization (Cashfree PG)
  const [currentTier, setCurrentTier] = useState<'silver' | 'gold' | 'platinum'>('gold');
  const [boostState, setBoostState] = useState<UserBoostState>({
    active: false,
    boostType: null,
    expiresAt: null,
    creditsRemaining: 3
  });

  // Executive Privacy Settings
  const [incognitoMode, setIncognitoMode] = useState(false);
  const [discreetPhotoBlur, setDiscreetPhotoBlur] = useState(false);

  // Modals & Active Session states
  const [isAadhaarModalOpen, setIsAadhaarModalOpen] = useState(false);
  const [aiCompatibilityMatch, setAiCompatibilityMatch] = useState<Profile | null>(null);
  const [activeVideoCallMatch, setActiveVideoCallMatch] = useState<Profile | null>(null);
  const [postCallPrompt, setPostCallPrompt] = useState<{ match: Profile; notes: string } | null>(null);

  // Boost timer ticker
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (boostState.active && boostState.expiresAt) {
      interval = setInterval(() => {
        if (Date.now() >= (boostState.expiresAt || 0)) {
          setBoostState((prev) => ({
            ...prev,
            active: false,
            boostType: null,
            expiresAt: null
          }));
        }
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [boostState]);

  // Handlers
  const handleSendMessage = (
    receiverId: string,
    text: string,
    type: Message['type'] = 'text',
    rendezvousDetails?: any
  ) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      senderId: 'current-user',
      receiverId,
      text,
      timestamp: 'Just now',
      isEncrypted: true,
      read: true,
      type,
      rendezvousDetails
    };

    setConversations((prev) => {
      const existing = prev[receiverId] || [];
      return {
        ...prev,
        [receiverId]: [...existing, newMessage]
      };
    });
  };

  const handleStartChat = (profile: Profile) => {
    setActiveTab('messages');
  };

  const handleStartVideoDate = (profile: Profile) => {
    setActiveVideoCallMatch(profile);
  };

  const handleEndVideoDate = (notes?: string) => {
    if (activeVideoCallMatch) {
      const finishedMatch = activeVideoCallMatch;
      setActiveVideoCallMatch(null);
      if (notes) {
        setPostCallPrompt({ match: finishedMatch, notes });
      }
    }
  };

  const handleActivateBoost = (type: 'spotlight' | 'direct_intro' | 'rewind') => {
    if (boostState.creditsRemaining <= 0) return;

    if (type === 'spotlight') {
      const expireTime = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
      setBoostState((prev) => ({
        ...prev,
        active: true,
        boostType: 'spotlight',
        expiresAt: expireTime,
        creditsRemaining: prev.creditsRemaining - 1
      }));
      confetti({ particleCount: 70, spread: 60 });
    } else if (type === 'direct_intro') {
      setBoostState((prev) => ({
        ...prev,
        creditsRemaining: prev.creditsRemaining - 1
      }));
      setActiveTab('messages');
    } else {
      setBoostState((prev) => ({
        ...prev,
        creditsRemaining: prev.creditsRemaining - 1
      }));
      setActiveTab('dossiers');
    }
  };

  const handleAddCredits = (count: number) => {
    setBoostState((prev) => ({
      ...prev,
      creditsRemaining: prev.creditsRemaining + count
    }));
  };

  const handleVerificationComplete = (updatedState: AadhaarVerificationState) => {
    setUserVerification(updatedState);
    setUserProfile((prev) => ({
      ...prev,
      aadhaarVerified: updatedState.isVerified,
      aadhaarMasked: updatedState.maskedNumber,
      verificationDate: updatedState.verificationTimestamp,
      trustScore: updatedState.isVerified ? 99 : 60
    }));
  };

  const handleLoginSuccess = (userData: {
    mobile: string;
    token: string;
    name: string;
    age: number;
    profession: string;
  }) => {
    setIsLoggedIn(true);
    setUserMobile(userData.mobile);
    setUserProfile((prev) => ({
      ...prev,
      name: userData.name || prev.name,
      age: userData.age || prev.age,
      profession: userData.profession || prev.profession,
    }));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // If active video call room is mounted, render it full screen
  if (activeVideoCallMatch) {
    return (
      <VideoDateRoom
        matchProfile={activeVideoCallMatch}
        onEndCall={handleEndVideoDate}
      />
    );
  }

  // If user is not logged in, show dedicated Login Page with Mobile OTP verification
  if (!isLoggedIn) {
    return (
      <LoginPage
        onLoginSuccess={handleLoginSuccess}
        onExploreDemo={() => {
          setIsLoggedIn(true);
          setUserMobile('9876543210');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userVerification={userVerification}
        onOpenAadhaarModal={() => setIsAadhaarModalOpen(true)}
        currentTier={currentTier}
        boostState={boostState}
        unreadCount={1}
        isLoggedIn={isLoggedIn}
        userMobile={userMobile}
        onOpenMobileAuth={() => setIsMobileAuthOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main App Content View Router */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'dossiers' && (
          <CuratedDossiers
            profiles={profiles}
            userProfile={userProfile}
            userVerified={userVerification.isVerified}
            onOpenAadhaarModal={() => setIsAadhaarModalOpen(true)}
            onOpenAICompatibility={(prof) => setAiCompatibilityMatch(prof)}
            onStartVideoDate={handleStartVideoDate}
            onStartChat={handleStartChat}
            onUseDirectIntro={(prof) => handleActivateBoost('direct_intro')}
            discreetPhotoBlur={discreetPhotoBlur}
            isBoostActive={boostState.active}
          />
        )}

        {activeTab === 'messages' && (
          <EncryptedChat
            currentProfileId={userProfile.id}
            profiles={profiles}
            conversations={conversations}
            onSendMessage={handleSendMessage}
            onStartVideoDate={handleStartVideoDate}
            onOpenAICompatibility={(prof) => setAiCompatibilityMatch(prof)}
            onOpenAadhaarModal={() => setIsAadhaarModalOpen(true)}
            userVerified={userVerification.isVerified}
          />
        )}

        {activeTab === 'trust' && (
          <TrustHub
            userVerification={userVerification}
            onOpenAadhaarModal={() => setIsAadhaarModalOpen(true)}
            incognitoMode={incognitoMode}
            onToggleIncognito={() => setIncognitoMode(!incognitoMode)}
            discreetPhotoBlur={discreetPhotoBlur}
            onTogglePhotoBlur={() => setDiscreetPhotoBlur(!discreetPhotoBlur)}
          />
        )}

        {activeTab === 'membership' && (
          <MembershipAndBoosts
            currentTier={currentTier}
            onUpdateTier={setCurrentTier}
            boostState={boostState}
            onActivateBoost={handleActivateBoost}
            onAddCredits={handleAddCredits}
            customerPhone={userMobile}
            customerName={userProfile.name}
          />
        )}

        {activeTab === 'profile' && (
          <UserProfileEditor
            userProfile={userProfile}
            userVerification={userVerification}
            onUpdateProfile={setUserProfile}
            onOpenAadhaarModal={() => setIsAadhaarModalOpen(true)}
          />
        )}
      </main>

      {/* Mobile OTP Login Modal (MSG91 & Jio DLT) */}
      <MobileAuthModal
        isOpen={isMobileAuthOpen}
        onClose={() => setIsMobileAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        currentMobile={userMobile}
        isLoggedIn={isLoggedIn}
      />

      {/* Aadhaar Verification Modal */}
      <AadhaarVerificationModal
        isOpen={isAadhaarModalOpen}
        onClose={() => setIsAadhaarModalOpen(false)}
        verificationState={userVerification}
        onVerificationComplete={handleVerificationComplete}
      />

      {/* AI Compatibility Modal */}
      <AICompatibilityModal
        isOpen={Boolean(aiCompatibilityMatch)}
        onClose={() => setAiCompatibilityMatch(null)}
        userProfile={userProfile}
        matchProfile={aiCompatibilityMatch}
        onSelectIcebreaker={(icebreakerText) => {
          if (aiCompatibilityMatch) {
            handleSendMessage(aiCompatibilityMatch.id, icebreakerText, 'icebreaker');
            setAiCompatibilityMatch(null);
            setActiveTab('messages');
          }
        }}
      />

      {/* Post Video Call Reflection Dialog */}
      {postCallPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h4 className="text-base font-bold text-white font-serif-luxury">
              Rendezvous Reflections Saved
            </h4>
            <p className="text-xs text-slate-300">
              Your confidential thoughts from your video date with {postCallPrompt.match.name} have been encrypted and stored in your private log:
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs italic text-slate-200">
              "{postCallPrompt.notes}"
            </div>
            <div className="pt-2 flex gap-3">
              <button
                onClick={() => setPostCallPrompt(null)}
                className="w-1/2 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2.5 rounded-xl text-xs font-semibold"
              >
                Done
              </button>
              <button
                onClick={() => {
                  setPostCallPrompt(null);
                  setActiveTab('messages');
                }}
                className="w-1/2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold py-2.5 rounded-xl text-xs"
              >
                Send Follow-up Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
