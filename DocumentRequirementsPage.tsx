import React, { useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { LargeButton } from '../components/LargeButton';
import { RequiredDocument } from '../types';
import { 
  FileCheck, 
  HelpCircle, 
  Upload, 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  ArrowLeft, 
  FileText,
  Sparkles
} from 'lucide-react';

export const DocumentRequirementsPage: React.FC = () => {
  const { 
    activeApp, 
    addUploadedDocument, 
    openExplain, 
    navigateTo, 
    goBack, 
    showToast,
    t 
  } = useApp();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeDocIdRef = useRef<string | null>(null);

  const schema = activeApp?.formSchema;
  const docs = schema?.requiredDocuments || [];
  const uploadedDocs = activeApp?.uploadedDocuments || [];
  const mode = activeApp?.mode || 'auto-fill';

  const handleUseSample = (doc: RequiredDocument) => {
    addUploadedDocument({
      id: 'upl-' + Date.now(),
      documentId: doc.id,
      fileName: doc.sampleFileName || `${doc.name.replace(/\s+/g, '_')}_Official.pdf`,
      fileSize: 180000,
      uploadedAt: new Date().toISOString()
    });
    showToast(`Loaded sample for: ${doc.name}`);
  };

  const handleUploadClick = (docId: string) => {
    activeDocIdRef.current = docId;
    fileInputRef.current?.click();
  };

  const handleFilePicked = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && activeDocIdRef.current) {
      const file = e.target.files[0];
      addUploadedDocument({
        id: 'upl-' + Date.now(),
        documentId: activeDocIdRef.current,
        fileName: file.name,
        fileSize: file.size,
        uploadedAt: new Date().toISOString()
      });
      showToast(`Uploaded: ${file.name}`);
    }
  };

  const handleContinue = () => {
    if (mode === 'auto-fill') {
      navigateTo('ocr');
    } else {
      navigateTo('guide');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 high-contrast:bg-black high-contrast:text-white">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-8 flex flex-col justify-center">
        
        {/* Hidden file input for uploading individual documents */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFilePicked}
          className="hidden"
        />

        {/* Step Indicator */}
        <div className="mb-6 flex items-center gap-3">
          <span className="px-4 py-1.5 rounded-full bg-blue-100 text-blue-800 font-black text-base high-contrast:bg-yellow-400 high-contrast:text-black">
            Step 3
          </span>
          <span className="text-xl sm:text-2xl font-bold text-slate-700 high-contrast:text-white">
            {t('documentsRequired')}
          </span>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border-4 border-slate-300 high-contrast:bg-black high-contrast:border-yellow-400 card-theme">
          
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3 high-contrast:bg-yellow-400 high-contrast:text-black">
              <FileCheck className="w-9 h-9" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 high-contrast:text-yellow-400">
              {t('documentsRequired')}
            </h1>
            <p className="text-xl sm:text-2xl font-medium text-slate-600 high-contrast:text-white mt-1">
              {t('documentsDesc')}
            </p>
          </div>

          {/* List of Dynamic Documents */}
          <div className="space-y-6 mb-8">
            {docs.map((doc) => {
              const uploaded = uploadedDocs.find(u => u.documentId === doc.id);

              return (
                <div 
                  key={doc.id}
                  className={`p-6 sm:p-8 rounded-3xl border-3 transition-all ${
                    uploaded 
                      ? 'bg-emerald-50/70 border-emerald-400 high-contrast:bg-zinc-950 high-contrast:border-yellow-400' 
                      : 'bg-slate-50 border-slate-300 high-contrast:bg-black high-contrast:border-white'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                    
                    {/* Document Title & Status */}
                    <div className="flex items-start gap-3">
                      {uploaded ? (
                        <CheckCircle2 className="w-8 h-8 text-emerald-600 high-contrast:text-yellow-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="w-8 h-8 text-slate-400 high-contrast:text-zinc-500 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 high-contrast:text-white">
                          {doc.name}
                        </h2>
                        <span className={`inline-block text-sm font-black px-3 py-1 rounded-full mt-1 ${
                          uploaded 
                            ? 'bg-emerald-200 text-emerald-900 high-contrast:bg-yellow-400 high-contrast:text-black' 
                            : 'bg-amber-100 text-amber-900 high-contrast:bg-zinc-800 high-contrast:text-yellow-400'
                        }`}>
                          {uploaded ? `✓ ${t('uploadedStatus')} (${uploaded.fileName})` : `○ ${t('notUploadedStatus')}`}
                        </span>
                      </div>
                    </div>

                    {/* Explain Button */}
                    {doc.explanationKey && (
                      <button
                        type="button"
                        onClick={() => openExplain(doc.explanationKey!)}
                        className="px-4 py-2 rounded-xl border-2 border-blue-400 bg-blue-50 text-blue-800 hover:bg-blue-100 font-bold text-base flex items-center gap-1.5 high-contrast:bg-black high-contrast:text-yellow-400 high-contrast:border-yellow-400"
                      >
                        <HelpCircle className="w-5 h-5" />
                        <span>{t('explainBtn')}</span>
                      </button>
                    )}

                  </div>

                  {/* Why Needed Explanation */}
                  <div className="bg-white/80 p-4 rounded-2xl border border-slate-200 mb-5 high-contrast:bg-black high-contrast:border-zinc-700">
                    <span className="block text-sm font-black uppercase text-slate-500 high-contrast:text-zinc-400">
                      {t('whyNeeded')}
                    </span>
                    <p className="text-lg sm:text-xl font-medium text-slate-800 high-contrast:text-white mt-1">
                      {doc.reason}
                    </p>
                  </div>

                  {/* Upload Controls for this document */}
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleUploadClick(doc.id)}
                      className="px-5 py-3 rounded-xl border-2 border-blue-600 bg-blue-600 text-white hover:bg-blue-700 font-bold text-base sm:text-lg flex items-center gap-2 high-contrast:bg-yellow-400 high-contrast:text-black"
                    >
                      <Upload className="w-5 h-5" />
                      <span>{t('uploadDocBtn')}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleUseSample(doc)}
                      className="px-5 py-3 rounded-xl border-2 border-slate-300 bg-white hover:bg-slate-100 text-slate-800 font-bold text-base sm:text-lg flex items-center gap-2 high-contrast:bg-black high-contrast:text-white high-contrast:border-white"
                    >
                      <Sparkles className="w-5 h-5 text-amber-600" />
                      <span>{t('useSampleDocBtn')}</span>
                    </button>
                  </div>

                </div>
              );
            })}
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
              onClick={handleContinue}
              variant="primary"
              size="large"
              icon={<ArrowRight className="w-7 h-7" />}
              className="w-full sm:w-auto"
            >
              {mode === 'auto-fill' ? 'PROCEED TO OCR READING' : 'START GUIDE ME QUESTIONS'}
            </LargeButton>
          </div>

        </div>
      </main>
    </div>
  );
};
