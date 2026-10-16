import { AppLanguage } from '../types';

// Speech Recognition API interface
interface IWindow extends Window {
  webkitSpeechRecognition?: any;
  SpeechRecognition?: any;
}

export type SpeechRate = 'slow' | 'normal' | 'fast';

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private recognition: any = null;
  private isListening = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private speechRate: number = 0.85; // Default slow and clear for elderly users

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices(): void {
    if (this.synth) {
      this.voices = this.synth.getVoices();
    }
  }

  public getAvailableVoices(): SpeechSynthesisVoice[] {
    if (this.voices.length === 0 && this.synth) {
      this.loadVoices();
    }
    return this.voices;
  }

  public setRate(rateType: SpeechRate): void {
    if (rateType === 'slow') {
      this.speechRate = 0.75;
    } else if (rateType === 'normal') {
      this.speechRate = 0.95;
    } else {
      this.speechRate = 1.1;
    }
  }

  public getRateValue(): number {
    return this.speechRate;
  }

  // --- TEXT TO SPEECH (TTS) ---

  public speak(
    text: string, 
    language: AppLanguage = 'en', 
    onStart?: () => void, 
    onEnd?: () => void
  ): void {
    if (!this.synth) {
      console.warn('Speech synthesis not supported in this browser.');
      return;
    }

    // Cancel any ongoing speech first
    this.stopSpeaking();

    const cleanText = text.trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    this.currentUtterance = utterance;
    
    // Choose appropriate voice/BCP 47 tag
    let langCode = 'en-US';
    if (language === 'ta') langCode = 'ta-IN';
    if (language === 'hi') langCode = 'hi-IN';
    utterance.lang = langCode;

    // Rate & Pitch tuned for clarity
    utterance.rate = this.speechRate;
    utterance.pitch = 1.0;

    // Try finding matching voice
    if (this.voices.length === 0) {
      this.loadVoices();
    }

    const matchingVoice = this.voices.find(v => 
      v.lang.toLowerCase().startsWith(langCode.toLowerCase()) || 
      v.lang.toLowerCase().startsWith(language.toLowerCase())
    );
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onstart = () => {
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis notice/event:', e);
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    this.synth.speak(utterance);
  }

  public stopSpeaking(): void {
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }

  public pauseSpeaking(): void {
    if (this.synth && this.synth.speaking && !this.synth.paused) {
      this.synth.pause();
    }
  }

  public resumeSpeaking(): void {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
    }
  }

  public isSpeaking(): boolean {
    return this.synth ? this.synth.speaking && !this.synth.paused : false;
  }

  public isPaused(): boolean {
    return this.synth ? this.synth.paused : false;
  }

  // --- SPEECH RECOGNITION (STT) ---

  public isRecognitionSupported(): boolean {
    if (typeof window === 'undefined') return false;
    const win = window as unknown as IWindow;
    return !!(win.SpeechRecognition || win.webkitSpeechRecognition);
  }

  public getIsListening(): boolean {
    return this.isListening;
  }

  public startListening(
    language: AppLanguage,
    onResult: (transcript: string, isFinal: boolean) => void,
    onError: (errMsg: string) => void,
    onEnd: () => void
  ): void {
    if (typeof window === 'undefined') return;
    const win = window as unknown as IWindow;
    const SpeechRec = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRec) {
      onError('Voice recognition is not supported in this browser. Please type your answer or use the demo voice helper.');
      return;
    }

    try {
      this.stopListening();

      this.recognition = new SpeechRec();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.maxAlternatives = 1;

      let langTag = 'en-IN';
      if (language === 'ta') langTag = 'ta-IN';
      if (language === 'hi') langTag = 'hi-IN';
      this.recognition.lang = langTag;

      this.recognition.onstart = () => {
        this.isListening = true;
      };

      this.recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const item = event.results[i];
          if (item.isFinal) {
            finalTranscript += item[0].transcript;
          } else {
            interimTranscript += item[0].transcript;
          }
        }

        const text = finalTranscript || interimTranscript;
        if (text) {
          onResult(text.trim(), !!finalTranscript);
        }
      };

      this.recognition.onerror = (event: any) => {
        console.warn('Speech recognition notice:', event.error);
        this.isListening = false;
        if (event.error === 'not-allowed') {
          onError('Microphone permission was not allowed. Please grant microphone access in your browser settings.');
        } else if (event.error === 'no-speech') {
          onError('No speech was detected. Please press the microphone and try speaking again.');
        } else {
          onError('Could not catch your voice clearly. Please try again or type directly.');
        }
      };

      this.recognition.onend = () => {
        this.isListening = false;
        onEnd();
      };

      this.recognition.start();
    } catch (err) {
      console.warn('Failed to start recognition:', err);
      this.isListening = false;
      onError('Unable to start microphone. Please type your answer.');
    }
  }

  public stopListening(): void {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore
      }
      this.isListening = false;
    }
  }
}

export const speechService = new SpeechService();
