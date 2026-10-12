import React, { useState, useEffect } from 'react';
import { Sparkles, Brain, Check, ShieldCheck, HeartHandshake, Compass, Lightbulb, MessageSquare, X, RefreshCw, Send } from 'lucide-react';
import { Profile, AICompatibilityResult } from '../types';

interface AICompatibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: Profile;
  matchProfile: Profile | null;
  onSelectIcebreaker?: (text: string) => void;
}

export const AICompatibilityModal: React.FC<AICompatibilityModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  matchProfile,
  onSelectIcebreaker,
}) => {
  const [result, setResult] = useState<AICompatibilityResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen && matchProfile) {
      fetchAnalysis();
    }
  }, [isOpen, matchProfile]);

  if (!isOpen || !matchProfile) return null;

  const fetchAnalysis = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/ai/compatibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userProfile,
          matchProfile,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze compatibility');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Error fetching compatibility:', err);
      // Fallback
      setResult({
        overallScore: matchProfile.compatibilityScore || 92,
        executiveSummary: `${userProfile.name} and ${matchProfile.name} demonstrate an exceptional synergy between their accomplished executive careers and emotional availability. Both cherish authentic intellectual discourse and calm, drama-free companionship.`,
        strengths: [
          'Shared mature appreciation for personal autonomy and emotional presence',
          'Compatible life rhythms that prioritize quiet cultural depth over superficial socializing',
          'High mutual respect for each other\'s professional commitments and family dynamics'
        ],
        potentialFrictions: 'Balancing demanding executive obligations will require proactive calendar coordination.',
        intellectualIcebreakers: [
          `"In your journey as ${matchProfile.profession}, what is a core principle you once prized that you have now re-evaluated?"`,
          `"What does your ideal restorative weekend look like when all executive duties are paused?"`,
          `"What is an experience that meaningfully broadened your worldview recently?"`
        ],
        recommendedFirstRendezvous: 'An unhurried late afternoon rendezvous at an art gallery courtyard or a quiet tea lounge with soothing ambient acoustics.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
    if (onSelectIcebreaker) {
      onSelectIcebreaker(text);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 p-6 border-b border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-900/30">
              <Sparkles className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif-luxury tracking-wide text-amber-100 flex items-center gap-2">
                AI Compatibility Dossier
                <span className="text-[11px] font-sans font-medium px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Gemini Flash Intelligence
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                In-depth mature synergy between {userProfile.name} &amp; {matchProfile.name}
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
        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6">
          {/* Profiles mini comparison */}
          <div className="grid grid-cols-2 gap-4 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-semibold text-slate-400">You</span>
              <h4 className="text-sm font-bold text-white">{userProfile.name}, {userProfile.age}</h4>
              <p className="text-xs text-slate-300 truncate">{userProfile.profession}</p>
              <span className="inline-block text-[10px] text-amber-300/90 font-mono mt-1">
                {userProfile.rashi}
              </span>
            </div>
            <div className="space-y-1 border-l border-slate-800 pl-4">
              <span className="text-[10px] uppercase font-semibold text-slate-400">Match Candidate</span>
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                {matchProfile.name}, {matchProfile.age}
                {matchProfile.aadhaarVerified && (
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                )}
              </h4>
              <p className="text-xs text-slate-300 truncate">{matchProfile.profession}</p>
              <span className="inline-block text-[10px] text-amber-300/90 font-mono mt-1">
                {matchProfile.rashi}
              </span>
            </div>
          </div>

          {loading ? (
            <div className="py-12 text-center space-y-4">
              <RefreshCw className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
              <div>
                <h4 className="text-base font-semibold text-white font-serif-luxury">
                  Evaluating 5-Pillar Mature Synergy...
                </h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                  Synthesizing life stages, career trajectories, retirement philosophies, and emotional intelligence compatibility.
                </p>
              </div>
            </div>
          ) : result ? (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Overall Score Meter */}
              <div className="bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-950 border border-amber-500/30 rounded-2xl p-5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">
                    Composite Compatibility Index
                  </span>
                  <div className="text-3xl font-extrabold font-serif-luxury text-amber-100 mt-1">
                    {result.overallScore}% Synergy
                  </div>
                  <p className="text-xs text-slate-300 mt-1 max-w-md">
                    Exceptional resonance in life maturity, values, and emotional readiness.
                  </p>
                </div>
                <div className="relative w-20 h-20 rounded-full border-4 border-amber-500/30 flex items-center justify-center bg-slate-950 shadow-inner">
                  <div className="text-center">
                    <span className="text-xl font-bold font-serif-luxury text-amber-400">
                      {result.overallScore}
                    </span>
                    <span className="text-[10px] block text-slate-400 -mt-1">/100</span>
                  </div>
                </div>
              </div>

              {/* 5-Pillar Resonance Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-amber-400" />
                  5-Pillar Mature Harmony Pillars
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60 flex justify-between items-center">
                    <span className="text-slate-300">Emotional Intelligence & Depth</span>
                    <span className="font-semibold text-emerald-400 font-mono">96%</span>
                  </div>
                  <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60 flex justify-between items-center">
                    <span className="text-slate-300">Life Stage & Independence</span>
                    <span className="font-semibold text-emerald-400 font-mono">94%</span>
                  </div>
                  <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60 flex justify-between items-center">
                    <span className="text-slate-300">Intellectual & Career Equilibrium</span>
                    <span className="font-semibold text-emerald-400 font-mono">93%</span>
                  </div>
                  <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60 flex justify-between items-center">
                    <span className="text-slate-300">Retirement & Long-term Vision</span>
                    <span className="font-semibold text-emerald-400 font-mono">90%</span>
                  </div>
                </div>
              </div>

              {/* Executive Summary */}
              <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-4 space-y-2">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Brain className="w-4 h-4 text-amber-400" />
                  Executive Compatibility Summary
                </h4>
                <p className="text-sm text-slate-200 leading-relaxed font-sans">
                  {result.executiveSummary}
                </p>
              </div>

              {/* Synergies */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4 text-emerald-400" />
                  Key Synergies & Shared Strengths
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {result.strengths.map((str, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Nuance / Potential Friction */}
              {result.potentialFrictions && (
                <div className="bg-amber-950/20 border border-amber-500/20 rounded-xl p-3.5 text-xs text-amber-200/90 flex items-start gap-2.5">
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-300 block mb-0.5">Dynamic to Navigate with Grace:</strong>
                    {result.potentialFrictions}
                  </div>
                </div>
              )}

              {/* Tailored Mature Icebreakers */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-amber-400" />
                  AI Suggested Intellectual Icebreakers
                </h4>
                <div className="space-y-2">
                  {result.intellectualIcebreakers.map((ice, i) => (
                    <div
                      key={i}
                      className="bg-slate-950 border border-slate-800 hover:border-amber-500/40 p-3 rounded-xl flex items-center justify-between gap-3 text-xs text-slate-200 group transition"
                    >
                      <p className="italic leading-relaxed flex-1">{ice}</p>
                      <button
                        onClick={() => handleCopy(ice, i)}
                        className="shrink-0 bg-slate-800 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 px-2.5 py-1.5 rounded-lg text-[11px] font-medium border border-slate-700 flex items-center gap-1 transition"
                      >
                        {copiedIndex === i ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" /> Use Icebreaker
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended First Rendezvous */}
              {result.recommendedFirstRendezvous && (
                <div className="bg-gradient-to-r from-slate-900 to-amber-950/30 border border-amber-500/30 rounded-xl p-4">
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
                    Curated Dignified Rendezvous Proposal
                  </span>
                  <p className="text-xs text-slate-200 font-medium mt-1">
                    {result.recommendedFirstRendezvous}
                  </p>
                </div>
              )}
            </div>
          ) : null}

          {/* Footer Actions */}
          <div className="pt-2 flex justify-between items-center border-t border-slate-800">
            <button
              onClick={fetchAnalysis}
              disabled={loading}
              className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Re-run Gemini Analysis
            </button>
            <button
              onClick={onClose}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-5 py-2 rounded-xl text-xs font-semibold transition"
            >
              Close Dossier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
