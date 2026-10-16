import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { speechService } from '../services/speechService';
import { Mic, MicOff, Volume2, RotateCcw } from 'lucide-react';

interface VoiceControlsProps {
  textToSpeak?: string;
  onVoiceInput?: (transcript: string) => void;
  inline?: boolean;
}

export const VoiceControls: React.FC<VoiceControlsProps> = ({
  textToSpeak,
  onVoiceInput,
  inline = false
}) => {
  const { settings, t, readAloudText, stopAudio, isSpeaking } = useApp();
  const [isListening, setIsListening] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState<string | null>(null);

  const handleToggleListening = () => {
    if (isListening) {
      speechService.stopListening();
      setIsListening(false);
      setVoiceNotice(null);
      return;
    }

    if (!speechService.isRecognitionSupported()) {
      setVoiceNotice('Voice recognition is not available in this browser. You can easily type your answer below.');
      setTimeout(() => setVoiceNotice(null), 5000);
      return;
    }

    setVoiceNotice(t('listening'));
    setIsListening(true);

    speechService.startListening(
      settings.language,
      (transcript) => {
        if (onVoiceInput) {
          onVoiceInput(transcript);
        }
        setVoiceNotice(`Heard: "${transcript}"`);
        setTimeout(() => setVoiceNotice(null), 3000);
      },
      (errorMsg) => {
        setVoiceNotice(errorMsg);
        setIsListening(false);
        setTimeout(() => setVoiceNotice(null), 5000);
      },
      () => {
        setIsListening(false);
      }
    );
  };

  const handleHearQuestion = () => {
    if (isSpeaking) {
      stopAudio();
    } else if (textToSpeak) {
      readAloudText(textToSpeak);
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${inline ? 'w-auto' : 'w-full'}`}>
      <div className="flex items-center gap-3 flex-wrap">
        {/* Microphone / Speak Button */}
        {onVoiceInput && (
          <button
            type="button"
            onClick={handleToggleListening}
            className={`px-5 py-3 rounded-2xl border-3 font-black text-lg sm:text-xl flex items-center gap-2.5 transition-all shadow-md ${
              isListening
                ? 'bg-red-600 text-white border-red-800 listening-pulse ring-4 ring-red-300'
                : 'bg-emerald-50 text-emerald-900 border-emerald-600 hover:bg-emerald-100 high-contrast:bg-black high-contrast:text-yellow-400 high-contrast:border-yellow-400'
            }`}
            aria-label={isListening ? 'Stop listening' : 'Start speaking your answer'}
          >
            {isListening ? <MicOff className="w-6 h-6 animate-bounce" /> : <Mic className="w-6 h-6 text-emerald-700 high-contrast:text-yellow-400" />}
            <span>{isListening ? 'Stop Listening' : `🎤 ${t('speak')}`}</span>
          </button>
        )}

        {/* Text to Speech Button */}
        {textToSpeak && (
          <button
            type="button"
            onClick={handleHearQuestion}
            className={`px-5 py-3 rounded-2xl border-2 font-bold text-lg sm:text-xl flex items-center gap-2.5 transition-all shadow-sm ${
              isSpeaking
                ? 'bg-amber-100 text-amber-900 border-amber-500 animate-pulse'
                : 'bg-blue-50 text-blue-900 border-blue-400 hover:bg-blue-100 high-contrast:bg-black high-contrast:text-white high-contrast:border-white'
            }`}
            aria-label="Hear this question read aloud"
          >
            <Volume2 className="w-6 h-6 text-blue-700 high-contrast:text-yellow-400" />
            <span>{isSpeaking ? t('stopAudio') : `🔊 ${t('hearQuestion')}`}</span>
          </button>
        )}

        {/* Replay Button if speech was paused */}
        {textToSpeak && (
          <button
            type="button"
            onClick={() => {
              stopAudio();
              readAloudText(textToSpeak);
            }}
            className="p-3 rounded-2xl border-2 border-slate-300 bg-white text-slate-700 hover:bg-slate-100 high-contrast:bg-black high-contrast:text-white high-contrast:border-white"
            title="Replay from beginning"
            aria-label="Replay audio"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Voice Status Alert */}
      {voiceNotice && (
        <div className="mt-1 p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-950 font-semibold text-base flex items-center gap-2 animate-fadeIn high-contrast:bg-zinc-900 high-contrast:text-yellow-400 high-contrast:border-yellow-400">
          <span className="w-3 h-3 rounded-full bg-blue-600 animate-ping"></span>
          <span>{voiceNotice}</span>
        </div>
      )}
    </div>
  );
};
