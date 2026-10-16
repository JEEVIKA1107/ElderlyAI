import React from 'react';
import { useApp } from '../context/AppContext';
import { LargeButton } from '../components/LargeButton';
import { AccessibilityControls } from '../components/AccessibilityControls';
import { FileText, LogIn, UserPlus, UserCheck, DoorOpen, ShieldCheck, HeartHandshake } from 'lucide-react';

export const WelcomePage: React.FC = () => {
  const { navigateTo, openExitDialog, t, readAloudText } = useApp();

  const handleReadAloudWelcome = () => {
    readAloudText(
      `${t('appTitle')}. ${t('welcomeHeading')} ${t('welcomeSubheading')}`
    );
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-blue-50 via-slate-50 to-blue-100 text-slate-900 high-contrast:from-black high-contrast:to-black high-contrast:text-white">
      
      {/* Top Accessibility Bar */}
      <AccessibilityControls />

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="max-w-2xl w-full bg-white rounded-3xl p-8 sm:p-12 shadow-xl border-4 border-blue-200 high-contrast:bg-black high-contrast:border-yellow-400 card-theme text-center">
          
          {/* Friendly Icon */}
          <div className="mx-auto w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-blue-100 text-blue-700 flex items-center justify-center mb-6 shadow-inner high-contrast:bg-yellow-400 high-contrast:text-black">
            <HeartHandshake className="w-16 h-16 sm:w-20 sm:h-20" />
          </div>

          {/* Heading and Tagline */}
          <div className="space-y-3 mb-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-800 text-base sm:text-lg font-black tracking-wide high-contrast:bg-zinc-800 high-contrast:text-yellow-400">
              {t('appTitle')}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight high-contrast:text-yellow-400">
              {t('welcomeHeading')}
            </h1>
            <p className="text-xl sm:text-2xl font-medium text-slate-700 leading-relaxed high-contrast:text-white">
              {t('welcomeSubheading')}
            </p>
          </div>

          {/* Core Action Buttons (Accessible, Stacked, Large Touch Targets) */}
          <div className="flex flex-col gap-4 max-w-lg mx-auto mb-8">
            <LargeButton
              onClick={() => navigateTo('login')}
              variant="primary"
              size="huge"
              icon={<LogIn className="w-8 h-8" />}
            >
              {t('logIn')}
            </LargeButton>

            <LargeButton
              onClick={() => navigateTo('register')}
              variant="accent"
              size="huge"
              icon={<UserPlus className="w-8 h-8" />}
            >
              {t('createAccount')}
            </LargeButton>

            <LargeButton
              onClick={() => navigateTo('guest')}
              variant="secondary"
              size="huge"
              icon={<UserCheck className="w-8 h-8" />}
            >
              {t('continueAsGuest')}
            </LargeButton>

            <LargeButton
              onClick={openExitDialog}
              variant="outline"
              size="large"
              icon={<DoorOpen className="w-7 h-7" />}
              className="mt-2"
            >
              {t('exit')}
            </LargeButton>
          </div>

          {/* Bottom Audio Helper */}
          <button
            type="button"
            onClick={handleReadAloudWelcome}
            className="inline-flex items-center gap-2 text-lg font-bold text-blue-700 hover:underline high-contrast:text-yellow-400 focus:outline-none"
          >
            🔊 {t('readAloud')}
          </button>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-slate-600 font-semibold text-base high-contrast:text-zinc-400 no-print">
        <div className="flex items-center justify-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600 high-contrast:text-yellow-400" />
          <span>Safe, Private, and Senior-Friendly Form Assistant</span>
        </div>
      </footer>

    </div>
  );
};
