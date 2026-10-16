import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { speechService, SpeechRate } from '../services/speechService';
import { LargeButton } from './LargeButton';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Check, 
  X, 
  Sparkles, 
  Languages, 
  Gauge, 
  Copy, 
  RotateCcw,
  Headphones
} from 'lucide-react';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  onClose
}) => {
  const { settings, t, readAloudText, stopAudio, isSpeaking, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'stt' | 'tts'>('stt');
  const [isListening, setIsListening] = useState(false);
  const [spokenTranscript, setSpokenTranscript] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [selectedRate, setSelectedRate] = useState<SpeechRate>('slow');
  const [customTextToRead, setCustomTextToRead] = useState(
    settings.language === 'ta'
      ? 'வணக்கம்! செயற்கை நுண்ணறிவு படிவ உதவியாளர் உங்களை அன்போடு வரவேற்கிறது.'
      : settings.language === 'hi'
      ? 'नमस्ते! एआई फॉर्म सहायक में आपका स्वागत है। हम आपका फॉर्म भरने में मदद करेंगे।'
      : 'Welcome to AI Form Assistant! We are here to help you complete your form easily.'
  );

  if (!isOpen) return null;

  const handleToggleListening = () => {
    if (isListening) {
      speechService.stopListening();
      setIsListening(false);
      setStatusMessage('Voice recognition stopped.');
      return;
    }

    if (!speechService.isRecognitionSupported()) {
      setStatusMessage('Speech recognition is not supported in this browser. You can type or use the sample tests below.');
      return;
    }

    setIsListening(true);
    setStatusMessage('Listening... Please speak clearly into your microphone.');

    speechService.startListening(
      settings.language,
      (text, isFinal) => {
        setSpokenTranscript(text);
        if (isFinal) {
          setStatusMessage('Speech successfully captured!');
          setIsListening(false);
        }
      },
      (err) => {
        setStatusMessage(err);
        setIsListening(false);
      },
      () => {
        setIsListening(false);
      }
    );
  };

  const handleRateChange = (rate: SpeechRate) => {
    setSelectedRate(rate);
    speechService.setRate(rate);
    showToast(`Speech speed set to ${rate.toUpperCase()}`);
  };

  const handleReadSample = () => {
    if (isSpeaking) {
      stopAudio();
    } else {
      readAloudText(customTextToRead);
    }
  };

  const samplePhrases = [
    { en: 'My name is Ramesh Kumar', ta: 'என் பெயர் ரமேஷ் குமார்', hi: 'मेरा नाम रमेश कुमार है' },
    { en: 'My date of birth is 12 March 1954', ta: 'என் பிறந்த தேதி 12 மார்ச் 1954', hi: 'मेरी जन्म तिथि 12 मार्च 1954 है' },
    { en: 'Coimbatore, Tamil Nadu', ta: 'கோயம்புத்தூர், தமிழ்நாடு', hi: 'कोयंबटूर, तमिलनाडु' },
    { en: 'Yes, I am retired', ta: 'ஆம், நான் ஓய்வு பெற்றவர்', hi: 'हाँ, मैं सेवानिवृत्त हूँ' }
  ];

  const handlePickSamplePhrase = (phrase: string) => {
    setSpokenTranscript(phrase);
    showToast(`Loaded sample phrase: "${phrase}"`);
  };

  const handleCopyTranscript = () => {
    if (spokenTranscript) {
      navigator.clipboard.writeText(spokenTranscript);
      showToast('Text copied to clipboard!');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="voice-assistant-title"
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border-4 border-blue-600 high-contrast:bg-black high-contrast:border-yellow-400 text-slate-900 high-contrast:text-white card-theme flex flex-col max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b-2 border-slate-200 high-contrast:border-zinc-700">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center high-contrast:bg-yellow-400 high-contrast:text-black">
              <Headphones className="w-8 h-8" />
            </div>
            <div>
              <h2 id="voice-assistant-title" className="text-2xl sm:text-3xl font-black text-slate-900 high-contrast:text-yellow-400">
                Voice Assistant & Speech Center
              </h2>
              <p className="text-base sm:text-lg font-bold text-slate-600 high-contrast:text-white">
                Speech-to-Text (STT) and Text-to-Speech (TTS)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2.5 rounded-xl border-2 border-slate-300 text-slate-600 hover:bg-slate-100 high-contrast:bg-black high-contrast:text-white high-contrast:border-white"
            aria-label="Close dialog"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        {/* Mode Tabs */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('stt')}
            className={`py-3 px-4 rounded-2xl font-black text-lg sm:text-xl flex items-center justify-center gap-2 border-3 transition-all ${
              activeTab === 'stt'
                ? 'bg-blue-700 text-white border-blue-900 high-contrast:bg-yellow-400 high-contrast:text-black'
                : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200 high-contrast:bg-black high-contrast:text-white'
            }`}
          >
            <Mic className="w-6 h-6" />
            <span>Speech to Text</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('tts')}
            className={`py-3 px-4 rounded-2xl font-black text-lg sm:text-xl flex items-center justify-center gap-2 border-3 transition-all ${
              activeTab === 'tts'
                ? 'bg-blue-700 text-white border-blue-900 high-contrast:bg-yellow-400 high-contrast:text-black'
                : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200 high-contrast:bg-black high-contrast:text-white'
            }`}
          >
            <Volume2 className="w-6 h-6" />
            <span>Text to Speech</span>
          </button>
        </div>

        {/* Tab 1: SPEECH TO TEXT */}
        {activeTab === 'stt' && (
          <div className="space-y-6">
            <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-200 text-center high-contrast:bg-zinc-950 high-contrast:border-white">
              
              {/* Giant Microphone Button */}
              <button
                type="button"
                onClick={handleToggleListening}
                className={`mx-auto w-28 h-28 rounded-full border-4 flex flex-col items-center justify-center transition-all shadow-xl ${
                  isListening
                    ? 'bg-red-600 text-white border-red-800 listening-pulse ring-8 ring-red-200'
                    : 'bg-emerald-600 text-white border-emerald-800 hover:bg-emerald-700 hover:scale-105 high-contrast:bg-yellow-400 high-contrast:text-black'
                }`}
                aria-label={isListening ? 'Stop listening' : 'Start speaking'}
              >
                {isListening ? (
                  <MicOff className="w-12 h-12 animate-bounce" />
                ) : (
                  <Mic className="w-12 h-12" />
                )}
                <span className="text-xs font-black uppercase mt-1">
                  {isListening ? 'Listening' : 'Tap to Speak'}
                </span>
              </button>

              {statusMessage && (
                <p className="mt-4 text-base sm:text-lg font-bold text-blue-900 high-contrast:text-yellow-400 animate-fadeIn">
                  {statusMessage}
                </p>
              )}
            </div>

            {/* Transcription Display */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-black uppercase text-slate-600 high-contrast:text-zinc-300">
                  Transcribed Words:
                </span>
                {spokenTranscript && (
                  <button
                    type="button"
                    onClick={handleCopyTranscript}
                    className="text-sm font-bold text-blue-700 hover:underline flex items-center gap-1 high-contrast:text-yellow-400"
                  >
                    <Copy className="w-4 h-4" /> Copy Text
                  </button>
                )}
              </div>

              <div className="p-5 rounded-2xl border-3 border-slate-300 bg-white min-h-[100px] text-2xl font-black text-slate-900 high-contrast:bg-black high-contrast:text-white high-contrast:border-yellow-400">
                {spokenTranscript ? (
                  <span>"{spokenTranscript}"</span>
                ) : (
                  <span className="text-slate-400 italic font-medium text-lg">
                    Press the green microphone above and speak clearly...
                  </span>
                )}
              </div>
            </div>

            {/* Quick Sample Test Phrases */}
            <div>
              <span className="text-xs font-black uppercase text-slate-500 high-contrast:text-zinc-400 block mb-2">
                Or Try Sample Voice Inputs:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {samplePhrases.map((phrase, idx) => {
                  const activeText = settings.language === 'ta' ? phrase.ta : settings.language === 'hi' ? phrase.hi : phrase.en;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handlePickSamplePhrase(activeText)}
                      className="p-3 text-left rounded-xl border border-slate-300 bg-slate-50 hover:bg-blue-50 text-slate-800 font-bold text-sm high-contrast:bg-zinc-900 high-contrast:text-white"
                    >
                      🗣️ "{activeText}"
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: TEXT TO SPEECH */}
        {activeTab === 'tts' && (
          <div className="space-y-6">
            
            {/* Speed Tuning */}
            <div className="bg-blue-50/70 p-5 rounded-2xl border-2 border-blue-200 high-contrast:bg-zinc-950 high-contrast:border-white">
              <div className="flex items-center gap-2 mb-3 text-blue-950 high-contrast:text-yellow-400 font-black text-lg">
                <Gauge className="w-5 h-5 text-blue-700 high-contrast:text-yellow-400" />
                <span>Speech Reading Speed:</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleRateChange('slow')}
                  className={`py-2 px-3 rounded-xl font-black text-base border-2 transition-all ${
                    selectedRate === 'slow'
                      ? 'bg-blue-700 text-white border-blue-900 high-contrast:bg-yellow-400 high-contrast:text-black'
                      : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  Slow (0.75x)
                </button>
                <button
                  type="button"
                  onClick={() => handleRateChange('normal')}
                  className={`py-2 px-3 rounded-xl font-black text-base border-2 transition-all ${
                    selectedRate === 'normal'
                      ? 'bg-blue-700 text-white border-blue-900 high-contrast:bg-yellow-400 high-contrast:text-black'
                      : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  Normal (0.95x)
                </button>
                <button
                  type="button"
                  onClick={() => handleRateChange('fast')}
                  className={`py-2 px-3 rounded-xl font-black text-base border-2 transition-all ${
                    selectedRate === 'fast'
                      ? 'bg-blue-700 text-white border-blue-900 high-contrast:bg-yellow-400 high-contrast:text-black'
                      : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  Fast (1.1x)
                </button>
              </div>
            </div>

            {/* Custom Text to Read */}
            <div>
              <label className="block text-sm font-black uppercase text-slate-600 high-contrast:text-zinc-300 mb-1.5">
                Text to Read Aloud:
              </label>
              <textarea
                rows={3}
                value={customTextToRead}
                onChange={(e) => setCustomTextToRead(e.target.value)}
                className="w-full p-4 text-xl font-medium rounded-2xl border-3 border-slate-300 outline-none focus:border-blue-600 high-contrast:bg-black high-contrast:text-white high-contrast:border-yellow-400 resize-none"
              />
            </div>

            {/* Read Button */}
            <div className="flex gap-3">
              <LargeButton
                onClick={handleReadSample}
                variant={isSpeaking ? 'accent' : 'primary'}
                size="large"
                icon={isSpeaking ? <VolumeX className="w-7 h-7" /> : <Volume2 className="w-7 h-7" />}
                className="flex-1"
              >
                {isSpeaking ? 'Stop Reading' : 'Play Speech Readout'}
              </LargeButton>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-4 border-t-2 border-slate-200 high-contrast:border-zinc-700 flex justify-end">
          <LargeButton
            onClick={onClose}
            variant="secondary"
            size="normal"
          >
            Close
          </LargeButton>
        </div>

      </div>
    </div>
  );
};
