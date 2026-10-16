import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { LargeButton } from '../components/LargeButton';
import { ArrowDown, Check, CheckCheck, ArrowRight, ArrowLeft, GitMerge, FileText } from 'lucide-react';

export const FieldMappingPage: React.FC = () => {
  const { activeApp, updateAnswer, navigateTo, goBack, showToast, t } = useApp();

  const schema = activeApp?.formSchema;
  const ocrResults = activeApp?.ocrResults || {};
  const currentAnswers = activeApp?.answers || {};

  // Collect all mapped pairs
  const mappings: Array<{
    docLabel: string;
    docValue: string;
    fieldId: string;
    fieldName: string;
    isConfirmed: boolean;
  }> = [];

  Object.values(ocrResults).forEach(ocr => {
    ocr.extractedFields.forEach(extracted => {
      if (extracted.targetFieldId && extracted.value) {
        mappings.push({
          docLabel: extracted.label,
          docValue: extracted.value,
          fieldId: extracted.targetFieldId,
          fieldName: extracted.targetFieldName || extracted.label,
          isConfirmed: !!currentAnswers[extracted.targetFieldId]
        });
      }
    });
  });

  const [confirmedMap, setConfirmedMap] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    mappings.forEach(m => {
      initial[m.fieldId] = true; // by default mark confirmed if value exists
    });
    return initial;
  });

  const handleConfirmSingle = (fieldId: string, val: string) => {
    updateAnswer(fieldId, val);
    setConfirmedMap(prev => ({ ...prev, [fieldId]: true }));
    showToast(`Confirmed mapping for ${fieldId}`);
  };

  const handleConfirmAll = () => {
    mappings.forEach(m => {
      updateAnswer(m.fieldId, m.docValue);
    });
    const allConfirmed: Record<string, boolean> = {};
    mappings.forEach(m => { allConfirmed[m.fieldId] = true; });
    setConfirmedMap(allConfirmed);
    showToast('All field mappings confirmed.');
  };

  const handleProceedToValidation = () => {
    navigateTo('validation');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 high-contrast:bg-black high-contrast:text-white">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-8 flex flex-col justify-center">
        
        {/* Step Indicator */}
        <div className="mb-6 flex items-center gap-3">
          <span className="px-4 py-1.5 rounded-full bg-blue-100 text-blue-800 font-black text-base high-contrast:bg-yellow-400 high-contrast:text-black">
            Step 5
          </span>
          <span className="text-xl sm:text-2xl font-bold text-slate-700 high-contrast:text-white">
            {t('mappingTitle')}
          </span>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border-4 border-slate-300 high-contrast:bg-black high-contrast:border-yellow-400 card-theme">
          
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3 high-contrast:bg-yellow-400 high-contrast:text-black">
              <GitMerge className="w-10 h-10" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 high-contrast:text-yellow-400">
              {t('mappingTitle')}
            </h1>
            <p className="text-xl sm:text-2xl font-medium text-slate-600 high-contrast:text-white mt-1">
              {t('mappingDesc')}
            </p>
          </div>

          {/* Quick Confirm All */}
          {mappings.length > 1 && (
            <div className="mb-6 flex justify-end">
              <button
                type="button"
                onClick={handleConfirmAll}
                className="px-5 py-2.5 rounded-xl border-2 border-emerald-600 bg-emerald-50 text-emerald-900 hover:bg-emerald-100 font-bold text-base flex items-center gap-2 high-contrast:bg-black high-contrast:text-yellow-400 high-contrast:border-yellow-400"
              >
                <CheckCheck className="w-5 h-5" />
                <span>Confirm All Matches</span>
              </button>
            </div>
          )}

          {/* Mappings List */}
          <div className="space-y-6 mb-8">
            {mappings.length === 0 ? (
              <div className="p-8 text-center text-xl font-bold text-slate-600 high-contrast:text-white bg-slate-50 rounded-2xl border-2 border-slate-200">
                No automatic mappings detected yet. You can complete the form directly.
              </div>
            ) : (
              mappings.map((item, idx) => {
                const isConfirmed = confirmedMap[item.fieldId];

                return (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl border-3 border-blue-200 bg-blue-50/40 high-contrast:bg-zinc-950 high-contrast:border-white flex flex-col md:flex-row items-center justify-between gap-6"
                  >
                    {/* Left: Document Info */}
                    <div className="flex-1 w-full bg-white p-5 rounded-2xl border-2 border-slate-200 high-contrast:bg-black high-contrast:border-zinc-700">
                      <span className="text-xs font-black uppercase text-blue-700 tracking-wider high-contrast:text-yellow-400">
                        Document Information:
                      </span>
                      <div className="text-sm font-bold text-slate-500 high-contrast:text-zinc-400 mt-0.5">
                        {item.docLabel}
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-slate-900 high-contrast:text-white mt-1">
                        {item.docValue}
                      </div>
                    </div>

                    {/* Center Arrow */}
                    <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white shadow-md high-contrast:bg-yellow-400 high-contrast:text-black">
                      <ArrowRight className="w-7 h-7 hidden md:block" />
                      <ArrowDown className="w-7 h-7 md:hidden" />
                    </div>

                    {/* Right: Form Field */}
                    <div className="flex-1 w-full bg-white p-5 rounded-2xl border-2 border-slate-200 high-contrast:bg-black high-contrast:border-zinc-700">
                      <span className="text-xs font-black uppercase text-emerald-700 tracking-wider high-contrast:text-yellow-400">
                        Form Question / Field:
                      </span>
                      <div className="text-sm font-bold text-slate-500 high-contrast:text-zinc-400 mt-0.5">
                        {item.fieldName}
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-slate-900 high-contrast:text-white mt-1">
                        {currentAnswers[item.fieldId] || item.docValue}
                      </div>
                    </div>

                    {/* Confirm Button */}
                    <div className="flex-shrink-0">
                      {isConfirmed ? (
                        <div className="px-5 py-3 rounded-2xl bg-emerald-100 text-emerald-900 border-2 border-emerald-500 font-black text-lg flex items-center gap-2 high-contrast:bg-yellow-400 high-contrast:text-black">
                          <Check className="w-6 h-6" />
                          <span>{t('confirmed')}</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleConfirmSingle(item.fieldId, item.docValue)}
                          className="px-6 py-3 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-black text-lg shadow-md transition-all high-contrast:bg-yellow-400 high-contrast:text-black"
                        >
                          {t('confirmMatch')}
                        </button>
                      )}
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
              onClick={handleProceedToValidation}
              variant="primary"
              size="large"
              icon={<ArrowRight className="w-7 h-7" />}
              className="w-full sm:w-auto"
            >
              PROCEED TO VALIDATION
            </LargeButton>
          </div>

        </div>
      </main>
    </div>
  );
};
