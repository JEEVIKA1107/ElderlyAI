import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Volume2, VolumeX, SunMoon, Globe, HelpCircle } from 'lucide-react';
import { AppLanguage, FontSize } from '../types';

export const AccessibilityControls: React.FC = () => {
  const { 
    settings, 
    setFontSize, 
    toggleHighContrast, 
    setLanguage, 
    t, 
    readAloudText, 
    stopAudio, 
    isSpeaking,
    navigateTo 
  } = useApp();

  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const handleReadAloud = () => {
    if (isSpeaking) {
      stopAudio();
    } else {
      // Read current page main title or instructions
      const mainHeading = document.querySelector('h1, h2')?.textContent || t('welcomeHeading');
      readAloudText(mainHeading);
    }
  };

  const languages: { code: AppLanguage; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'hi', label: 'Hindi', native: 'हिंदी' }
  ];

  return (
    <div className="w-full bg-slate-100 border-b border-slate-300 py-2 px-3 sm:px-6 flex flex-wrap items-center justify-between gap-3 text-slate-800 high-contrast:bg-black high-contrast:border-yellow-400 high-contrast:text-white no-print">
      
      {/* Font Size Adjusters */}
      <div className="flex items-center gap-1 sm:gap-2">
        <span className="text-sm font-semibold mr-1 hidden md:inline">Text Size:</span>
        <button
          onClick={() => setFontSize('normal')}
          className={`px-3 py-1.5 rounded-lg border font-bold text-sm sm:text-base transition-colors ${
            settings.fontSize === 'normal' 
              ? 'bg-blue-700 text-white border-blue-800 high-contrast:bg-yellow-400 high-contrast:text-black' 
              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-200 high-contrast:bg-black high-contrast:text-white'
          }`}
          aria-label="Normal text size"
          title="Normal text size"
        >
          - A
        </button>
        <button
          onClick={() => setFontSize('large')}
          className={`px-3 py-1.5 rounded-lg border font-bold text-base sm:text-lg transition-colors ${
            settings.fontSize === 'large' 
              ? 'bg-blue-700 text-white border-blue-800 high-contrast:bg-yellow-400 high-contrast:text-black' 
              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-200 high-contrast:bg-black high-contrast:text-white'
          }`}
          aria-label="Large text size"
          title="Large text size"
        >
          A
        </button>
        <button
          onClick={() => setFontSize('xlarge')}
          className={`px-3 py-1.5 rounded-lg border font-bold text-lg sm:text-xl transition-colors ${
            settings.fontSize === 'xlarge' 
              ? 'bg-blue-700 text-white border-blue-800 high-contrast:bg-yellow-400 high-contrast:text-black' 
              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-200 high-contrast:bg-black high-contrast:text-white'
          }`}
          aria-label="Extra large text size"
          title="Extra large text size"
        >
          + A
        </button>
      </div>

      {/* Center Actions: High Contrast & Read Aloud */}
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        <button
          onClick={toggleHighContrast}
          className={`px-3 py-1.5 rounded-lg border font-semibold flex items-center gap-1.5 text-sm sm:text-base transition-all ${
            settings.highContrast 
              ? 'bg-yellow-400 text-black border-white font-black' 
              : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100'
          }`}
          aria-pressed={settings.highContrast}
        >
          <SunMoon className="w-4 h-4" />
          <span>{settings.highContrast ? 'High Contrast: ON' : t('highContrast')}</span>
        </button>

        <button
          onClick={handleReadAloud}
          className={`px-3 py-1.5 rounded-lg border font-semibold flex items-center gap-1.5 text-sm sm:text-base transition-all ${
            isSpeaking 
              ? 'bg-amber-600 text-white border-amber-800 animate-pulse' 
              : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100'
          }`}
          aria-label="Read text aloud"
        >
          {isSpeaking ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-blue-600" />}
          <span>{isSpeaking ? t('stopAudio') : t('readAloud')}</span>
        </button>
      </div>

      {/* Language Selector & Help */}
      <div className="flex items-center gap-2 relative">
        <div className="relative">
          <button
            onClick={() => setLangMenuOpen(prev => !prev)}
            className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 font-semibold flex items-center gap-1.5 text-sm sm:text-base high-contrast:bg-black high-contrast:border-yellow-400 high-contrast:text-white"
            aria-haspopup="true"
            aria-expanded={langMenuOpen}
          >
            <Globe className="w-4 h-4 text-slate-600 high-contrast:text-yellow-400" />
            <span>{languages.find(l => l.code === settings.language)?.native || 'English'}</span>
            <span className="text-xs">▼</span>
          </button>

          {langMenuOpen && (
            <div className="absolute right-0 mt-1 w-44 bg-white border-2 border-slate-300 rounded-xl shadow-xl z-50 overflow-hidden high-contrast:bg-black high-contrast:border-yellow-400">
              {languages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setLangMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-base flex justify-between items-center transition-colors ${
                    settings.language === lang.code
                      ? 'bg-blue-50 text-blue-800 font-bold high-contrast:bg-yellow-400 high-contrast:text-black'
                      : 'text-slate-800 hover:bg-slate-100 high-contrast:text-white high-contrast:hover:bg-zinc-800'
                  }`}
                >
                  <span>{lang.native}</span>
                  <span className="text-xs opacity-75">{lang.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => navigateTo('help')}
          className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 font-semibold flex items-center gap-1 text-sm sm:text-base high-contrast:bg-black high-contrast:border-yellow-400 high-contrast:text-white"
          aria-label="Open Help"
        >
          <HelpCircle className="w-4 h-4 text-emerald-600 high-contrast:text-yellow-400" />
          <span>{t('help')}</span>
        </button>
      </div>

    </div>
  );
};
