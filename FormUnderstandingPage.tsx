import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { LargeButton } from '../components/LargeButton';
import { formUnderstandingService, FormAnalysisProgress } from '../services/formUnderstandingService';
import { Sparkles, CheckCircle2, ArrowRight, ArrowLeft, FileText, Layers, FileCheck, HelpCircle } from 'lucide-react';

export const FormUnderstandingPage: React.FC = () => {
  const { activeApp, navigateTo, goBack, t, readAloudText } = useApp();

  const [analyzing, setAnalyzing] = useState(true);
  const [progressInfo, setProgressInfo] = useState<FormAnalysisProgress>({
    step: 'Scanning your uploaded form...',
    progressPercent: 20
  });

  const schema = activeApp?.formSchema;

  useEffect(() => {
    let isMounted = true;
    const runAnalysis = async () => {
      setAnalyzing(true);
      await formUnderstandingService.analyzeForm(
        schema?.formName || 'application',
        (info) => {
          if (isMounted) {
            setProgressInfo(info);
          }
        }
      );
      if (isMounted) {
        setAnalyzing(false);
      }
    };
    runAnalysis();
    return () => {
      isMounted = false;
    };
  }, [schema]);

  const totalFields = schema?.sections.reduce((acc, sec) => acc + sec.fields.length, 0) || 0;
  const totalDocs = schema?.requiredDocuments.length || 0;

  const handleContinue = () => {
    navigateTo('documents');
  };

  const handleReadAloudSummary = () => {
    if (schema) {
      readAloudText(
        `Form understood: ${schema.formName}. Purpose: ${schema.purpose}. Sections detected: ${schema.sections.map(s => s.name).join(', ')}. Fields detected: ${totalFields}. Required documents: ${totalDocs}.`
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 high-contrast:bg-black high-contrast:text-white">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-8 flex flex-col justify-center">
        
        {/* Step Indicator */}
        <div className="mb-6 flex items-center gap-3">
          <span className="px-4 py-1.5 rounded-full bg-blue-100 text-blue-800 font-black text-base high-contrast:bg-yellow-400 high-contrast:text-black">
            Step 2
          </span>
          <span className="text-xl sm:text-2xl font-bold text-slate-700 high-contrast:text-white">
            {t('understandingTitle')}
          </span>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border-4 border-slate-300 high-contrast:bg-black high-contrast:border-yellow-400 card-theme">
          
          {/* AI Thinking / Analyzing Animation */}
          {analyzing ? (
            <div className="py-12 text-center space-y-6">
              <div className="mx-auto w-24 h-24 rounded-3xl bg-blue-100 text-blue-700 flex items-center justify-center animate-spin high-contrast:bg-yellow-400 high-contrast:text-black">
                <Sparkles className="w-14 h-14" />
              </div>

              <div>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 high-contrast:text-yellow-400 mb-2">
                  {t('understandingTitle')}
                </h1>
                <p className="text-xl sm:text-2xl font-medium text-slate-600 high-contrast:text-white">
                  {progressInfo.step}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="max-w-md mx-auto w-full bg-slate-200 rounded-full h-5 overflow-hidden high-contrast:bg-zinc-800">
                <div 
                  className="bg-blue-600 h-full transition-all duration-500 rounded-full high-contrast:bg-yellow-400"
                  style={{ width: `${progressInfo.progressPercent}%` }}
                ></div>
              </div>
            </div>
          ) : (
            /* Understanding Complete View */
            <div>
              
              <div className="text-center mb-8">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3 high-contrast:bg-yellow-400 high-contrast:text-black">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 high-contrast:text-yellow-400">
                  {t('understandingTitle')}
                </h1>
                <p className="text-xl sm:text-2xl font-medium text-slate-600 high-contrast:text-white mt-1">
                  I have analyzed your form and identified all required sections and documents.
                </p>
              </div>

              {/* Form Overview Card */}
              <div className="bg-blue-50/60 rounded-3xl p-6 sm:p-8 border-3 border-blue-200 mb-8 space-y-6 high-contrast:bg-zinc-950 high-contrast:border-white">
                
                {/* Form Name & Purpose */}
                <div>
                  <span className="text-base font-black uppercase text-blue-700 tracking-wider high-contrast:text-yellow-400">
                    Form Title:
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 high-contrast:text-white mt-1">
                    {schema?.formName}
                  </h2>
                  <p className="text-lg sm:text-xl font-medium text-slate-700 high-contrast:text-zinc-300 mt-2">
                    {schema?.purpose}
                  </p>
                </div>

                {/* Detected Sections */}
                <div className="pt-4 border-t-2 border-blue-200 high-contrast:border-zinc-700">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 high-contrast:text-yellow-400 mb-3 flex items-center gap-2">
                    <Layers className="w-6 h-6 text-blue-600 high-contrast:text-yellow-400" />
                    <span>{t('detectedSections')}</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {schema?.sections.map((sec) => (
                      <div 
                        key={sec.id}
                        className="bg-white p-4 rounded-xl border-2 border-slate-200 flex items-center gap-3 text-lg font-bold text-slate-800 high-contrast:bg-black high-contrast:border-yellow-400 high-contrast:text-white"
                      >
                        <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 high-contrast:text-yellow-400" />
                        <span>{sec.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Metrics Badges */}
                <div className="pt-4 border-t-2 border-blue-200 high-contrast:border-zinc-700 flex flex-wrap gap-4 sm:gap-6">
                  <div className="bg-white px-6 py-4 rounded-2xl border-2 border-slate-200 shadow-sm flex items-center gap-4 high-contrast:bg-black high-contrast:border-white">
                    <FileText className="w-8 h-8 text-blue-700 high-contrast:text-yellow-400" />
                    <div>
                      <div className="text-3xl font-black text-slate-900 high-contrast:text-yellow-400">{totalFields}</div>
                      <div className="text-base font-bold text-slate-600 high-contrast:text-white">{t('detectedFields')}</div>
                    </div>
                  </div>

                  <div className="bg-white px-6 py-4 rounded-2xl border-2 border-slate-200 shadow-sm flex items-center gap-4 high-contrast:bg-black high-contrast:border-white">
                    <FileCheck className="w-8 h-8 text-emerald-700 high-contrast:text-yellow-400" />
                    <div>
                      <div className="text-3xl font-black text-slate-900 high-contrast:text-yellow-400">{totalDocs}</div>
                      <div className="text-base font-bold text-slate-600 high-contrast:text-white">{t('requiredDocsCount')}</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Read aloud helper */}
              <div className="mb-8 text-center">
                <button
                  type="button"
                  onClick={handleReadAloudSummary}
                  className="text-lg font-bold text-blue-700 hover:underline inline-flex items-center gap-2 high-contrast:text-yellow-400"
                >
                  🔊 Hear Summary Read Aloud
                </button>
              </div>

              {/* Actions */}
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
                  onClick={handleContinue}
                  variant="primary"
                  size="large"
                  icon={<ArrowRight className="w-7 h-7" />}
                  className="w-full sm:w-auto"
                >
                  {t('continue')}
                </LargeButton>
              </div>

            </div>
          )}

        </div>
      </main>
    </div>
  );
};
