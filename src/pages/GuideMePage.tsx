import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { LargeButton } from '../components/LargeButton';
import { VoiceControls } from '../components/VoiceControls';
import { FormField } from '../types';
import { validationService } from '../services/validationService';
import { 
  ArrowLeft, 
  ArrowRight, 
  HelpCircle, 
  Check, 
  RotateCcw, 
  Sparkles,
  AlertCircle,
  ThumbsUp
} from 'lucide-react';

export const GuideMePage: React.FC = () => {
  const { 
    activeApp, 
    updateAnswer, 
    openExplain, 
    navigateTo, 
    goBack, 
    showToast,
    saveCurrentProgress,
    t 
  } = useApp();

  const schema = activeApp?.formSchema;
  const answers = activeApp?.answers || {};

  // Compute active visible fields dynamically based on conditional logic
  const allSections = schema?.sections || [];
  const activeFields: FormField[] = useMemo(() => {
    const list: FormField[] = [];
    allSections.forEach(sec => {
      sec.fields.forEach(f => {
        if (validationService.isFieldActive(f, answers)) {
          list.push(f);
        }
      });
    });
    return list;
  }, [schema, answers]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentVal, setCurrentVal] = useState<string>('');
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [isConfirmingAnswer, setIsConfirmingAnswer] = useState(false);

  const currentField: FormField | undefined = activeFields[currentIndex];

  // Sync state whenever current field changes
  useEffect(() => {
    if (currentField) {
      const existing = answers[currentField.id];
      setCurrentVal(existing !== undefined && existing !== null ? String(existing) : '');
      setFieldError(null);
      setIsConfirmingAnswer(false);
    }
  }, [currentIndex, currentField]);

  if (!schema || !currentField) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 high-contrast:bg-black high-contrast:text-white">
        <Header />
        <main className="flex-1 flex items-center justify-center p-8 text-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">No active questions found.</h2>
            <LargeButton onClick={() => navigateTo('validation')} variant="primary" size="large">
              Proceed to Validation
            </LargeButton>
          </div>
        </main>
      </div>
    );
  }

  const handleNextClick = () => {
    setFieldError(null);

    // Validate current field
    const validation = validationService.validateField(currentField, currentVal, answers);
    if (!validation.isValid) {
      setFieldError(validation.message || 'Please answer this question before continuing.');
      return;
    }

    // Move to Answer Confirmation step
    setIsConfirmingAnswer(true);
  };

  const handleConfirmYes = () => {
    // Save answer
    updateAnswer(currentField.id, currentVal);
    saveCurrentProgress();
    setIsConfirmingAnswer(false);

    // Check if there are more questions
    if (currentIndex + 1 < activeFields.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Reached end of questions!
      showToast('All questions answered!');
      navigateTo('validation');
    }
  };

  const handleConfirmChange = () => {
    setIsConfirmingAnswer(false);
  };

  const handlePrevClick = () => {
    setIsConfirmingAnswer(false);
    setFieldError(null);
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      goBack();
    }
  };

  const handleVoiceAnswer = (transcript: string) => {
    let clean = transcript.trim();
    
    // For radio/yes-no questions, handle spoken answers smartly
    if (currentField.type === 'radio' && currentField.options) {
      const lower = clean.toLowerCase();
      if (lower.includes('yes') || lower.includes('ஆம்') || lower.includes('हाँ')) {
        clean = 'Yes';
      } else if (lower.includes('no') || lower.includes('இல்லை') || lower.includes('नहीं')) {
        clean = 'No';
      }
    }

    setCurrentVal(clean);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 high-contrast:bg-black high-contrast:text-white">
      <Header />

      <main className="flex-1 max-w-3xl w-full mx-auto p-4 sm:p-8 flex flex-col justify-center">
        
        {/* Dynamic Step Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-5 py-2 rounded-2xl bg-blue-700 text-white font-black text-lg sm:text-xl shadow-sm high-contrast:bg-yellow-400 high-contrast:text-black">
              {t('stepXofY')} {currentIndex + 1} {t('of')} {activeFields.length}
            </span>
          </div>

          {currentField.explanationKey && (
            <button
              type="button"
              onClick={() => openExplain(currentField.explanationKey!)}
              className="px-4 py-2 rounded-xl border-2 border-blue-400 bg-blue-50 text-blue-800 hover:bg-blue-100 font-bold text-base flex items-center gap-1.5 high-contrast:bg-black high-contrast:text-yellow-400 high-contrast:border-yellow-400"
            >
              <HelpCircle className="w-5 h-5" />
              <span>{t('explainThis')}</span>
            </button>
          )}
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border-4 border-slate-300 high-contrast:bg-black high-contrast:border-yellow-400 card-theme">
          
          {isConfirmingAnswer ? (
            /* Answer Confirmation State */
            <div className="py-6 text-center space-y-6">
              <div className="mx-auto w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center high-contrast:bg-yellow-400 high-contrast:text-black">
                <ThumbsUp className="w-12 h-12" />
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 high-contrast:text-yellow-400 mb-2">
                  {t('isCorrectConfirm')}
                </h2>
                <div className="text-3xl sm:text-4xl font-black text-blue-700 high-contrast:text-white p-5 rounded-2xl bg-blue-50 border-2 border-blue-200 high-contrast:bg-zinc-950 high-contrast:border-yellow-400 max-w-lg mx-auto my-4">
                  {currentVal || <span className="italic text-slate-400">(Blank)</span>}
                </div>
                <p className="text-2xl font-bold text-slate-700 high-contrast:text-white">
                  {t('isThatCorrect')}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-md mx-auto">
                <LargeButton
                  onClick={handleConfirmYes}
                  variant="primary"
                  size="huge"
                  icon={<Check className="w-8 h-8" />}
                  className="flex-1"
                >
                  {t('yes')}
                </LargeButton>

                <LargeButton
                  onClick={handleConfirmChange}
                  variant="secondary"
                  size="huge"
                  icon={<RotateCcw className="w-7 h-7" />}
                  className="flex-1"
                >
                  {t('change')}
                </LargeButton>
              </div>
            </div>
          ) : (
            /* Active Question State */
            <div className="space-y-6">
              
              {/* Question Label */}
              <div>
                <label 
                  htmlFor={`field-${currentField.id}`}
                  className="block text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 high-contrast:text-yellow-400 leading-tight mb-3"
                >
                  {currentField.label}
                </label>

                {currentField.description && (
                  <p className="text-lg sm:text-xl font-medium text-slate-600 high-contrast:text-zinc-300">
                    {currentField.description}
                  </p>
                )}
              </div>

              {/* Friendly Validation Error */}
              {fieldError && (
                <div 
                  role="alert" 
                  className="p-4 rounded-2xl bg-red-50 border-2 border-red-300 text-red-800 text-lg sm:text-xl font-bold flex items-start gap-3 high-contrast:bg-zinc-950 high-contrast:border-yellow-400 high-contrast:text-yellow-400"
                >
                  <AlertCircle className="w-7 h-7 flex-shrink-0 mt-0.5 text-red-600 high-contrast:text-yellow-400" />
                  <span>{fieldError}</span>
                </div>
              )}

              {/* Dynamic Input Control Based on Field Type */}
              <div className="pt-2">
                {currentField.type === 'radio' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentField.options?.map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setCurrentVal(opt)}
                        className={`p-6 rounded-2xl border-4 font-black text-2xl sm:text-3xl flex items-center justify-between transition-all ${
                          currentVal === opt
                            ? 'bg-blue-700 text-white border-blue-900 ring-4 ring-blue-300 high-contrast:bg-yellow-400 high-contrast:text-black high-contrast:border-white'
                            : 'bg-slate-50 text-slate-800 border-slate-300 hover:bg-slate-100 high-contrast:bg-black high-contrast:text-white high-contrast:border-white'
                        }`}
                      >
                        <span>{opt}</span>
                        {currentVal === opt && <Check className="w-8 h-8" />}
                      </button>
                    ))}
                  </div>
                ) : currentField.type === 'dropdown' ? (
                  <select
                    id={`field-${currentField.id}`}
                    value={currentVal}
                    onChange={(e) => setCurrentVal(e.target.value)}
                    className="w-full px-6 py-4 text-xl sm:text-2xl rounded-2xl border-3 border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-200 outline-none transition-all input-theme text-slate-900 high-contrast:bg-black high-contrast:text-white high-contrast:border-yellow-400 bg-white"
                  >
                    <option value="">-- Please select an option --</option>
                    {currentField.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : currentField.type === 'textarea' ? (
                  <textarea
                    id={`field-${currentField.id}`}
                    rows={4}
                    value={currentVal}
                    onChange={(e) => setCurrentVal(e.target.value)}
                    placeholder={currentField.placeholder || 'Type your answer here...'}
                    className="w-full px-6 py-4 text-xl sm:text-2xl rounded-2xl border-3 border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-200 outline-none transition-all input-theme text-slate-900 high-contrast:bg-black high-contrast:text-white high-contrast:border-yellow-400 resize-none"
                  />
                ) : (
                  <input
                    id={`field-${currentField.id}`}
                    type={currentField.type}
                    value={currentVal}
                    onChange={(e) => setCurrentVal(e.target.value)}
                    placeholder={currentField.placeholder || 'Type your answer here...'}
                    className="w-full px-6 py-4 text-xl sm:text-2xl rounded-2xl border-3 border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-200 outline-none transition-all input-theme text-slate-900 high-contrast:bg-black high-contrast:text-white high-contrast:border-yellow-400"
                  />
                )}
              </div>

              {/* Voice Assistance: Speak Answer & Hear Question */}
              <div className="pt-2">
                <VoiceControls
                  textToSpeak={currentField.label}
                  onVoiceInput={handleVoiceAnswer}
                />
              </div>

              {/* Navigation Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t-2 border-slate-200 high-contrast:border-zinc-700">
                <button
                  type="button"
                  onClick={handlePrevClick}
                  className="px-6 py-3.5 rounded-xl border-2 border-slate-300 font-bold text-lg sm:text-xl text-slate-700 hover:bg-slate-100 flex items-center gap-2 high-contrast:bg-black high-contrast:text-white high-contrast:border-white"
                >
                  <ArrowLeft className="w-6 h-6" />
                  <span>{t('back')}</span>
                </button>

                <LargeButton
                  onClick={handleNextClick}
                  variant="primary"
                  size="large"
                  icon={<ArrowRight className="w-7 h-7" />}
                  className="w-full sm:w-auto"
                >
                  {t('next')}
                </LargeButton>
              </div>

            </div>
          )}

        </div>
      </main>
    </div>
  );
};
