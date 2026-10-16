import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Volume2, 
  VolumeX, 
  Pause, 
  Play, 
  Mic, 
  Settings2, 
  ChevronUp, 
  ChevronDown, 
  Gauge,
  Headphones,
  RotateCcw
} from 'lucide-react';

export const FloatingVoiceBar: React.FC = () => {
  const { 
    isSpeaking, 
    isPaused, 
    pauseSpeaking, 
    resumeSpeaking, 
    stopAudio, 
    readCurrentScreen, 
    openVoiceAssistant, 
    speechRate, 
    setSpeechRate,
    activeSpeakingText,
    t 
  } = useApp();

  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <aside 
      aria-label="Voice & Audio Assistant"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-2xl w-[94%] sm:w-auto transition-all duration-200 no-print"
    >
      <div className="bg-slate-900/95 backdrop-blur-md text-white rounded-3xl p-3 sm:p-4 shadow-2xl border-3 border-blue-500 high-contrast:bg-black high-contrast:border-yellow-400 high-contrast:text-yellow-400 flex flex-col gap-2">
        
        {/* Main Controls Row */}
        <div className="flex items-center justify-between gap-2 sm:gap-4 flex-wrap">
          
          {/* Read Screen / TTS Button */}
          <button
            type="button"
            onClick={readCurrentScreen}
            className={`px-4 py-2.5 rounded-2xl font-black text-sm sm:text-base flex items-center gap-2 transition-all shadow-md ${
              isSpeaking && !isPaused
                ? 'bg-amber-500 text-black border-2 border-white animate-pulse'
                : 'bg-blue-600 hover:bg-blue-500 text-white border-2 border-blue-400 high-contrast:bg-yellow-400 high-contrast:text-black'
            }`}
            title="Read entire screen content aloud"
          >
            <Volume2 className="w-5 h-5 flex-shrink-0" />
            <span>{isSpeaking ? 'Reading Screen...' : '🔊 Read Screen'}</span>
          </button>

          {/* Pause / Resume Controls if Speaking */}
          {isSpeaking && (
            <div className="flex items-center gap-1.5">
              {isPaused ? (
                <button
                  type="button"
                  onClick={resumeSpeaking}
                  className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-1"
                  title="Resume speech"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Resume</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={pauseSpeaking}
                  className="px-3 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-sm flex items-center gap-1"
                  title="Pause speech"
                >
                  <Pause className="w-4 h-4" />
                  <span>Pause</span>
                </button>
              )}

              <button
                type="button"
                onClick={stopAudio}
                className="px-3 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm flex items-center gap-1"
                title="Stop speech"
              >
                <VolumeX className="w-4 h-4" />
                <span>Stop</span>
              </button>
            </div>
          )}

          {/* Speech Rate Toggle: Slow / Normal */}
          <div className="flex items-center bg-slate-800 rounded-xl p-1 border border-slate-700 high-contrast:bg-zinc-900 high-contrast:border-zinc-700">
            <span className="text-xs font-bold text-slate-400 px-2 hidden md:inline">Speed:</span>
            <button
              type="button"
              onClick={() => setSpeechRate(speechRate === 'slow' ? 'normal' : 'slow')}
              className="px-2.5 py-1 rounded-lg text-xs sm:text-sm font-black bg-blue-600 text-white high-contrast:bg-yellow-400 high-contrast:text-black"
              title="Toggle reading speed"
            >
              {speechRate === 'slow' ? '🐢 Slow (0.75x)' : '⚡ Normal (0.95x)'}
            </button>
          </div>

          {/* Voice Assistant & Dictation Modal Trigger */}
          <button
            type="button"
            onClick={openVoiceAssistant}
            className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm sm:text-base flex items-center gap-2 border-2 border-emerald-400 shadow-md high-contrast:bg-black high-contrast:text-yellow-400 high-contrast:border-yellow-400"
            title="Open Voice Dictation & Speech Center"
          >
            <Mic className="w-5 h-5 flex-shrink-0 animate-pulse text-yellow-300" />
            <span>🎤 Voice Assistant</span>
          </button>

          {/* Collapse / Expand Toggle */}
          <button
            type="button"
            onClick={() => setIsMinimized(prev => !prev)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white"
            title={isMinimized ? 'Expand speech bar' : 'Minimize speech bar'}
            aria-label="Toggle speech bar"
          >
            {isMinimized ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

        </div>

        {/* Live Audio Transcript Sub-bar (when speaking) */}
        {!isMinimized && activeSpeakingText && (
          <div className="pt-2 border-t border-slate-800 text-xs sm:text-sm font-medium text-slate-300 flex items-center gap-2 truncate high-contrast:text-yellow-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping flex-shrink-0"></span>
            <span className="truncate">"{activeSpeakingText}"</span>
          </div>
        )}

      </div>
    </aside>
  );
};
