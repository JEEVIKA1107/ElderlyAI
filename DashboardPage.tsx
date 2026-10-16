import React from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { LargeButton } from '../components/LargeButton';
import { Sparkles, HelpCircle, FileSpreadsheet, Compass, FolderOpen, ArrowRight, Play } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { 
    currentUser, 
    isGuest, 
    navigateTo, 
    setAppMode, 
    savedApplications, 
    loadApplication, 
    t 
  } = useApp();

  const handleStartMode = (mode: 'auto-fill' | 'guide-me') => {
    setAppMode(mode);
    navigateTo('upload');
  };

  const handleContinueLatest = () => {
    if (savedApplications.length > 0) {
      loadApplication(savedApplications[0].id);
    } else {
      navigateTo('applications');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 high-contrast:bg-black high-contrast:text-white">
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-8 flex flex-col justify-center">
        
        {/* Banner */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 high-contrast:text-yellow-400 mb-3">
            {t('whatToDo')}
          </h1>
          <p className="text-xl sm:text-2xl font-medium text-slate-600 high-contrast:text-white">
            Choose how you would like to complete your form today:
          </p>
        </div>

        {/* 2 Main Choice Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
          
          {/* Card 1: AUTO-FILL */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg border-4 border-blue-300 hover:border-blue-600 transition-all flex flex-col justify-between high-contrast:bg-black high-contrast:border-yellow-400 card-theme">
            <div>
              <div className="w-20 h-20 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-6 high-contrast:bg-yellow-400 high-contrast:text-black">
                <Sparkles className="w-12 h-12" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 high-contrast:text-yellow-400 mb-3 tracking-tight">
                {t('autoFillTitle')}
              </h2>
              <p className="text-xl sm:text-2xl font-medium text-slate-700 high-contrast:text-white mb-8 leading-relaxed">
                {t('autoFillDesc')}
              </p>
            </div>

            <LargeButton
              onClick={() => handleStartMode('auto-fill')}
              variant="primary"
              size="huge"
              icon={<Play className="w-7 h-7 fill-current" />}
            >
              {t('start')}
            </LargeButton>
          </div>

          {/* Card 2: GUIDE ME */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg border-4 border-emerald-300 hover:border-emerald-600 transition-all flex flex-col justify-between high-contrast:bg-black high-contrast:border-yellow-400 card-theme">
            <div>
              <div className="w-20 h-20 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6 high-contrast:bg-yellow-400 high-contrast:text-black">
                <Compass className="w-12 h-12" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 high-contrast:text-yellow-400 mb-3 tracking-tight">
                {t('guideMeTitle')}
              </h2>
              <p className="text-xl sm:text-2xl font-medium text-slate-700 high-contrast:text-white mb-8 leading-relaxed">
                {t('guideMeDesc')}
              </p>
            </div>

            <LargeButton
              onClick={() => handleStartMode('guide-me')}
              variant="accent"
              size="huge"
              icon={<Play className="w-7 h-7 fill-current" />}
            >
              {t('start')}
            </LargeButton>
          </div>

        </div>

        {/* Continue Previous Application Option */}
        <div className="text-center pt-2">
          {savedApplications.length > 0 ? (
            <button
              onClick={handleContinueLatest}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl border-3 border-slate-400 bg-white hover:bg-slate-100 text-slate-900 font-black text-xl sm:text-2xl shadow-md transition-all high-contrast:bg-black high-contrast:text-white high-contrast:border-white"
            >
              <FolderOpen className="w-7 h-7 text-blue-600 high-contrast:text-yellow-400" />
              <span>{t('continuePrevious')}</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          ) : (
            <button
              onClick={() => navigateTo('applications')}
              className="text-lg sm:text-xl font-bold text-slate-600 hover:text-blue-700 underline high-contrast:text-yellow-400"
            >
              {t('savedApplications')}
            </button>
          )}
        </div>

      </main>
    </div>
  );
};
