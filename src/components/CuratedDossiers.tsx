import React, { useState } from 'react';
import {
  ShieldCheck, Sparkles, Lock, Video, MessageSquare, Heart, Bookmark,
  Filter, Search, MapPin, Briefcase, GraduationCap, Compass, Send, CheckCircle2, ChevronRight, Eye
} from 'lucide-react';
import { Profile } from '../types';

interface CuratedDossiersProps {
  profiles: Profile[];
  userProfile: Profile;
  userVerified: boolean;
  onOpenAadhaarModal: () => void;
  onOpenAICompatibility: (profile: Profile) => void;
  onStartVideoDate: (profile: Profile) => void;
  onStartChat: (profile: Profile) => void;
  onUseDirectIntro: (profile: Profile) => void;
  discreetPhotoBlur: boolean;
  isBoostActive: boolean;
}

export const CuratedDossiers: React.FC<CuratedDossiersProps> = ({
  profiles,
  userProfile,
  userVerified,
  onOpenAadhaarModal,
  onOpenAICompatibility,
  onStartVideoDate,
  onStartChat,
  onUseDirectIntro,
  discreetPhotoBlur,
  isBoostActive,
}) => {
  const [selectedLifeStage, setSelectedLifeStage] = useState<string>('all');
  const [selectedAgeBracket, setSelectedAgeBracket] = useState<string>('all');
  const [aadhaarOnly, setAadhaarOnly] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProfileDetail, setSelectedProfileDetail] = useState<Profile | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredProfiles = profiles.filter((p) => {
    if (aadhaarOnly && !p.aadhaarVerified) return false;
    if (selectedLifeStage !== 'all' && !p.lifeStage.toLowerCase().includes(selectedLifeStage.toLowerCase())) {
      return false;
    }
    if (selectedAgeBracket === '40-45' && (p.age < 40 || p.age > 45)) return false;
    if (selectedAgeBracket === '46-50' && (p.age < 46 || p.age > 50)) return false;
    if (selectedAgeBracket === '51+' && p.age < 51) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchText = `${p.name} ${p.profession} ${p.bio} ${p.interests.join(' ')} ${p.values.join(' ')} ${p.location}`.toLowerCase();
      if (!matchText.includes(q)) return false;
    }

    return true;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* Header Title Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Curated For Mature Leaders (Age 40+)
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-serif-luxury text-slate-100">
            Today's Hand-Curated Dossiers
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Thoughtfully matched on life stage, emotional intelligence, shared values, and long-term vision—not superficial metrics.
          </p>
        </div>

        {/* Executive Boost Banner if active */}
        {isBoostActive && (
          <div className="bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent border border-amber-500/40 px-4 py-2.5 rounded-2xl flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-amber-400 animate-ping"></span>
            <div>
              <span className="text-xs font-bold text-amber-200 uppercase tracking-wider block">Executive Spotlight Active</span>
              <span className="text-[11px] text-amber-300/80">Your profile is receiving priority visibility across top matches</span>
            </div>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by interests, career, values..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Life Stage Filter */}
          <div>
            <select
              value={selectedLifeStage}
              onChange={(e) => setSelectedLifeStage(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="all">All Life Stages</option>
              <option value="single">Single / Never Married</option>
              <option value="divorced">Divorced &amp; Thriving</option>
              <option value="widowed">Widowed</option>
              <option value="empty nester">Empty Nester / Adult Children</option>
              <option value="co-parenting">Co-Parenting with Harmony</option>
            </select>
          </div>

          {/* Age Bracket */}
          <div>
            <select
              value={selectedAgeBracket}
              onChange={(e) => setSelectedAgeBracket(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="all">All Ages (40+)</option>
              <option value="40-45">Age 40 - 45</option>
              <option value="46-50">Age 46 - 50</option>
              <option value="51+">Age 51 - 65+</option>
            </select>
          </div>

          {/* Aadhaar Verified Filter toggle */}
          <div className="flex items-center justify-between px-3 py-2 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Aadhaar Verified Only
            </span>
            <input
              type="checkbox"
              checked={aadhaarOnly}
              onChange={(e) => setAadhaarOnly(e.target.checked)}
              className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 bg-slate-900 border-slate-700"
            />
          </div>
        </div>
      </div>

      {/* Profiles Grid */}
      {filteredProfiles.length === 0 ? (
        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-12 text-center space-y-3">
          <Filter className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-200 font-serif-luxury">
            No dossiers match current filters
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Try broadening your life stage or age preferences to view other distinguished professionals.
          </p>
          <button
            onClick={() => {
              setSelectedLifeStage('all');
              setSelectedAgeBracket('all');
              setSearchQuery('');
              setAadhaarOnly(false);
            }}
            className="text-xs text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProfiles.map((profile) => {
            const isBookmarked = bookmarkedIds.has(profile.id);

            return (
              <div
                key={profile.id}
                onClick={() => setSelectedProfileDetail(profile)}
                className="group relative bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-amber-950/20 transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* Photo Header */}
                <div className="relative h-72 w-full overflow-hidden bg-slate-950">
                  <img
                    src={profile.photos[0]}
                    alt={profile.name}
                    className={`w-full h-full object-cover object-top transition duration-500 group-hover:scale-105 ${
                      discreetPhotoBlur ? 'blur-md hover:blur-none transition' : ''
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {profile.aadhaarVerified && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-emerald-500/50 text-emerald-400 text-xs font-semibold shadow-md">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          Aadhaar Verified ({profile.aadhaarMasked})
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => toggleBookmark(profile.id, e)}
                      className={`p-2 rounded-full backdrop-blur-md transition ${
                        isBookmarked
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-900/70 text-slate-300 hover:text-amber-400'
                      }`}
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  {/* Bottom Portrait Info */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="text-2xl font-bold font-serif-luxury text-white">
                        {profile.name}, {profile.age}
                      </h3>
                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/30">
                          {profile.compatibilityScore}% Synergy
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-amber-100 font-medium flex items-center gap-1.5 mt-0.5">
                      <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                      {profile.profession} • {profile.company}
                    </p>
                    <p className="text-[11px] text-slate-300 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {profile.location} ({profile.distanceKm} km away)
                    </p>
                  </div>
                </div>

                {/* Dossier Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  {/* Life Stage & Rashi Resonance Pill */}
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700/80 font-medium">
                      {profile.lifeStage}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-amber-950/40 text-amber-300 border border-amber-500/30 font-medium">
                      {profile.relationshipIntent}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-800/60 text-slate-400 border border-slate-700/50 font-mono text-[11px]">
                      {profile.rashi} • {profile.rashiElement}
                    </span>
                  </div>

                  {/* Bio Excerpt */}
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 italic">
                    "{profile.bio}"
                  </p>

                  {/* Values & Interests Chips */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                      Core Values & Passions
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {profile.values.slice(0, 3).map((val, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] bg-slate-950 text-slate-300 px-2 py-0.5 rounded border border-slate-800"
                        >
                          {val}
                        </span>
                      ))}
                      {profile.interests.slice(0, 2).map((inte, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] bg-slate-950 text-amber-300/80 px-2 py-0.5 rounded border border-slate-800"
                        >
                          {inte}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons Bar */}
                  <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenAICompatibility(profile);
                      }}
                      className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      AI Synergy
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onStartChat(profile);
                      }}
                      className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition shadow-lg shadow-amber-900/30"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      Encrypted Chat
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Profile Detail Modal */}
      {selectedProfileDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden text-slate-100 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* Top Close */}
            <button
              onClick={() => setSelectedProfileDetail(null)}
              className="absolute top-4 right-4 z-20 bg-slate-900/80 text-slate-300 hover:text-white p-2 rounded-full border border-slate-700"
            >
              ✕
            </button>

            <div className="overflow-y-auto p-6 md:p-8 space-y-6">
              {/* Profile Card Header */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <img
                  src={selectedProfileDetail.photos[0]}
                  alt={selectedProfileDetail.name}
                  className="w-full md:w-56 h-64 rounded-2xl object-cover border-2 border-amber-500/40 shadow-xl"
                />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold font-serif-luxury text-white">
                      {selectedProfileDetail.name}, {selectedProfileDetail.age}
                    </h2>
                    {selectedProfileDetail.aadhaarVerified && (
                      <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5" /> Aadhaar Verified
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-amber-200 font-medium">
                    {selectedProfileDetail.profession} • {selectedProfileDetail.company}
                  </p>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5" /> {selectedProfileDetail.education}
                  </p>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {selectedProfileDetail.location}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2 text-xs">
                    <span className="bg-slate-800 text-slate-200 px-3 py-1 rounded-lg border border-slate-700">
                      Life Stage: {selectedProfileDetail.lifeStage}
                    </span>
                    <span className="bg-amber-950/40 text-amber-300 px-3 py-1 rounded-lg border border-amber-500/30">
                      Intent: {selectedProfileDetail.relationshipIntent}
                    </span>
                    <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-lg border border-slate-700 font-mono text-[11px]">
                      Rashi: {selectedProfileDetail.rashi}
                    </span>
                  </div>
                </div>
              </div>

              {/* In-Depth Personal Narrative */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Personal Sanctuary & Life Reflection
                </h4>
                <p className="text-sm text-slate-200 leading-relaxed font-sans">
                  {selectedProfileDetail.bio}
                </p>
              </div>

              {/* Lifestyle Pacing and Retirement Vision */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-4 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Lifestyle Pacing & Rhythms
                  </span>
                  <p className="text-xs text-slate-200 font-medium">
                    {selectedProfileDetail.lifestylePacing}
                  </p>
                </div>
                <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-4 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Long-Term &amp; Retirement Vision
                  </span>
                  <p className="text-xs text-slate-200 font-medium">
                    {selectedProfileDetail.retirementVision}
                  </p>
                </div>
              </div>

              {/* Compatibility Highlights */}
              <div className="bg-slate-800/30 border border-slate-700/60 rounded-xl p-4 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Why You Two Resonate
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {selectedProfileDetail.matchReasons.map((reason, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cryptographic E2EE details */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  End-to-End Encrypted Channel Verified
                </span>
                <span className="font-mono text-[11px] text-amber-400/80">
                  Key: {selectedProfileDetail.e2eePublicKeyFingerprint}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-800">
                <button
                  onClick={() => {
                    const prof = selectedProfileDetail;
                    setSelectedProfileDetail(null);
                    onOpenAICompatibility(prof);
                  }}
                  className="flex-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  AI Deep Compatibility Dossier
                </button>

                <button
                  onClick={() => {
                    const prof = selectedProfileDetail;
                    setSelectedProfileDetail(null);
                    onStartChat(prof);
                  }}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-amber-900/30"
                >
                  <MessageSquare className="w-4 h-4" />
                  Connect &amp; Message
                </button>

                <button
                  onClick={() => {
                    const prof = selectedProfileDetail;
                    setSelectedProfileDetail(null);
                    if (!userVerified) {
                      onOpenAadhaarModal();
                    } else {
                      onStartVideoDate(prof);
                    }
                  }}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition"
                >
                  <Video className="w-4 h-4" />
                  Request Video Date
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
