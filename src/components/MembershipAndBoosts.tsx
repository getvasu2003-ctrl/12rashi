import React, { useState } from 'react';
import {
  Crown, Zap, Check, ShieldCheck, Sparkles, Star, Flame, Clock,
  ArrowRight, CreditCard, Gift, Lock, RefreshCw, CheckCircle2, ChevronRight
} from 'lucide-react';
import { UserBoostState, SubscriptionTier } from '../types';
import { CashfreeCheckoutModal } from './CashfreeCheckoutModal';

interface MembershipAndBoostsProps {
  currentTier: 'silver' | 'gold' | 'platinum';
  onUpdateTier: (tier: 'silver' | 'gold' | 'platinum') => void;
  boostState: UserBoostState;
  onActivateBoost: (type: 'spotlight' | 'direct_intro' | 'rewind') => void;
  onAddCredits: (count: number) => void;
  customerPhone?: string;
  customerName?: string;
}

const TIERS: SubscriptionTier[] = [
  {
    id: 'silver',
    name: '12Rashi Silver Executive',
    tierSubtitle: 'Foundational verified networking for mature professionals',
    priceMonthly: 1499,
    priceAnnual: 999,
    badgeColor: 'border-slate-600 text-slate-300',
    perks: [
      'Official Aadhaar-Verified Profile Badge',
      'Daily 12 Curated Professional Dossiers',
      'End-to-End Encrypted Real-Time Messaging',
      'Standard AI 5-Pillar Compatibility Summaries',
      '1 Video Date token per week'
    ]
  },
  {
    id: 'gold',
    name: '12Rashi Gold Prestige',
    tierSubtitle: 'The preferred choice for accomplished leaders seeking lifelong equals',
    priceMonthly: 2999,
    priceAnnual: 1899,
    popular: true,
    badgeColor: 'border-amber-500/80 text-amber-300',
    perks: [
      'All Silver Executive Privileges',
      'Unlimited High-Definition Encrypted Video Dates',
      'Unrestricted Real-Time Messaging & Direct Introductions',
      'See Who Bookmarked & Re-visited Your Dossier',
      'Deep Gemini Flash AI Compatibility Reports & Icebreakers',
      'Priority Aadhaar Concierge Identity Seal',
      '1 Complimentary Monthly Executive Spotlight Boost'
    ]
  },
  {
    id: 'platinum',
    name: '12Rashi Platinum Concierge',
    tierSubtitle: 'Ultimate discretion, unlimited boosts & confidential executive match advisory',
    priceMonthly: 6499,
    priceAnnual: 3999,
    badgeColor: 'border-purple-400 text-purple-300',
    perks: [
      'All Gold Prestige Privileges',
      'Confidential Incognito Executive Browsing Mode',
      'Discreet Photo Shield (Selective Revelations)',
      'Weekly Executive Spotlight Boosts (4x/month)',
      'Direct Introductions to High-Net-Worth & Fellow Leaders',
      'Dedicated 1-on-1 Confidential Relationship Advisor',
      'VIP Invitations to Closed-Door 12Rashi Cultural Salons'
    ]
  }
];

export const MembershipAndBoosts: React.FC<MembershipAndBoostsProps> = ({
  currentTier,
  onUpdateTier,
  boostState,
  onActivateBoost,
  onAddCredits,
  customerPhone = '9876543210',
  customerName = 'Vasu Sharma',
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [purchaseSuccessMessage, setPurchaseSuccessMessage] = useState('');

  // Cashfree checkout modal state
  const [cashfreeOrder, setCashfreeOrder] = useState<{
    isOpen: boolean;
    planId: string;
    planName: string;
    amount: number;
    billingPeriod: string;
    isBoostCredits?: boolean;
    creditsCount?: number;
  }>({
    isOpen: false,
    planId: 'gold',
    planName: 'Gold Prestige',
    amount: 1899,
    billingPeriod: '1 Month',
    isBoostCredits: false,
    creditsCount: 0,
  });

  const handleOpenCashfreeSubscription = (tier: SubscriptionTier) => {
    const amount = billingCycle === 'annual' ? tier.priceAnnual * 12 : tier.priceMonthly;
    setCashfreeOrder({
      isOpen: true,
      planId: tier.id,
      planName: tier.name,
      amount,
      billingPeriod: billingCycle === 'annual' ? '1 Year (Billed Annually)' : '1 Month',
      isBoostCredits: false,
      creditsCount: 0,
    });
  };

  const handleOpenCashfreeBoostCredits = () => {
    setCashfreeOrder({
      isOpen: true,
      planId: 'boost_5_pack',
      planName: '5 Executive Boost Credits Pack',
      amount: 1499,
      billingPeriod: 'Immediate Activation',
      isBoostCredits: true,
      creditsCount: 5,
    });
  };

  const handlePaymentSuccess = (receipt: {
    orderId: string;
    transactionId: string;
    amount: number;
    planId: string;
    isBoostCredits?: boolean;
    creditsCount?: number;
  }) => {
    if (receipt.isBoostCredits && receipt.creditsCount) {
      onAddCredits(receipt.creditsCount);
      setPurchaseSuccessMessage(`Payment verified via Cashfree! ${receipt.creditsCount} Boost Credits added to your account (Ref: ${receipt.transactionId}).`);
    } else {
      onUpdateTier(receipt.planId as any);
      setPurchaseSuccessMessage(`Payment verified via Cashfree! Your plan is now upgraded to ${receipt.planId.toUpperCase()} (Ref: ${receipt.transactionId}).`);
    }

    setTimeout(() => {
      setPurchaseSuccessMessage('');
    }, 6000);
  };

  const formatRemainingTime = (expiresAt: number | null) => {
    if (!expiresAt) return '';
    const diff = Math.max(0, Math.floor((expiresAt - Date.now()) / 1000));
    const hours = Math.floor(diff / 3600);
    const mins = Math.floor((diff % 3600) / 60);
    return `${hours}h ${mins}m left`;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-16">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Crown className="w-4 h-4 text-amber-400" />
          12Rashi Executive Membership &amp; Cashfree Payments
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-serif-luxury text-slate-100">
          Invest in Genuine Companionship
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed">
          Premium features tailored to senior leaders, physicians, entrepreneurs, and scholars who value their time, privacy, and connection quality. Integrated with Cashfree Payment Gateway (PG v2023-08-01).
        </p>

        {/* Billing Switch */}
        <div className="pt-2 flex items-center justify-center gap-3">
          <span className={`text-xs font-medium ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-400'}`}>
            Billed Monthly
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
            className="relative w-12 h-6 bg-slate-800 rounded-full p-1 border border-slate-700 transition"
          >
            <div
              className={`w-4 h-4 rounded-full bg-amber-500 transform transition ${
                billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-xs font-medium flex items-center gap-1.5 ${billingCycle === 'annual' ? 'text-amber-300' : 'text-slate-400'}`}>
            Billed Annually
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold border border-emerald-500/30">
              Save 35%
            </span>
          </span>
        </div>
      </div>

      {purchaseSuccessMessage && (
        <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-4 text-xs text-emerald-200 flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="font-semibold">{purchaseSuccessMessage}</span>
          </div>
          <button onClick={() => setPurchaseSuccessMessage('')} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Subscription Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TIERS.map((tier) => {
          const isCurrent = tier.id === currentTier;
          const price = billingCycle === 'annual' ? tier.priceAnnual : tier.priceMonthly;

          return (
            <div
              key={tier.id}
              className={`relative bg-slate-900 border rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                tier.popular
                  ? 'border-amber-500 shadow-2xl shadow-amber-950/40 scale-105 z-10 bg-gradient-to-b from-slate-900 via-slate-900 to-amber-950/20'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-md">
                  Most Chosen by 40+ Leaders
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold font-serif-luxury text-white">
                    {tier.name.replace('12Rashi ', '')}
                  </h3>
                  {isCurrent && (
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-semibold uppercase">
                      Current Plan
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed min-h-[36px]">
                  {tier.tierSubtitle}
                </p>

                <div className="pt-2 pb-4 border-b border-slate-800">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-white font-serif-luxury">₹{price}</span>
                    <span className="text-xs text-slate-400">/ month</span>
                  </div>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    {billingCycle === 'annual' ? `₹${price * 12} billed annually` : 'Cancel or adjust anytime'}
                  </span>
                </div>

                {/* Perks list */}
                <ul className="space-y-3 text-xs text-slate-300 py-2">
                  {tier.perks.map((perk, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => handleOpenCashfreeSubscription(tier)}
                  disabled={isCurrent}
                  className={`w-full py-3 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 ${
                    isCurrent
                      ? 'bg-slate-800 text-slate-400 cursor-default'
                      : tier.popular
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 shadow-lg shadow-amber-950/50'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  }`}
                >
                  {isCurrent ? (
                    'Your Active Plan'
                  ) : (
                    <>
                      <span>Pay via Cashfree (₹{billingCycle === 'annual' ? price * 12 : price})</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Profile Boost Features Section */}
      <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest mb-1">
              <Zap className="w-4 h-4 text-amber-400" />
              Executive Profile Boosts
            </div>
            <h2 className="text-2xl font-bold font-serif-luxury text-slate-100">
              Accelerate Meaningful Introductions
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Elevate your profile when you're ready to meet someone special. Boosts are discreet, dignified, and targeted exclusively to verified compatible leaders.
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 shrink-0">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Available Boost Credits</span>
              <span className="text-2xl font-extrabold text-amber-300 font-serif-luxury">
                {boostState.creditsRemaining} Credits
              </span>
            </div>
            <button
              onClick={handleOpenCashfreeBoostCredits}
              className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 px-3.5 py-2 rounded-xl text-xs font-semibold border border-amber-500/40 transition flex items-center gap-1.5"
            >
              <CreditCard className="w-3.5 h-3.5" />
              + Add 5 Credits (₹1,499 via Cashfree)
            </button>
          </div>
        </div>

        {/* Boost Options Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {/* Spotlight Boost */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-amber-500/40 transition flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Flame className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white font-serif-luxury">
                Executive Spotlight (24-Hours)
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Featured at the peak of curated daily dossiers for all compatible professionals in your metropolitan zone.
              </p>
            </div>

            <div>
              {boostState.active && boostState.boostType === 'spotlight' ? (
                <div className="bg-amber-500/10 border border-amber-500/30 p-2.5 rounded-xl text-center">
                  <span className="text-[11px] font-bold text-amber-300 flex items-center justify-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 animate-spin" />
                    Active ({formatRemainingTime(boostState.expiresAt)})
                  </span>
                </div>
              ) : (
                <button
                  onClick={() => onActivateBoost('spotlight')}
                  disabled={boostState.creditsRemaining <= 0}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition disabled:opacity-40"
                >
                  Activate Spotlight (1 Credit)
                </button>
              )}
            </div>
          </div>

          {/* Direct Meaningful Introduction */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-amber-500/40 transition flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Gift className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white font-serif-luxury">
                Direct Meaningful Introduction
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Send a personalized, handwritten-style letter directly into a candidate's encrypted inbox prior to a mutual match.
              </p>
            </div>

            <button
              onClick={() => onActivateBoost('direct_intro')}
              disabled={boostState.creditsRemaining <= 0}
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold py-2.5 rounded-xl text-xs transition disabled:opacity-40"
            >
              Use Direct Introduction (1 Credit)
            </button>
          </div>

          {/* Confidential Rewind */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-amber-500/40 transition flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white font-serif-luxury">
                Second Look Rewind
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Re-evaluate profiles from past curated digests that you contemplated but did not connect with immediately.
              </p>
            </div>

            <button
              onClick={() => onActivateBoost('rewind')}
              disabled={boostState.creditsRemaining <= 0}
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold py-2.5 rounded-xl text-xs transition disabled:opacity-40"
            >
              Unlock Past Dossiers (1 Credit)
            </button>
          </div>
        </div>
      </div>

      {/* Cashfree PG Modal */}
      <CashfreeCheckoutModal
        isOpen={cashfreeOrder.isOpen}
        onClose={() => setCashfreeOrder((prev) => ({ ...prev, isOpen: false }))}
        orderInfo={{
          planId: cashfreeOrder.planId,
          planName: cashfreeOrder.planName,
          amount: cashfreeOrder.amount,
          billingPeriod: cashfreeOrder.billingPeriod,
          isBoostCredits: cashfreeOrder.isBoostCredits,
          creditsCount: cashfreeOrder.creditsCount,
        }}
        customerPhone={customerPhone}
        customerName={customerName}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};
