import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { speechService } from '../services/speechService';
import { Mic, MicOff, Check, AlertCircle } from 'lucide-react';

interface SpeechInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onValueChange: (val: string) => void;
  label?: string;
  fieldId?: string;
  speakableLabel?: string;
  placeholder?: string;
  className?: string;
}

export const SpeechInput: React.FC<SpeechInputProps> = ({
  value,
  onValueChange,
  label,
  fieldId,
  speakableLabel,
  placeholder,
  className = '',
  type = 'text',
  ...rest
}) => {
  const { settings, t, showToast } = useApp();
  const [isListening, setIsListening] = useState(false);
  const [interimText, setInterimText] = useState('');
  const [voiceNotice, setVoiceNotice] = useState<string | null>(null);

  const toggleListening = () => {
    if (isListening) {
      speechService.stopListening();
      setIsListening(false);
      setInterimText('');
      return;
    }

    if (!speechService.isRecognitionSupported()) {
      setVoiceNotice('Microphone input is not supported in this browser. You can type directly.');
      setTimeout(() => setVoiceNotice(null), 4000);
      return;
    }

    setIsListening(true);
    setVoiceNotice(t('listening'));

    speechService.startListening(
      settings.language,
      (transcript, isFinal) => {
        setInterimText(transcript);
        if (isFinal || transcript.length > 0) {
          onValueChange(transcript);
          if (isFinal) {
            showToast(`Voice input received: "${transcript}"`);
            setIsListening(false);
            setInterimText('');
            setVoiceNotice(null);
          }
        }
      },
      (errorMsg) => {
        setVoiceNotice(errorMsg);
        setIsListening(false);
        setInterimText('');
        setTimeout(() => setVoiceNotice(null), 4000);
      },
      () => {
        setIsListening(false);
        setInterimText('');
      }
    );
  };

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label 
          htmlFor={fieldId} 
          className="block text-xl sm:text-2xl font-bold text-slate-800 high-contrast:text-white"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        <input
          id={fieldId}
          type={type}
          value={isListening && interimText ? interimText : value}
          onChange={(e) => onValueChange(e.target.value)}
          placeholder={isListening ? 'Listening... Speak now' : placeholder}
          className={`w-full pr-16 pl-5 py-4 text-xl sm:text-2xl rounded-2xl border-3 transition-all outline-none input-theme ${
            isListening 
              ? 'border-red-500 bg-red-50/40 text-red-900 ring-4 ring-red-200' 
              : 'border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-200 text-slate-900 bg-white'
          } high-contrast:bg-black high-contrast:text-white high-contrast:border-yellow-400 ${className}`}
          {...rest}
        />

        {/* Integrated Microphone Speech-To-Text Button */}
        <button
          type="button"
          onClick={toggleListening}
          aria-label={isListening ? 'Stop listening' : `Speak into ${label || 'input'}`}
          title={isListening ? 'Stop listening' : `Speak input (${t('speak')})`}
          className={`absolute right-2 px-3 py-2.5 rounded-xl border-2 font-black transition-all flex items-center gap-1 shadow-sm ${
            isListening
              ? 'bg-red-600 text-white border-red-700 animate-pulse ring-2 ring-red-300'
              : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-400 high-contrast:bg-black high-contrast:text-yellow-400 high-contrast:border-yellow-400'
          }`}
        >
          {isListening ? (
            <>
              <MicOff className="w-6 h-6 animate-bounce" />
              <span className="text-xs font-bold uppercase hidden sm:inline">Stop</span>
            </>
          ) : (
            <>
              <Mic className="w-6 h-6 text-emerald-700 high-contrast:text-yellow-400" />
              <span className="text-xs font-bold uppercase hidden sm:inline">{t('speak')}</span>
            </>
          )}
        </button>
      </div>

      {/* Voice Status Alert / Live Listening Feedback */}
      {voiceNotice && (
        <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-sm sm:text-base font-bold flex items-center gap-2 high-contrast:bg-zinc-900 high-contrast:text-yellow-400 high-contrast:border-yellow-400 animate-fadeIn">
          {isListening ? (
            <span className="w-3 h-3 rounded-full bg-red-600 animate-ping"></span>
          ) : (
            <AlertCircle className="w-4 h-4 text-blue-700 high-contrast:text-yellow-400" />
          )}
          <span>{voiceNotice}</span>
        </div>
      )}
    </div>
  );
};
