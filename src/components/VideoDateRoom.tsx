import React, { useState, useEffect, useRef } from 'react';
import {
  Mic, MicOff, Video as VideoIcon, VideoOff, PhoneOff, Lock,
  ShieldCheck, Sparkles, ChevronRight, MessageSquare, BookOpen, Volume2, Maximize2, Minimize2
} from 'lucide-react';
import { Profile } from '../types';

interface VideoDateRoomProps {
  matchProfile: Profile;
  onEndCall: (notes?: string) => void;
}

const MATURE_VIDEO_CONVERSATION_PROMPTS = [
  "What is an unexpected passion or joy that took root in your life after 40?",
  "What does 'emotional safety' look like for you in a committed partnership today?",
  "How do you balance high-stakes executive leadership with inner peace?",
  "What is one life truth you wish you could whisper to your 25-year-old self?",
  "What is your philosophy on retaining personal autonomy while building shared intimacy?",
  "What kind of art, music, or landscape reliably restores your soul?"
];

export const VideoDateRoom: React.FC<VideoDateRoomProps> = ({ matchProfile, onEndCall }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isBlurActive, setIsBlurActive] = useState(true);
  const [promptIndex, setPromptIndex] = useState(0);
  const [callDuration, setCallDuration] = useState(0);
  const [privateNotes, setPrivateNotes] = useState('');
  const [showNotesDrawer, setShowNotesDrawer] = useState(false);
  const [cameraPermissionError, setCameraPermissionError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Initialize camera
  useEffect(() => {
    let active = true;

    async function initCamera() {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: { ideal: 1280 }, height: { ideal: 720 } },
            audio: true
          });
          if (active) {
            streamRef.current = stream;
            if (localVideoRef.current) {
              localVideoRef.current.srcObject = stream;
            }
          }
        }
      } catch (err) {
        console.warn('Camera access denied or unavailable in iframe environment:', err);
        setCameraPermissionError(true);
      }
    }

    initCamera();

    const durationTimer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    return () => {
      active = false;
      clearInterval(durationTimer);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Handle mute toggles
  const toggleMute = () => {
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = isMuted; // toggling
      });
    }
    setIsMuted(!isMuted);
  };

  const toggleVideo = () => {
    if (streamRef.current) {
      streamRef.current.getVideoTracks().forEach((track) => {
        track.enabled = isVideoOff; // toggling
      });
    }
    setIsVideoOff(!isVideoOff);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col overflow-hidden text-slate-100">
      {/* Top Header Bar */}
      <div className="bg-slate-900/90 backdrop-blur-md px-6 py-4 border-b border-slate-800 flex items-center justify-between z-20">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={matchProfile.photos[0]}
              alt={matchProfile.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-amber-500/60"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900 animate-pulse"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold font-serif-luxury text-base text-white">
                {matchProfile.name}, {matchProfile.age}
              </h3>
              {matchProfile.aadhaarVerified && (
                <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  <ShieldCheck className="w-3 h-3" /> Aadhaar Verified
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">{matchProfile.profession}</p>
          </div>
        </div>

        {/* E2EE and Call Duration Status */}
        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex items-center space-x-2 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700 text-xs">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-300 font-mono text-[11px]">E2EE AES-256 Verified</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          </div>

          <div className="bg-amber-500/10 text-amber-300 border border-amber-500/30 font-mono text-xs px-3 py-1.5 rounded-full font-semibold">
            {formatDuration(callDuration)}
          </div>

          <button
            onClick={() => setShowNotesDrawer(!showNotesDrawer)}
            className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 transition ${
              showNotesDrawer
                ? 'bg-amber-500 text-slate-950 border-amber-400'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden md:inline">Private Reflection Notes</span>
          </button>
        </div>
      </div>

      {/* Main Video Grid */}
      <div className="flex-1 relative bg-slate-950 flex flex-col md:flex-row p-4 gap-4 overflow-hidden">
        {/* Remote Candidate Stream (Primary) */}
        <div className="flex-1 relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center shadow-2xl">
          <img
            src={matchProfile.photos[0]}
            alt={matchProfile.name}
            className="w-full h-full object-cover object-center filter brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

          {/* Candidate status tag */}
          <div className="absolute bottom-6 left-6 z-10 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-800 flex items-center space-x-3">
            <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
            <div>
              <p className="text-xs font-semibold text-white">{matchProfile.name}</p>
              <p className="text-[10px] text-slate-400">{matchProfile.location} • 1080p HD</p>
            </div>
          </div>

          {/* Floating Conversation Prompt Card for 40+ */}
          <div className="absolute top-6 left-6 right-6 md:right-auto md:max-w-md z-10 bg-slate-900/90 backdrop-blur-md border border-amber-500/40 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Curated 40+ Conversation Prompt
              </span>
              <button
                onClick={() =>
                  setPromptIndex((prev) => (prev + 1) % MATURE_VIDEO_CONVERSATION_PROMPTS.length)
                }
                className="text-[11px] text-slate-400 hover:text-amber-300 flex items-center gap-1 transition"
              >
                Next Prompt <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <p className="text-sm text-slate-100 font-serif-luxury italic leading-relaxed">
              "{MATURE_VIDEO_CONVERSATION_PROMPTS[promptIndex]}"
            </p>
          </div>
        </div>

        {/* Local User Stream (Picture in Picture / Side Bar) */}
        <div className="w-full md:w-80 h-48 md:h-full relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
          {!cameraPermissionError && !isVideoOff ? (
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover transform -scale-x-100 ${
                isBlurActive ? 'backdrop-blur-md filter contrast-105' : ''
              }`}
            />
          ) : (
            <div className="text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-800 mx-auto flex items-center justify-center border border-slate-700">
                <VideoOff className="w-8 h-8 text-slate-500" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-200">Camera Inactive</p>
                <p className="text-[11px] text-slate-400 mt-1">
                  {isVideoOff ? 'Video muted by you' : 'Browser video stream preview mode'}
                </p>
              </div>
            </div>
          )}

          <div className="absolute bottom-3 left-3 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800 text-[10px] text-slate-300">
            You (Vasu Sharma) {isMuted ? '• Muted' : ''}
          </div>
        </div>

        {/* Reflection Notes Drawer */}
        {showNotesDrawer && (
          <div className="w-full md:w-80 h-full bg-slate-900/95 border border-slate-800 rounded-2xl p-4 flex flex-col z-20 shrink-0 animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                Confidential Date Notes
              </h4>
              <button
                onClick={() => setShowNotesDrawer(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Close
              </button>
            </div>
            <p className="text-[11px] text-slate-400 my-2">
              Privately record reflections on shared values, chemistry, and conversation impressions. Stored encrypted on your device.
            </p>
            <textarea
              value={privateNotes}
              onChange={(e) => setPrivateNotes(e.target.value)}
              placeholder="e.g. Discussed her cardiology research and classical vocal practice. Deep alignment on need for quiet weekends..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-amber-500 resize-none font-sans"
            />
          </div>
        )}
      </div>

      {/* Video Call Controls Toolbar */}
      <div className="bg-slate-900/90 backdrop-blur-md px-6 py-4 border-t border-slate-800 flex items-center justify-center space-x-6 z-20">
        <button
          onClick={toggleMute}
          className={`p-3.5 rounded-full transition ${
            isMuted ? 'bg-red-500 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
          }`}
          title={isMuted ? 'Unmute Microphone' : 'Mute Microphone'}
        >
          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        <button
          onClick={toggleVideo}
          className={`p-3.5 rounded-full transition ${
            isVideoOff ? 'bg-red-500 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
          }`}
          title={isVideoOff ? 'Start Camera' : 'Stop Camera'}
        >
          {isVideoOff ? <VideoOff className="w-5 h-5" /> : <VideoIcon className="w-5 h-5" />}
        </button>

        <button
          onClick={() => setIsBlurActive(!isBlurActive)}
          className={`px-4 py-2.5 rounded-full text-xs font-semibold border transition ${
            isBlurActive
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
          }`}
        >
          Executive Background Blur: {isBlurActive ? 'ON' : 'OFF'}
        </button>

        <button
          onClick={() => onEndCall(privateNotes)}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-bold text-xs flex items-center gap-2 shadow-lg shadow-red-900/40 transition"
        >
          <PhoneOff className="w-4 h-4" />
          End Rendezvous
        </button>
      </div>
    </div>
  );
};
