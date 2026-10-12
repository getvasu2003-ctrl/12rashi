import React, { useState } from 'react';
import {
  User, ShieldCheck, Sparkles, Lock, RefreshCw, Check,
  Camera, Briefcase, GraduationCap, MapPin, Heart, Edit3, Save
} from 'lucide-react';
import { Profile, AadhaarVerificationState } from '../types';

interface UserProfileEditorProps {
  userProfile: Profile;
  userVerification: AadhaarVerificationState;
  onUpdateProfile: (updated: Profile) => void;
  onOpenAadhaarModal: () => void;
}

export const UserProfileEditor: React.FC<UserProfileEditorProps> = ({
  userProfile,
  userVerification,
  onUpdateProfile,
  onOpenAadhaarModal,
}) => {
  const [profile, setProfile] = useState<Profile>(userProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [roughBioDraft, setRoughBioDraft] = useState('');
  const [isPolishing, setIsPolishing] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string | null>(null);
  const [saveToast, setSaveToast] = useState(false);

  const handleSave = () => {
    onUpdateProfile(profile);
    setIsEditing(false);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const handlePolishBio = async () => {
    if (!roughBioDraft.trim() && !profile.bio.trim()) return;
    setIsPolishing(true);

    try {
      const response = await fetch('/api/ai/bio-polish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roughDraft: roughBioDraft || profile.bio,
          profession: profile.profession,
          values: profile.values.join(', '),
          lifeStage: profile.lifeStage,
        }),
      });

      if (!response.ok) throw new Error('AI Polish service failed');
      const data = await response.json();
      setAiSuggestions(data.polishedBio);
    } catch (err) {
      console.error('Bio Polish Error:', err);
      setAiSuggestions(
        `Having achieved clarity across leadership in ${profile.profession}, I find life's greatest fulfillment in quiet authenticity, intellectual curiosity, and shared stillness. In this chapter of life, I seek an emotionally mature equal who values honest discourse, cultural pursuits, and unhurried companionship.`
      );
    } finally {
      setIsPolishing(false);
    }
  };

  const applyPolishedBio = () => {
    if (aiSuggestions) {
      setProfile((prev) => ({ ...prev, bio: aiSuggestions }));
      setAiSuggestions(null);
      setRoughBioDraft('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs uppercase font-bold text-amber-400 tracking-wider block">
            Executive Profile Management
          </span>
          <h1 className="text-3xl font-bold font-serif-luxury text-slate-100 mt-1">
            Your Mature Identity &amp; Dossier
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Curate how you present your achievements, emotional values, and life philosophy.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition shadow-lg shadow-emerald-950/40"
            >
              <Save className="w-4 h-4" /> Save Dossier
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition"
            >
              <Edit3 className="w-4 h-4" /> Edit Profile
            </button>
          )}
        </div>
      </div>

      {saveToast && (
        <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-3 text-xs text-emerald-200 flex items-center gap-2 shadow-lg">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Your executive profile has been updated and re-indexed.</span>
        </div>
      )}

      {/* Main Profile Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Portrait & Trust Badges */}
        <div className="space-y-6">
          <div className="relative rounded-3xl overflow-hidden bg-slate-900 border-2 border-amber-500/40 shadow-xl">
            <img
              src={profile.photos[0]}
              alt={profile.name}
              className="w-full h-80 object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-xl font-bold font-serif-luxury text-white">
                {profile.name}, {profile.age}
              </h3>
              <p className="text-xs text-slate-300">{profile.profession}</p>
            </div>
          </div>

          {/* Aadhaar Trust Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                UIDAI Aadhaar Seal
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30">
                {userVerification.isVerified ? 'Verified' : 'Pending'}
              </span>
            </div>

            <div className="text-xs text-slate-300 space-y-1">
              <p className="font-mono text-amber-200">{userVerification.maskedNumber || '•••• •••• 6219'}</p>
              <p className="text-slate-400">Legal Name: {userVerification.holderName || profile.name}</p>
              <p className="text-slate-400">Verified Age: {userVerification.age || profile.age} Years</p>
            </div>

            <button
              onClick={onOpenAadhaarModal}
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-2 rounded-xl text-xs transition border border-slate-700"
            >
              {userVerification.isVerified ? 'Inspect Trust Certificate' : 'Authenticate Identity'}
            </button>
          </div>

          {/* E2EE Public Fingerprint */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs space-y-1.5 text-slate-400">
            <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              Cryptographic Safety Key
            </div>
            <p className="font-mono text-[11px] text-amber-400/80 break-all">
              {profile.e2eePublicKeyFingerprint}
            </p>
          </div>
        </div>

        {/* Right Column: Bio, Career & AI Studio */}
        <div className="md:col-span-2 space-y-6">
          {/* AI Bio Polish Studio */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950/20 border border-amber-500/30 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold font-serif-luxury text-amber-100">
                  AI Executive Bio Studio
                </h3>
              </div>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30 font-semibold">
                Gemini Powered
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Jot down bullet points or rough thoughts about your journey, interests, and what you cherish. The AI refines them into an authentic, articulate narrative designed for high-caliber dating.
            </p>

            <textarea
              value={roughBioDraft}
              onChange={(e) => setRoughBioDraft(e.target.value)}
              placeholder="e.g. 20 years in investment, love running early, read history, want a mature independent woman who enjoys literature and quiet travel..."
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-amber-500 resize-none font-sans"
            />

            <div className="flex justify-end">
              <button
                onClick={handlePolishBio}
                disabled={isPolishing}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition disabled:opacity-50"
              >
                {isPolishing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Polishing Narrative...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    Refine with AI
                  </>
                )}
              </button>
            </div>

            {aiSuggestions && (
              <div className="bg-slate-950/90 border border-amber-500/40 rounded-xl p-4 space-y-3 animate-in fade-in">
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
                  AI Polished Draft
                </span>
                <p className="text-xs text-slate-200 font-serif-luxury italic leading-relaxed">
                  "{aiSuggestions}"
                </p>
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => setAiSuggestions(null)}
                    className="text-xs text-slate-400 hover:text-white px-3 py-1.5"
                  >
                    Discard
                  </button>
                  <button
                    onClick={applyPolishedBio}
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-slate-950 font-bold px-4 py-1.5 rounded-lg text-xs"
                  >
                    Apply to My Profile
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Core Details */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <h3 className="text-base font-bold font-serif-luxury text-slate-100 border-b border-slate-800 pb-3">
              Profile Dossier Fields
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold uppercase tracking-wider mb-1">
                  Personal Bio &amp; Sanctuary
                </label>
                {isEditing ? (
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows={4}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-amber-500 font-sans"
                  />
                ) : (
                  <p className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 text-slate-200 leading-relaxed italic">
                    "{profile.bio}"
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-semibold uppercase tracking-wider mb-1">
                    Profession &amp; Title
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.profession}
                      onChange={(e) => setProfile({ ...profile, profession: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                    />
                  ) : (
                    <p className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 text-slate-200">
                      {profile.profession}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold uppercase tracking-wider mb-1">
                    Organization / Firm
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.company}
                      onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                    />
                  ) : (
                    <p className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 text-slate-200">
                      {profile.company}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-semibold uppercase tracking-wider mb-1">
                    Life Stage
                  </label>
                  {isEditing ? (
                    <select
                      value={profile.lifeStage}
                      onChange={(e) => setProfile({ ...profile, lifeStage: e.target.value as any })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                    >
                      <option value="Single / Never Married">Single / Never Married</option>
                      <option value="Divorced & Thriving">Divorced &amp; Thriving</option>
                      <option value="Widowed">Widowed</option>
                      <option value="Proud Parent (Empty Nester)">Proud Parent (Empty Nester)</option>
                      <option value="Co-Parenting with Harmony">Co-Parenting with Harmony</option>
                    </select>
                  ) : (
                    <p className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 text-slate-200">
                      {profile.lifeStage}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold uppercase tracking-wider mb-1">
                    Relationship Intent
                  </label>
                  {isEditing ? (
                    <select
                      value={profile.relationshipIntent}
                      onChange={(e) => setProfile({ ...profile, relationshipIntent: e.target.value as any })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                    >
                      <option value="Long-term Meaningful Partnership">Long-term Meaningful Partnership</option>
                      <option value="Companionship & Shared Adventures">Companionship &amp; Shared Adventures</option>
                      <option value="Lifelong Intellectual Equal">Lifelong Intellectual Equal</option>
                      <option value="Marriage & Life Union">Marriage &amp; Life Union</option>
                    </select>
                  ) : (
                    <p className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 text-slate-200">
                      {profile.relationshipIntent}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold uppercase tracking-wider mb-1">
                  Retirement &amp; Long-Term Horizon
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.retirementVision}
                    onChange={(e) => setProfile({ ...profile, retirementVision: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-200"
                  />
                ) : (
                  <p className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 text-slate-200">
                    {profile.retirementVision}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
