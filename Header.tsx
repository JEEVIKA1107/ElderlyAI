import React from 'react';
import { useApp } from '../context/AppContext';
import { AccessibilityControls } from './AccessibilityControls';
import { FileText, LogOut, UserPlus, FolderOpen, DoorOpen, ShieldCheck } from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    currentUser, 
    isGuest, 
    currentPage, 
    navigateTo, 
    openLogoutDialog, 
    openExitDialog, 
    t 
  } = useApp();

  // If on welcome screen, we only show accessibility toolbar without full dashboard navigation
  if (currentPage === 'welcome') {
    return (
      <header className="w-full">
        <AccessibilityControls />
      </header>
    );
  }

  return (
    <header className="w-full shadow-sm">
      {/* Top Accessibility Bar */}
      <AccessibilityControls />

      {/* Main Header Bar */}
      <div className="bg-white border-b-2 border-slate-200 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 high-contrast:bg-black high-contrast:border-yellow-400 no-print">
        
        {/* Brand & User Greeting */}
        <div 
          onClick={() => navigateTo('dashboard')} 
          className="cursor-pointer flex items-center gap-3 group"
          title="Go to Dashboard"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-700 text-white flex items-center justify-center font-black text-2xl shadow-sm group-hover:scale-105 transition-transform high-contrast:bg-yellow-400 high-contrast:text-black">
            <FileText className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight high-contrast:text-yellow-400">
              {t('appTitle')}
            </h1>
            <p className="text-sm sm:text-base font-semibold text-slate-600 high-contrast:text-white">
              {currentUser ? (
                <span>{t('welcomeUser')}, <strong className="text-blue-700 high-contrast:text-yellow-400">{currentUser.name}</strong></span>
              ) : isGuest ? (
                <span className="inline-flex items-center gap-1.5 text-amber-700 font-bold high-contrast:text-yellow-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                  {t('guestMode')}
                </span>
              ) : (
                <span>{t('tagline')}</span>
              )}
            </p>
          </div>
        </div>

        {/* Header Navigation Actions */}
        <nav className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* My Applications Button */}
          <button
            onClick={() => navigateTo('applications')}
            className={`px-3 sm:px-4 py-2 rounded-xl border-2 font-bold flex items-center gap-2 text-base transition-all ${
              currentPage === 'applications'
                ? 'bg-blue-100 text-blue-800 border-blue-600 high-contrast:bg-yellow-400 high-contrast:text-black'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100 high-contrast:bg-black high-contrast:text-white high-contrast:border-white'
            }`}
          >
            <FolderOpen className="w-5 h-5 text-blue-600 high-contrast:text-yellow-400" />
            <span>{t('myApplications')}</span>
          </button>

          {/* Privacy Link */}
          <button
            onClick={() => navigateTo('privacy')}
            className={`px-3 py-2 rounded-xl border-2 font-bold flex items-center gap-1.5 text-base transition-all ${
              currentPage === 'privacy'
                ? 'bg-blue-100 text-blue-800 border-blue-600 high-contrast:bg-yellow-400 high-contrast:text-black'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100 high-contrast:bg-black high-contrast:text-white high-contrast:border-white'
            }`}
          >
            <ShieldCheck className="w-5 h-5 text-emerald-600 high-contrast:text-yellow-400" />
            <span className="hidden sm:inline">{t('privacy')}</span>
          </button>

          {/* Guest vs Logged-In User Actions */}
          {currentUser ? (
            <button
              onClick={openLogoutDialog}
              className="px-3 sm:px-4 py-2 rounded-xl border-2 border-slate-300 bg-white hover:bg-red-50 text-red-700 font-bold flex items-center gap-2 text-base transition-all high-contrast:bg-black high-contrast:text-yellow-400 high-contrast:border-yellow-400"
              title="Log out of your account"
            >
              <LogOut className="w-5 h-5" />
              <span>{t('logOut')}</span>
            </button>
          ) : isGuest ? (
            <button
              onClick={() => navigateTo('register')}
              className="px-3 sm:px-4 py-2 rounded-xl border-2 border-emerald-600 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-bold flex items-center gap-2 text-base transition-all high-contrast:bg-black high-contrast:text-yellow-400 high-contrast:border-yellow-400"
              title="Create an account to save progress"
            >
              <UserPlus className="w-5 h-5" />
              <span>{t('createAccount')}</span>
            </button>
          ) : null}

          {/* Exit Button */}
          <button
            onClick={openExitDialog}
            className="px-3 sm:px-4 py-2 rounded-xl border-2 border-slate-400 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center gap-1.5 text-base transition-all high-contrast:bg-black high-contrast:text-white high-contrast:border-white"
            title="Exit application"
          >
            <DoorOpen className="w-5 h-5 text-slate-600 high-contrast:text-white" />
            <span>{t('exit')}</span>
          </button>
        </nav>

      </div>
    </header>
  );
};
