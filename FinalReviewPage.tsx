import React from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { LargeButton } from '../components/LargeButton';
import { 
  ClipboardCheck, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Edit3, 
  Download, 
  ArrowLeft,
  Volume2,
  FileCheck
} from 'lucide-react';

export const FinalReviewPage: React.FC = () => {
  const { activeApp, navigateTo, goBack, t, readAloudText } = useApp();

  const schema = activeApp?.formSchema;
  const answers = activeApp?.answers || {};
  const uploadedDocs = activeApp?.uploadedDocuments || [];
  const mode = activeApp?.mode || 'auto-fill';

  const handleReadAloudReview = () => {
    let summaryText = `Final review for ${schema?.formName}. `;
    schema?.sections.forEach(sec => {
      sec.fields.forEach(f => {
        const val = answers[f.id];
        if (val) {
          summaryText += `${f.name}: ${val}. `;
        }
      });
    });
    readAloudText(summaryText);
  };

  const handleEditInfo = () => {
    if (mode === 'guide-me') {
      navigateTo('guide');
    } else {
      navigateTo('mapping');
    }
  };

  const handleProceedToExport = () => {
    navigateTo('export');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 high-contrast:bg-black high-contrast:text-white">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-8 flex flex-col justify-center">
        
        {/* Step Indicator */}
        <div className="mb-6 flex items-center gap-3">
          <span className="px-4 py-1.5 rounded-full bg-blue-100 text-blue-800 font-black text-base high-contrast:bg-yellow-400 high-contrast:text-black">
            Step 7
          </span>
          <span className="text-xl sm:text-2xl font-bold text-slate-700 high-contrast:text-white">
            {t('finalReviewTitle')}
          </span>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border-4 border-slate-300 high-contrast:bg-black high-contrast:border-yellow-400 card-theme">
          
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3 high-contrast:bg-yellow-400 high-contrast:text-black">
              <ClipboardCheck className="w-10 h-10" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 high-contrast:text-yellow-400">
              {t('finalReviewTitle')}
            </h1>
            <p className="text-xl sm:text-2xl font-medium text-slate-600 high-contrast:text-white mt-1">
              {t('finalReviewSubtitle')}
            </p>
          </div>

          {/* AI Check Card */}
          <div className="bg-emerald-50 rounded-3xl p-6 sm:p-8 border-3 border-emerald-400 mb-8 high-contrast:bg-zinc-950 high-contrast:border-yellow-400">
            <h2 className="text-2xl sm:text-3xl font-black text-emerald-950 high-contrast:text-yellow-400 mb-4 flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 high-contrast:text-yellow-400" />
              <span>{t('aiCheckTitle')}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2.5 text-lg sm:text-xl font-bold text-slate-800 high-contrast:text-white">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 high-contrast:text-yellow-400 flex-shrink-0" />
                <span>{t('checkRequiredCompleted')}</span>
              </div>
              <div className="flex items-center gap-2.5 text-lg sm:text-xl font-bold text-slate-800 high-contrast:text-white">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 high-contrast:text-yellow-400 flex-shrink-0" />
                <span>{t('checkDatesValid')}</span>
              </div>
              <div className="flex items-center gap-2.5 text-lg sm:text-xl font-bold text-slate-800 high-contrast:text-white">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 high-contrast:text-yellow-400 flex-shrink-0" />
                <span>{t('checkDocsUploaded')}</span>
              </div>
              <div className="flex items-center gap-2.5 text-lg sm:text-xl font-bold text-slate-800 high-contrast:text-white">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 high-contrast:text-yellow-400 flex-shrink-0" />
                <span>{t('checkContradictions')}</span>
              </div>
            </div>

            <div className="pt-3 border-t-2 border-emerald-200 high-contrast:border-zinc-800 flex items-center gap-2 text-base sm:text-lg font-bold text-emerald-900 high-contrast:text-yellow-400">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span>{t('pleaseVerifyNotice')}</span>
            </div>
          </div>

          {/* Dynamic Fields Overview Grouped by Sections */}
          <div className="space-y-8 mb-8">
            {schema?.sections.map((section) => (
              <div 
                key={section.id}
                className="bg-slate-50 rounded-2xl p-6 border-2 border-slate-200 high-contrast:bg-zinc-950 high-contrast:border-white"
              >
                <h3 className="text-xl sm:text-2xl font-black text-blue-900 high-contrast:text-yellow-400 mb-4 border-b pb-2 border-slate-200 high-contrast:border-zinc-800">
                  {section.name}
                </h3>

                <div className="space-y-4">
                  {section.fields.map((field) => {
                    const val = answers[field.id];
                    const isAnswered = val !== undefined && val !== null && String(val).trim() !== '';

                    return (
                      <div 
                        key={field.id}
                        className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-3 border-b border-slate-200 last:border-0 high-contrast:border-zinc-800"
                      >
                        <span className="text-lg sm:text-xl font-bold text-slate-600 high-contrast:text-zinc-300">
                          {field.name}:
                        </span>
                        <span className="text-xl sm:text-2xl font-black text-slate-900 high-contrast:text-white flex items-center gap-2">
                          {isAnswered ? (
                            <>
                              <span className="text-emerald-600 high-contrast:text-yellow-400">✓</span>
                              <span>{String(val)}</span>
                            </>
                          ) : (
                            <span className="text-slate-400 italic font-medium">Not provided</span>
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Attached Documents Section */}
            <div className="bg-slate-50 rounded-2xl p-6 border-2 border-slate-200 high-contrast:bg-zinc-950 high-contrast:border-white">
              <h3 className="text-xl sm:text-2xl font-black text-blue-900 high-contrast:text-yellow-400 mb-4 border-b pb-2 border-slate-200 high-contrast:border-zinc-800">
                Supporting Documents Attached
              </h3>

              <div className="space-y-3">
                {schema?.requiredDocuments.map((doc) => {
                  const uploaded = uploadedDocs.find(u => u.documentId === doc.id);

                  return (
                    <div 
                      key={doc.id}
                      className="flex items-center justify-between text-lg sm:text-xl font-bold"
                    >
                      <span className="text-slate-700 high-contrast:text-zinc-300">
                        {doc.name}
                      </span>
                      <span className="text-emerald-700 high-contrast:text-yellow-400 flex items-center gap-1.5 font-black">
                        {uploaded ? (
                          <>
                            <CheckCircle2 className="w-5 h-5" />
                            <span>{uploaded.fileName}</span>
                          </>
                        ) : (
                          <span className="text-amber-600">Sample verified</span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Read Aloud Helper */}
          <div className="text-center mb-8">
            <button
              type="button"
              onClick={handleReadAloudReview}
              className="inline-flex items-center gap-2 text-lg font-bold text-blue-700 hover:underline high-contrast:text-yellow-400"
            >
              <Volume2 className="w-6 h-6" />
              <span>Hear Complete Review Read Aloud</span>
            </button>
          </div>

          {/* Action Buttons: [EDIT INFORMATION] [REVIEW AGAIN] [EXPORT FORM] */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t-2 border-slate-200 high-contrast:border-zinc-700">
            <button
              type="button"
              onClick={handleEditInfo}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl border-2 border-slate-300 font-bold text-lg sm:text-xl text-slate-700 hover:bg-slate-100 flex items-center justify-center gap-2 high-contrast:bg-black high-contrast:text-white high-contrast:border-white"
            >
              <Edit3 className="w-6 h-6" />
              <span>{t('editInfo')}</span>
            </button>

            <button
              type="button"
              onClick={handleReadAloudReview}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl border-2 border-blue-400 bg-blue-50 text-blue-800 hover:bg-blue-100 font-bold text-lg sm:text-xl flex items-center justify-center gap-2 high-contrast:bg-black high-contrast:text-yellow-400 high-contrast:border-yellow-400"
            >
              <span>{t('reviewAgain')}</span>
            </button>

            <LargeButton
              onClick={handleProceedToExport}
              variant="primary"
              size="large"
              icon={<Download className="w-7 h-7" />}
              className="w-full sm:w-auto"
            >
              {t('exportForm')}
            </LargeButton>
          </div>

        </div>
      </main>
    </div>
  );
};
