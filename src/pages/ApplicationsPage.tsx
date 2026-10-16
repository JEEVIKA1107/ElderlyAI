import React from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { LargeButton } from '../components/LargeButton';
import { FolderOpen, Play, Trash2, Plus, ArrowLeft, Clock, CheckCircle2 } from 'lucide-react';

export const ApplicationsPage: React.FC = () => {
  const { 
    savedApplications, 
    loadApplication, 
    deleteSavedApplication, 
    navigateTo, 
    goBack, 
    t 
  } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 high-contrast:bg-black high-contrast:text-white">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-8 flex flex-col justify-center">
        
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3 high-contrast:bg-yellow-400 high-contrast:text-black">
            <FolderOpen className="w-10 h-10" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 high-contrast:text-yellow-400">
            {t('savedApplications')}
          </h1>
          <p className="text-xl sm:text-2xl font-medium text-slate-600 high-contrast:text-white mt-1">
            Review or resume your in-progress and completed forms.
          </p>
        </div>

        {/* List of Saved Applications */}
        <div className="space-y-6 mb-8">
          {savedApplications.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border-3 border-slate-200 high-contrast:bg-black high-contrast:border-yellow-400">
              <p className="text-2xl font-bold text-slate-600 high-contrast:text-white mb-6">
                {t('noApplicationsYet')}
              </p>
              <LargeButton
                onClick={() => navigateTo('upload')}
                variant="primary"
                size="large"
                icon={<Plus className="w-7 h-7" />}
              >
                {t('startNewApp')}
              </LargeButton>
            </div>
          ) : (
            savedApplications.map((app) => {
              const totalFields = app.formSchema.sections.reduce((acc, s) => acc + s.fields.length, 0);
              const answeredFields = Object.keys(app.answers).filter(k => app.answers[k] !== undefined && app.answers[k] !== '').length;

              const savedDate = new Date(app.lastSaved);
              const formattedDate = savedDate.toLocaleDateString() + ' at ' + savedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

              return (
                <div 
                  key={app.id}
                  className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-3 border-slate-300 hover:border-blue-500 transition-all high-contrast:bg-black high-contrast:border-yellow-400 flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-2">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase bg-blue-100 text-blue-800 high-contrast:bg-zinc-800 high-contrast:text-yellow-400">
                      Mode: {app.mode === 'auto-fill' ? 'Auto-Fill' : 'Guide Me'}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 high-contrast:text-white">
                      {app.formSchema.formName}
                    </h2>
                    <div className="flex flex-wrap items-center gap-4 text-base sm:text-lg font-bold text-slate-600 high-contrast:text-zinc-300">
                      <span className="flex items-center gap-1.5 text-blue-700 high-contrast:text-yellow-400">
                        <CheckCircle2 className="w-5 h-5" />
                        {t('progressLabel')} {answeredFields} of {totalFields} questions
                      </span>
                      <span className="flex items-center gap-1.5 text-slate-500 high-contrast:text-zinc-400">
                        <Clock className="w-5 h-5" />
                        {t('lastSavedLabel')} {formattedDate}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    <LargeButton
                      onClick={() => loadApplication(app.id)}
                      variant="primary"
                      size="normal"
                      icon={<Play className="w-5 h-5 fill-current" />}
                    >
                      {t('continue')}
                    </LargeButton>

                    <button
                      type="button"
                      onClick={() => deleteSavedApplication(app.id)}
                      className="p-3.5 rounded-xl border-2 border-red-300 bg-red-50 hover:bg-red-100 text-red-700 font-bold transition-colors high-contrast:bg-black high-contrast:text-red-400 high-contrast:border-red-400"
                      title="Delete saved application"
                      aria-label="Delete saved application"
                    >
                      <Trash2 className="w-6 h-6" />
                    </button>
                  </div>

                </div>
              );
            })
          )}
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t-2 border-slate-200 high-contrast:border-zinc-700">
          <button
            type="button"
            onClick={goBack}
            className="px-6 py-3.5 rounded-xl border-2 border-slate-300 font-bold text-lg sm:text-xl text-slate-700 hover:bg-slate-100 flex items-center gap-2 high-contrast:bg-black high-contrast:text-white high-contrast:border-white"
          >
            <ArrowLeft className="w-6 h-6" />
            <span>{t('back')}</span>
          </button>

          <LargeButton
            onClick={() => navigateTo('upload')}
            variant="accent"
            size="large"
            icon={<Plus className="w-7 h-7" />}
          >
            {t('startNewApp')}
          </LargeButton>
        </div>

      </main>
    </div>
  );
};
