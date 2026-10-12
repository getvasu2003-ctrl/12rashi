import React, { useState, useRef, useEffect } from 'react';
import {
  Send, Lock, ShieldCheck, Video, Calendar, Sparkles,
  Info, Check, CheckCheck, RefreshCw, Coffee, ChevronRight, X, PhoneCall
} from 'lucide-react';
import { Profile, Message, Conversation } from '../types';
import { MATURE_ICEBREAKERS } from '../data/mockProfiles';

interface EncryptedChatProps {
  currentProfileId: string;
  profiles: Profile[];
  conversations: Record<string, Message[]>;
  onSendMessage: (receiverId: string, text: string, type?: Message['type'], rendezvous?: any) => void;
  onStartVideoDate: (profile: Profile) => void;
  onOpenAICompatibility: (profile: Profile) => void;
  onOpenAadhaarModal: () => void;
  userVerified: boolean;
}

export const EncryptedChat: React.FC<EncryptedChatProps> = ({
  currentProfileId,
  profiles,
  conversations,
  onSendMessage,
  onStartVideoDate,
  onOpenAICompatibility,
  onOpenAadhaarModal,
  userVerified,
}) => {
  const [selectedMatchId, setSelectedMatchId] = useState<string>(
    profiles.find((p) => conversations[p.id]?.length > 0)?.id || profiles[0].id
  );
  const [inputText, setInputText] = useState('');
  const [showRendezvousModal, setShowRendezvousModal] = useState(false);
  const [showIcebreakersDrawer, setShowIcebreakersDrawer] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Rendezvous proposal form state
  const [rendezvousTitle, setRendezvousTitle] = useState('Curated Gallery Walk & Courtyard Espresso');
  const [rendezvousVenue, setRendezvousVenue] = useState('National Gallery of Modern Art, Colaba');
  const [rendezvousDate, setRendezvousDate] = useState('Saturday afternoon, 4:30 PM');

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const selectedProfile = profiles.find((p) => p.id === selectedMatchId) || profiles[0];
  const currentMessages = conversations[selectedMatchId] || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages, selectedMatchId, isTyping]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const textToSend = inputText.trim();
    setInputText('');
    onSendMessage(selectedMatchId, textToSend, 'text');

    // Simulate mature partner reply
    simulatePartnerReply(selectedProfile, textToSend);
  };

  const simulatePartnerReply = (profile: Profile, userText: string) => {
    setTimeout(() => {
      setIsTyping(true);
    }, 1000);

    setTimeout(() => {
      setIsTyping(false);
      let reply = `That is such a thoughtful observation. As life moves forward, discovering someone with genuine depth who values clear communication is rare. I completely agree with your thoughts on this.`;
      
      if (profile.id === 'profile-1') {
        reply = `I appreciate your perspective on that. Between long surgeries, having someone grounded to converse with brings so much calm. Are you free to talk over a brief video coffee or meet for that gallery walk this weekend?`;
      } else if (profile.id === 'profile-3') {
        reply = `That brings a smile to my face! That's the wonderful thing about having arrived at this age—there's no need for pretense. What other pursuits give you that feeling of creative flow?`;
      }

      onSendMessage(selectedProfile.id, reply, 'text');
    }, 3200);
  };

  const handleSendRendezvous = () => {
    onSendMessage(
      selectedMatchId,
      `I would love to propose a cultured rendezvous: ${rendezvousTitle} at ${rendezvousVenue} on ${rendezvousDate}.`,
      'rendezvous_proposal',
      {
        title: rendezvousTitle,
        venueType: rendezvousVenue,
        date: rendezvousDate,
        status: 'proposed'
      }
    );
    setShowRendezvousModal(false);
  };

  const handleSelectIcebreaker = (icebreaker: string) => {
    setInputText(icebreaker);
    setShowIcebreakersDrawer(false);
  };

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-140px)] min-h-[580px] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
      {/* Left Sidebar: Conversations List */}
      <div className="w-full md:w-80 border-r border-slate-800 flex flex-col bg-slate-950/60 shrink-0">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-bold font-serif-luxury text-base text-white">
              Encrypted Connections
            </h3>
            <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
              <Lock className="w-3 h-3 text-emerald-400" /> AES-256 E2EE Enabled
            </p>
          </div>
        </div>

        {/* Matches Roster */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60">
          {profiles.map((prof) => {
            const msgs = conversations[prof.id] || [];
            const lastMsg = msgs[msgs.length - 1];
            const isSelected = prof.id === selectedMatchId;

            return (
              <button
                key={prof.id}
                onClick={() => setSelectedMatchId(prof.id)}
                className={`w-full p-4 flex items-start space-x-3 text-left transition ${
                  isSelected
                    ? 'bg-amber-500/10 border-l-4 border-amber-500'
                    : 'hover:bg-slate-900/60'
                }`}
              >
                <div className="relative shrink-0">
                  <img
                    src={prof.photos[0]}
                    alt={prof.name}
                    className="w-12 h-12 rounded-full object-cover border border-slate-700"
                  />
                  {prof.aadhaarVerified && (
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-950 flex items-center justify-center">
                      <ShieldCheck className="w-2.5 h-2.5 text-slate-950" />
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h4 className="text-xs font-bold text-slate-200 truncate font-serif-luxury">
                      {prof.name}, {prof.age}
                    </h4>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {lastMsg ? 'Active' : `${prof.compatibilityScore}%`}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">{prof.profession}</p>
                  <p className="text-[11px] text-slate-400/80 truncate mt-1 italic">
                    {lastMsg ? lastMsg.text : 'Start an intellectual exchange...'}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Area: Conversation Panel */}
      <div className="flex-1 flex flex-col bg-slate-900/40">
        {/* Chat Header */}
        <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={selectedProfile.photos[0]}
              alt={selectedProfile.name}
              className="w-11 h-11 rounded-full object-cover border border-amber-500/40"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-sm font-serif-luxury">
                  {selectedProfile.name}, {selectedProfile.age}
                </h3>
                {selectedProfile.aadhaarVerified && (
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1 font-semibold">
                    <ShieldCheck className="w-3 h-3" /> Aadhaar Verified
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 truncate max-w-sm">
                {selectedProfile.profession} • {selectedProfile.location}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onOpenAICompatibility(selectedProfile)}
              className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-medium flex items-center gap-1.5 transition"
              title="Inspect 5-Pillar Compatibility"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">AI Compatibility</span>
            </button>

            <button
              onClick={() => setShowRendezvousModal(true)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs transition"
              title="Propose a Dignified Rendezvous"
            >
              <Coffee className="w-4 h-4 text-amber-400" />
            </button>

            <button
              onClick={() => {
                if (!userVerified) {
                  onOpenAadhaarModal();
                } else {
                  onStartVideoDate(selectedProfile);
                }
              }}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-950/50 transition"
              title="Initiate E2EE Video Date"
            >
              <Video className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">HD Video Date</span>
            </button>
          </div>
        </div>

        {/* E2EE Safety Banner */}
        <div className="bg-slate-950/60 border-b border-slate-800/80 px-4 py-2 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              End-to-End Encrypted channel with <strong className="text-slate-200">{selectedProfile.name}</strong>
            </span>
          </div>
          <span className="font-mono text-[10px] text-amber-400/80 hidden sm:inline">
            Fingerprint: {selectedProfile.e2eePublicKeyFingerprint.slice(0, 19)}...
          </span>
        </div>

        {/* Message Thread Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {currentMessages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Sparkles className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-white font-serif-luxury">
                A Fresh Intellectual Connection
              </h4>
              <p className="text-xs text-slate-400 max-w-md leading-relaxed">
                You and {selectedProfile.name} share {selectedProfile.compatibilityScore}% mature compatibility. Begin with a thoughtful reflection rather than a generic hello.
              </p>
              <button
                onClick={() => setShowIcebreakersDrawer(true)}
                className="mt-2 text-xs bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 px-4 py-2 rounded-xl border border-amber-500/40 font-semibold flex items-center gap-1.5 transition"
              >
                <Sparkles className="w-3.5 h-3.5" /> View Curated 40+ Icebreakers
              </button>
            </div>
          ) : (
            currentMessages.map((msg) => {
              const isMine = msg.senderId === 'current-user';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] md:max-w-[70%] rounded-2xl p-4 shadow-md ${
                      isMine
                        ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-slate-950 font-medium rounded-br-none'
                        : 'bg-slate-800/90 border border-slate-700 text-slate-100 rounded-bl-none'
                    }`}
                  >
                    {/* Rendezvous Proposal Card */}
                    {msg.type === 'rendezvous_proposal' && msg.rendezvousDetails ? (
                      <div className="space-y-3 mb-1">
                        <div className="flex items-center gap-2 pb-2 border-b border-black/10">
                          <Coffee className="w-4 h-4 text-amber-950" />
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-950">
                            Cultured Rendezvous Invitation
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-950 font-serif-luxury">
                          {msg.rendezvousDetails.title}
                        </h4>
                        <div className="text-xs text-slate-900/90 space-y-1">
                          <p>📍 {msg.rendezvousDetails.venueType}</p>
                          <p>🗓️ {msg.rendezvousDetails.date}</p>
                        </div>
                        <div className="pt-2 flex gap-2">
                          <button className="bg-slate-950 text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg">
                            Accept &amp; Add to Calendar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs sm:text-sm leading-relaxed">{msg.text}</p>
                    )}

                    <div
                      className={`flex items-center justify-end gap-1.5 mt-2 text-[10px] ${
                        isMine ? 'text-slate-900/80' : 'text-slate-400'
                      }`}
                    >
                      <Lock className="w-2.5 h-2.5" />
                      <span>{msg.timestamp}</span>
                      {isMine && <CheckCheck className="w-3 h-3" />}
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {isTyping && (
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]"></span>
              <span className="text-[11px] italic">{selectedProfile.name} is composing a reply...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Composer */}
        <div className="p-4 bg-slate-950/90 border-t border-slate-800 space-y-2">
          {/* Quick Icebreaker helpers */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <button
              onClick={() => setShowIcebreakersDrawer(!showIcebreakersDrawer)}
              className="text-amber-400 hover:text-amber-300 text-[11px] flex items-center gap-1 font-medium"
            >
              <Sparkles className="w-3.5 h-3.5" /> Curated 40+ Icebreaker Prompts
            </button>
            <span className="text-[10px] font-mono text-slate-500">
              Curve25519 Encrypted
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={`Write an encrypted message to ${selectedProfile.name}...`}
              className="flex-1 bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none transition"
            />
            <button
              onClick={handleSend}
              disabled={!inputText.trim()}
              className="bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 p-3 rounded-xl transition flex items-center justify-center font-bold"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Rendezvous Proposal Modal */}
      {showRendezvousModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="text-base font-bold text-white font-serif-luxury flex items-center gap-2">
                <Coffee className="w-5 h-5 text-amber-400" />
                Propose a Cultured Rendezvous
              </h4>
              <button
                onClick={() => setShowRendezvousModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-300">
              Invite {selectedProfile.name} to a relaxed, mature setting designed for genuine conversation.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Theme / Experience</label>
                <select
                  value={rendezvousTitle}
                  onChange={(e) => setRendezvousTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200"
                >
                  <option value="Curated Gallery Walk & Courtyard Espresso">Curated Gallery Walk & Courtyard Espresso</option>
                  <option value="Quiet Architectural Bistro Dinner">Quiet Architectural Bistro Dinner</option>
                  <option value="Chamber Symphony or Classical Concert">Chamber Symphony or Classical Concert</option>
                  <option value="Heritage Garden Morning Walk & Artisanal Tea">Heritage Garden Morning Walk & Artisanal Tea</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Venue / Neighborhood</label>
                <input
                  type="text"
                  value={rendezvousVenue}
                  onChange={(e) => setRendezvousVenue(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Suggested Timing</label>
                <input
                  type="text"
                  value={rendezvousDate}
                  onChange={(e) => setRendezvousDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200"
                />
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => setShowRendezvousModal(false)}
                className="w-1/2 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2.5 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSendRendezvous}
                className="w-1/2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold py-2.5 rounded-xl text-xs"
              >
                Send Proposal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Icebreakers Drawer Modal */}
      {showIcebreakersDrawer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="text-base font-bold text-white font-serif-luxury flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Select an Intellectual Icebreaker
              </h4>
              <button
                onClick={() => setShowIcebreakersDrawer(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-300">
              Prompts curated specifically to spark vulnerable, articulate discourse between mature professionals.
            </p>

            <div className="space-y-2 max-h-72 overflow-y-auto">
              {MATURE_ICEBREAKERS.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectIcebreaker(prompt)}
                  className="w-full text-left p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 hover:bg-slate-900 text-xs text-slate-200 transition italic flex items-center justify-between group"
                >
                  <span className="flex-1 pr-2">"{prompt}"</span>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
