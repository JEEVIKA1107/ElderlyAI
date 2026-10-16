import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { LargeButton } from '../components/LargeButton';
import { ocrService } from '../services/ocrService';
import { OCRResult } from '../types';
import { 
  Scan, 
  Check, 
  Edit3, 
  X, 
  AlertTriangle, 
  ArrowRight, 
  ArrowLeft, 
  FileCheck2,
  Sparkles
} from 'lucide-react';

export const OCRPage: React.FC = () => {
  const { 
    activeApp, 
    saveOCRResult, 
    navigateTo, 
    goBack, 
    showToast,
    t,
    readAloudText
  } = useApp();

  const [reading, setReading] = useState(true);
  const [readingStep, setReadingStep] = useState('Reading your document...');
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const schema = activeApp?.formSchema;
  const docs = schema?.requiredDocuments || [];
  const uploadedDocs = activeApp?.uploadedDocuments || [];
  
  // Use first document for OCR demonstration
  const targetDoc = docs[0];
  const uploadedTargetDoc = uploadedDocs.find(u => u.documentId === targetDoc?.id);
  const existingOcr = activeApp?.ocrResults[targetDoc?.id || ''];

  const [currentOcr, setCurrentOcr] = useState<OCRResult | null>(existingOcr || null);

  useEffect(() => {
    let isMounted = true;
    const runOcr = async () => {
      if (!schema || !targetDoc) return;
      if (existingOcr) {
        setCurrentOcr(existingOcr);
        setReading(false);
        return;
      }

      setReading(true);
      const res = await ocrService.readDocument(
        targetDoc.id,
        schema,
        uploadedTargetDoc?.fileName || targetDoc.sampleFileName || 'Certificate.pdf',
        (stepText) => {
          if (isMounted) setReadingStep(stepText);
        }
      );

      if (isMounted) {
        setCurrentOcr(res);
        saveOCRResult(targetDoc.id, res);
        setReading(false);
      }
    };

    runOcr();

    return () => {
      isMounted = false;
    };
  }, [schema, targetDoc]);

  const handleConfirmField = (key: string) => {
    if (!currentOcr || !targetDoc) return;
    const updatedFields = currentOcr.extractedFields.map(f => 
      f.key === key ? { ...f, confirmed: true } : f
    );
    const updated = { ...currentOcr, extractedFields: updatedFields };
    setCurrentOcr(updated);
    saveOCRResult(targetDoc.id, updated);
    showToast(`Accepted: ${key}`);
  };

  const handleStartEdit = (key: string, val: string) => {
    setEditingKey(key);
    setEditValue(val);
  };

  const handleSaveEdit = (key: string) => {
    if (!currentOcr || !targetDoc) return;
    const updatedFields = currentOcr.extractedFields.map(f => 
      f.key === key ? { ...f, value: editValue, confirmed: true } : f
    );
    const updated = { ...currentOcr, extractedFields: updatedFields };
    setCurrentOcr(updated);
    saveOCRResult(targetDoc.id, updated);
    setEditingKey(null);
    showToast(`Updated: ${key}`);
  };

  const handleRejectField = (key: string) => {
    if (!currentOcr || !targetDoc) return;
    const updatedFields = currentOcr.extractedFields.map(f => 
      f.key === key ? { ...f, value: '', confirmed: false } : f
    );
    const updated = { ...currentOcr, extractedFields: updatedFields };
    setCurrentOcr(updated);
    saveOCRResult(targetDoc.id, updated);
    showToast(`Rejected: ${key}`);
  };

  const handleProceedToMapping = () => {
    navigateTo('mapping');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 high-contrast:bg-black high-contrast:text-white">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-8 flex flex-col justify-center">
        
        {/* Step Indicator */}
        <div className="mb-6 flex items-center gap-3">
          <span className="px-4 py-1.5 rounded-full bg-blue-100 text-blue-800 font-black text-base high-contrast:bg-yellow-400 high-contrast:text-black">
            Step 4
          </span>
          <span className="text-xl sm:text-2xl font-bold text-slate-700 high-contrast:text-white">
            {t('ocrTitle')}
          </span>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border-4 border-slate-300 high-contrast:bg-black high-contrast:border-yellow-400 card-theme">
          
          {reading ? (
            /* OCR Reading Loading State */
            <div className="py-16 text-center space-y-6">
              <div className="mx-auto w-24 h-24 rounded-3xl bg-blue-100 text-blue-700 flex items-center justify-center animate-pulse high-contrast:bg-yellow-400 high-contrast:text-black">
                <Scan className="w-14 h-14" />
              </div>

              <div>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 high-contrast:text-yellow-400 mb-2">
                  {t('readingDoc')}
                </h1>
                <p className="text-xl sm:text-2xl font-medium text-slate-600 high-contrast:text-white">
                  {readingStep}
                </p>
              </div>
            </div>
          ) : (
            /* OCR Results Table & Verification */
            <div>
              
              <div className="text-center mb-8">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3 high-contrast:bg-yellow-400 high-contrast:text-black">
                  <FileCheck2 className="w-10 h-10" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 high-contrast:text-yellow-400">
                  DOCUMENT DETECTED
                </h1>
                <p className="text-2xl sm:text-3xl font-bold text-blue-700 high-contrast:text-white mt-1">
                  {currentOcr?.documentName}
                </p>
              </div>

              {/* Confidence Alert */}
              {currentOcr?.confidence !== 'high' && (
                <div className="mb-6 p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-900 text-lg sm:text-xl font-bold flex items-start gap-3 high-contrast:bg-zinc-950 high-contrast:border-yellow-400 high-contrast:text-yellow-400">
                  <AlertTriangle className="w-7 h-7 flex-shrink-0 mt-0.5 text-amber-600 high-contrast:text-yellow-400" />
                  <span>{t('ocrWarning')}</span>
                </div>
              )}

              {/* Information Found List */}
              <div className="mb-8">
                <h2 className="text-xl sm:text-2xl font-black text-slate-800 high-contrast:text-yellow-400 mb-4">
                  {t('informationFound')}
                </h2>

                <div className="space-y-4">
                  {currentOcr?.extractedFields.map((field) => (
                    <div 
                      key={field.key}
                      className="p-5 sm:p-6 rounded-2xl border-3 border-slate-200 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4 high-contrast:bg-zinc-950 high-contrast:border-white"
                    >
                      {/* Left: Key & Value */}
                      <div className="flex-1">
                        <span className="text-sm sm:text-base font-black uppercase text-slate-500 high-contrast:text-zinc-400">
                          {field.label}
                        </span>

                        {editingKey === field.key ? (
                          <div className="mt-2 flex items-center gap-2">
                            <input
                              type="text"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="px-4 py-2 text-xl font-bold rounded-xl border-2 border-blue-600 bg-white high-contrast:bg-black high-contrast:text-white"
                            />
                            <button
                              type="button"
                              onClick={() => handleSaveEdit(field.key)}
                              className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-base"
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingKey(null)}
                              className="px-3 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-base"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="text-2xl sm:text-3xl font-black text-slate-900 high-contrast:text-white mt-1">
                            {field.value || <span className="text-red-500 italic">Rejected / Blank</span>}
                          </div>
                        )}

                        <div className="mt-2 flex items-center gap-3">
                          <span className={`text-xs sm:text-sm font-black px-3 py-1 rounded-full ${
                            field.confidence === 'high' 
                              ? 'bg-emerald-100 text-emerald-800 high-contrast:bg-yellow-400 high-contrast:text-black' 
                              : 'bg-amber-100 text-amber-800 high-contrast:bg-zinc-800 high-contrast:text-yellow-400'
                          }`}>
                            OCR Confidence: {field.confidence.toUpperCase()}
                          </span>

                          {field.confirmed && (
                            <span className="text-xs sm:text-sm font-bold text-emerald-700 high-contrast:text-yellow-400 flex items-center gap-1">
                              <Check className="w-4 h-4" /> Confirmed
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right: Actions [ACCEPT], [EDIT], [REJECT] */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          type="button"
                          onClick={() => handleConfirmField(field.key)}
                          className="px-4 py-2.5 rounded-xl border-2 border-emerald-600 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-base flex items-center gap-1.5 high-contrast:bg-black high-contrast:text-yellow-400 high-contrast:border-yellow-400"
                        >
                          <Check className="w-5 h-5" />
                          <span>{t('accept')}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleStartEdit(field.key, field.value)}
                          className="px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white hover:bg-slate-100 text-slate-800 font-bold text-base flex items-center gap-1.5 high-contrast:bg-black high-contrast:text-white high-contrast:border-white"
                        >
                          <Edit3 className="w-5 h-5" />
                          <span>{t('edit')}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleRejectField(field.key)}
                          className="px-4 py-2.5 rounded-xl border-2 border-red-300 bg-red-50 hover:bg-red-100 text-red-700 font-bold text-base flex items-center gap-1.5 high-contrast:bg-black high-contrast:text-red-400 high-contrast:border-red-400"
                        >
                          <X className="w-5 h-5" />
                          <span>{t('reject')}</span>
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation buttons */}
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
                  onClick={handleProceedToMapping}
                  variant="primary"
                  size="large"
                  icon={<ArrowRight className="w-7 h-7" />}
                  className="w-full sm:w-auto"
                >
                  CONTINUE TO FIELD MAPPING
                </LargeButton>
              </div>

            </div>
          )}

        </div>
      </main>
    </div>
  );
};
