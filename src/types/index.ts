export interface Profile {
  id: string;
  name: string;
  age: number; // 40+
  profession: string;
  company: string;
  education: string;
  location: string;
  bio: string;
  lifeStage: 'Single / Never Married' | 'Divorced & Thriving' | 'Widowed' | 'Proud Parent (Empty Nester)' | 'Co-Parenting with Harmony';
  rashi: string;
  rashiElement: 'Earth' | 'Water' | 'Fire' | 'Air';
  aadhaarVerified: boolean;
  aadhaarMasked: string;
  verificationDate: string;
  trustScore: number;
  photos: string[];
  interests: string[];
  values: string[];
  relationshipIntent: 'Long-term Meaningful Partnership' | 'Companionship & Shared Adventures' | 'Lifelong Intellectual Equal' | 'Marriage & Life Union';
  lifestylePacing: string;
  retirementVision: string;
  e2eePublicKeyFingerprint: string;
  isBoosted?: boolean;
  distanceKm: number;
  compatibilityScore: number;
  matchReasons: string[];
}

export interface AadhaarVerificationState {
  isVerified: boolean;
  aadhaarNumber: string;
  maskedNumber: string;
  holderName: string;
  dob: string;
  age: number;
  gender: string;
  state: string;
  digitalSignatureHash: string;
  verificationTimestamp: string;
  status: 'unverified' | 'otp_sent' | 'verifying' | 'verified' | 'rejected';
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  isEncrypted: boolean;
  read: boolean;
  type: 'text' | 'rendezvous_proposal' | 'icebreaker';
  rendezvousDetails?: {
    title: string;
    venueType: string;
    date: string;
    status: 'proposed' | 'accepted' | 'declined';
  };
}

export interface Conversation {
  matchId: string;
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
  messages: Message[];
}

export interface AICompatibilityResult {
  overallScore: number;
  executiveSummary: string;
  strengths: string[];
  potentialFrictions: string;
  intellectualIcebreakers: string[];
  recommendedFirstRendezvous: string;
}

export interface SubscriptionTier {
  id: 'silver' | 'gold' | 'platinum';
  name: string;
  tierSubtitle: string;
  priceMonthly: number;
  priceAnnual: number;
  popular?: boolean;
  perks: string[];
  badgeColor: string;
}

export interface UserBoostState {
  active: boolean;
  boostType: 'spotlight' | 'direct_intro' | 'rewind' | null;
  expiresAt: number | null;
  creditsRemaining: number;
}
