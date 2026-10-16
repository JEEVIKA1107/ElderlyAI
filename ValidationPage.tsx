import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { LargeButton } from '../components/LargeButton';
import { validationService, FormValidationSummary } from '../services/validationService';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Edit3, 
  Sparkles,
  FileCheck
} from 'lucide-react';

export const ValidationPage: React.FC = () => {
  const { activeApp, updateAnswer, navigateTo, goBack, showToast, t } = useApp();

  const [isValidating, setIsValidating] = useState(true);
  const [summary, setSummary] = useState<FormValidationSummary | null>(null);
  const [editingFieldId, setEditingFieldId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const schema = activeApp?.formSchema;
  const answers = activeApp?.answers || {};
  const uploadedDocs = activeApp?.uploadedDocuments || [];
  const ocrResults = activeApp?.ocrResults || {};

  useEffect(() => {
    let isMounted = true;
    const runValidation = async () => {
      setIsValidating(true);
      await new Promise(r => setTimeout(r, 700));
      if (!schema) return;

      const res = validationService.verifyForm(schema, answers, uploadedDocs, ocrResults);
      if (isMounted) {
        setSummary(res);
        setIsValidating(false);
      }
    };

    runValidation();

    return () => {
      isMounted = false;
    };
  }, [schema, answers, uploadedDocs, ocrResults]);

  const handleStartEdit = (fieldId: string) => {
    setEditingFieldId(fieldId);
    setEditValue(answers[fieldId] ? String(answers[fieldId]) : '');
  };

  const handleSaveEdit = (fieldId: string) => {
    updateAnswer(fieldId, editValue);
    setEditingFieldId(null);
    showToast('Updated information successfully.');
    // Re-verify
    if (schema) {
      const res = validationService.verifyForm(schema, { ...answers, [fieldId]: editValue }, uploadedDocs, ocrResults);
      setSummary(res);
    }
  };

  const handleProceedToReview = () => {
    navigateTo('review');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 high-contrast:bg-black high-contrast:text-white">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-8 flex flex-col justify-center">
        
        {/* Step Indicator */}
        <div className="mb-6 flex items-center gap-3">
          <span className="px-4 py-1.5 rounded-full bg-blue-100 text-blue-800 font-black text-base high-contrast:bg-yellow-400 high-contrast:text-black">
            Step 6
          </span>
          <span className="text-xl sm:text-2xl font-bold text-slate-700 high-contrast:text-white">
            {t('validationTitle')}
          </span>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border-4 border-slate-300 high-contrast:bg-black high-contrast:border-yellow-400 card-theme">
          
          {isValidating ? (
            <div className="py-16 text-center space-y-6">
              <div className="mx-auto w-24 h-24 rounded-3xl bg-blue-100 text-blue-700 flex items-center justify-center animate-spin high-contrast:bg-yellow-400 high-contrast:text-black">
                <Sparkles className="w-14 h-14" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 high-contrast:text-yellow-400 mb-2">
                Checking your answers...
              </h1>
              <p className="text-xl sm:text-2xl font-medium text-slate-600 high-contrast:text-white">
                Making sure required fields, dates, and document proofs are accurate.
              </p>
            </div>
          ) : (
            <div>
              
              <div className="text-center mb-8">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3 high-contrast:bg-yellow-400 high-contrast:text-black">
                  <ShieldCheck className="w-10 h-10" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 high-contrast:text-yellow-400">
                  {t('validationTitle')}
                </h1>
                <p className="text-xl sm:text-2xl font-medium text-slate-600 high-contrast:text-white mt-1">
                  {t('validationDesc')}
                </p>
              </div>

              {/* Contradiction Warnings */}
              {summary && summary.contradictions.length > 0 && (
                <div className="mb-6 p-6 rounded-3xl bg-amber-50 border-3 border-amber-400 text-amber-950 high-contrast:bg-zinc-950 high-contrast:border-yellow-400 high-contrast:text-yellow-400">
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="w-8 h-8 flex-shrink-0 text-amber-600 high-contrast:text-yellow-400 mt-1" />
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black mb-2">
                        {t('contradictionWarning')}
                      </h2>
                      <ul className="space-y-2 text-lg font-medium">
                        {summary.contradictions.map((c, idx) => (
                          <li key={idx} className="bg-white/80 p-3 rounded-xl border border-amber-200 high-contrast:bg-black high-contrast:border-zinc-700">
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Missing Mandatory Fields */}
              {summary && summary.missingFields.length > 0 && (
                <div className="mb-8 p-6 rounded-3xl bg-red-50 border-3 border-red-300 text-red-950 high-contrast:bg-zinc-950 high-contrast:border-red-500 high-contrast:text-white">
                  <h2 className="text-xl sm:text-2xl font-black mb-4 flex items-center gap-2 text-red-700 high-contrast:text-yellow-400">
                    <AlertTriangle className="w-7 h-7" />
                    <span>Please provide this missing information before final review:</span>
                  </h2>

                  <div className="space-y-4">
                    {summary.missingFields.map((item) => (
                      <div 
                        key={item.fieldId}
                        className="bg-white p-5 rounded-2xl border-2 border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 high-contrast:bg-black high-contrast:border-white"
                      >
                        <div>
                          <span className="text-xs font-black uppercase text-slate-500 high-contrast:text-zinc-400">
                            {item.sectionName}
                          </span>
                          <div className="text-xl sm:text-2xl font-bold text-slate-900 high-contrast:text-white">
                            {item.fieldName}
                          </div>
                          <span className="text-sm font-semibold text-red-600 high-contrast:text-yellow-400">
                            {t('requiredMissing')}
                          </span>
                        </div>

                        {editingFieldId === item.fieldId ? (
                          <div className="flex items-center gap-2 w-full sm:w-auto">
                            <input
                              type="text"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              placeholder="Enter your answer"
                              className="px-4 py-2 rounded-xl border-2 border-blue-600 text-lg font-bold"
                            />
                            <button
                              type="button"
                              onClick={() => handleSaveEdit(item.fieldId)}
                              className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold"
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleStartEdit(item.fieldId)}
                            className="px-5 py-2.5 rounded-xl border-2 border-blue-600 bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold text-base flex items-center gap-2"
                          >
                            <Edit3 className="w-5 h-5" />
                            <span>Provide Answer</span>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Missing Documents notice */}
              {summary && summary.missingDocuments.length > 0 && (
                <div className="mb-8 p-6 rounded-3xl bg-amber-50 border-3 border-amber-300 text-amber-950 high-contrast:bg-zinc-950 high-contrast:border-yellow-400 high-contrast:text-white">
                  <h2 className="text-xl sm:text-2xl font-black mb-2 text-amber-800 high-contrast:text-yellow-400">
                    Supporting Documents Pending:
                  </h2>
                  <p className="text-lg font-medium mb-4">
                    The following required documents have not been uploaded yet:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-lg font-bold">
                    {summary.missingDocuments.map(d => (
                      <li key={d.id}>{d.name}</li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => navigateTo('documents')}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-blue-700 text-white font-bold text-base"
                  >
                    Go to Documents Screen
                  </button>
                </div>
              )}

              {/* All Clear State */}
              {summary && summary.missingFields.length === 0 && summary.contradictions.length === 0 && (
                <div className="mb-8 p-6 rounded-3xl bg-emerald-50 border-3 border-emerald-400 text-emerald-950 flex items-center gap-4 high-contrast:bg-zinc-950 high-contrast:border-yellow-400 high-contrast:text-yellow-400">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 flex-shrink-0 high-contrast:text-yellow-400" />
                  <div>
                    <h2 className="text-2xl font-black">
                      {t('noIssues')}
                    </h2>
                    <p className="text-lg font-medium text-emerald-800 high-contrast:text-white mt-0.5">
                      All required questions and format rules have passed verification.
                    </p>
                  </div>
                </div>
              )}

              {/* Verification Checklist */}
              <div className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-200 mb-8 high-contrast:bg-black high-contrast:border-white">
                <h3 className="text-xl sm:text-2xl font-black text-slate-800 high-contrast:text-yellow-400 mb-4 flex items-center gap-2">
                  <FileCheck className="w-6 h-6 text-blue-600 high-contrast:text-yellow-400" />
                  <span>Validation Checklist:</span>
                </h3>

                <div className="space-y-3">
                  {summary?.checks.map(check => (
                    <div 
                      key={check.id}
                      className="p-4 rounded-xl bg-white border border-slate-200 flex items-center justify-between gap-3 text-lg font-bold text-slate-800 high-contrast:bg-zinc-950 high-contrast:border-zinc-700 high-contrast:text-white"
                    >
                      <div className="flex items-center gap-3">
                        {check.passed ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-600 high-contrast:text-yellow-400" />
                        ) : (
                          <AlertTriangle className="w-6 h-6 text-amber-500" />
                        )}
                        <span>{check.title}</span>
                      </div>
                      {check.warning && (
                        <span className="text-sm font-semibold text-amber-700 high-contrast:text-yellow-400">
                          {check.warning}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
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
                  onClick={handleProceedToReview}
                  variant="primary"
                  size="large"
                  icon={<ArrowRight className="w-7 h-7" />}
                  className="w-full sm:w-auto"
                >
                  CONTINUE TO FINAL REVIEW
                </LargeButton>
              </div>

            </div>
          )}

        </div>
      </main>
    </div>
  );
};
