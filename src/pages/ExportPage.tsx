import React from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { LargeButton } from '../components/LargeButton';
import { 
  CheckCircle2, 
  Printer, 
  Download, 
  Save, 
  Home, 
  AlertCircle, 
  FileText,
  ShieldAlert
} from 'lucide-react';

export const ExportPage: React.FC = () => {
  const { activeApp, navigateTo, saveCurrentProgress, showToast, t } = useApp();

  const schema = activeApp?.formSchema;
  const answers = activeApp?.answers || {};
  const uploadedDocs = activeApp?.uploadedDocuments || [];

  const handlePrint = () => {
    window.print();
  };

  const handleSaveApp = () => {
    saveCurrentProgress();
    showToast('Application successfully saved to your records.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 high-contrast:bg-black high-contrast:text-white">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-8 flex flex-col justify-center">
        
        {/* Banner */}
        <div className="text-center mb-8 no-print">
          <div className="mx-auto w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3 high-contrast:bg-yellow-400 high-contrast:text-black">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 high-contrast:text-yellow-400">
            {t('formReadyTitle')}
          </h1>
          <p className="text-xl sm:text-2xl font-medium text-slate-600 high-contrast:text-white mt-1">
            {t('formReadyDesc')}
          </p>
        </div>

        {/* Prototype Disclaimer Banner */}
        <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 flex items-start gap-3.5 high-contrast:bg-zinc-950 high-contrast:border-yellow-400 high-contrast:text-yellow-400 no-print">
          <ShieldAlert className="w-7 h-7 flex-shrink-0 text-amber-600 high-contrast:text-yellow-400 mt-0.5" />
          <div className="text-base sm:text-lg font-bold">
            <span className="uppercase tracking-wide font-black block sm:inline mr-2">Notice:</span>
            {t('prototypeDisclaimer')}
          </div>
        </div>

        {/* Action Controls Bar */}
        <div className="bg-white p-6 rounded-3xl border-3 border-slate-300 shadow-md mb-8 flex flex-wrap items-center justify-between gap-4 high-contrast:bg-black high-contrast:border-yellow-400 no-print">
          <div className="flex flex-wrap items-center gap-3">
            <LargeButton
              onClick={handlePrint}
              variant="primary"
              size="normal"
              icon={<Printer className="w-6 h-6" />}
            >
              {t('printForm')} / {t('exportPdf')}
            </LargeButton>

            <button
              type="button"
              onClick={handleSaveApp}
              className="px-5 py-3 rounded-xl border-2 border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-lg flex items-center gap-2 high-contrast:bg-black high-contrast:text-white high-contrast:border-white"
            >
              <Save className="w-5 h-5 text-blue-600 high-contrast:text-yellow-400" />
              <span>{t('saveApplication')}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => navigateTo('dashboard')}
            className="px-5 py-3 rounded-xl border-2 border-blue-600 bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold text-lg flex items-center gap-2 high-contrast:bg-black high-contrast:text-yellow-400 high-contrast:border-yellow-400"
          >
            <Home className="w-5 h-5" />
            <span>{t('backToDashboard')}</span>
          </button>
        </div>

        {/* Form Document Print Preview Container */}
        <div className="print-container bg-white rounded-3xl p-8 sm:p-12 shadow-xl border-4 border-slate-400 high-contrast:bg-black high-contrast:border-white text-slate-900 high-contrast:text-white">
          
          {/* Official Form Header */}
          <div className="border-b-4 border-slate-900 pb-6 mb-8 text-center high-contrast:border-white">
            <div className="text-sm sm:text-base font-black tracking-widest text-slate-600 uppercase high-contrast:text-zinc-400">
              [ PROTOTYPE EXPORT — DEMO SAMPLE FORM ]
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 high-contrast:text-yellow-400 mt-1">
              {schema?.formName}
            </h2>
            <p className="text-lg font-semibold text-slate-700 high-contrast:text-white mt-1">
              {schema?.purpose}
            </p>
            <div className="text-sm font-bold text-slate-500 high-contrast:text-zinc-400 mt-2">
              Generated on: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
            </div>
          </div>

          {/* Form Sections and Field Entries */}
          <div className="space-y-8">
            {schema?.sections.map((section, sIdx) => (
              <div key={section.id} className="space-y-4">
                <div className="bg-slate-100 p-3 rounded-xl border-l-4 border-blue-700 high-contrast:bg-zinc-900 high-contrast:border-yellow-400">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 high-contrast:text-yellow-400">
                    Section {sIdx + 1}: {section.name}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2">
                  {section.fields.map((field) => {
                    const val = answers[field.id];
                    return (
                      <div key={field.id} className="p-3 border-b-2 border-slate-200 high-contrast:border-zinc-800">
                        <span className="text-sm font-bold text-slate-500 uppercase tracking-wide high-contrast:text-zinc-400 block">
                          {field.name}
                        </span>
                        <span className="text-xl font-black text-slate-900 high-contrast:text-white block mt-0.5">
                          {val !== undefined && val !== null && String(val).trim() !== '' ? String(val) : '—'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Attached Proofs Table */}
            <div className="pt-4 space-y-4">
              <div className="bg-slate-100 p-3 rounded-xl border-l-4 border-emerald-700 high-contrast:bg-zinc-900 high-contrast:border-yellow-400">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 high-contrast:text-yellow-400">
                  Attached Supporting Documents
                </h3>
              </div>

              <div className="px-2 space-y-2">
                {schema?.requiredDocuments.map((doc) => {
                  const upl = uploadedDocs.find(u => u.documentId === doc.id);
                  return (
                    <div key={doc.id} className="flex items-center justify-between text-lg font-bold border-b border-slate-200 pb-2 high-contrast:border-zinc-800">
                      <span className="text-slate-700 high-contrast:text-zinc-300">{doc.name}</span>
                      <span className="text-emerald-700 high-contrast:text-yellow-400 font-black">
                        {upl ? `Attached (${upl.fileName})` : 'Sample Verified'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Declaration & Signature Box */}
            <div className="mt-12 pt-8 border-t-4 border-dashed border-slate-300 high-contrast:border-zinc-700">
              <p className="text-sm sm:text-base font-semibold text-slate-600 high-contrast:text-zinc-400 leading-relaxed mb-8">
                I hereby declare that the particulars furnished in this application are true and correct to the best of my knowledge and belief.
              </p>

              <div className="flex justify-between items-end">
                <div>
                  <div className="text-base font-bold text-slate-600 high-contrast:text-zinc-400">Date: {new Date().toLocaleDateString()}</div>
                  <div className="text-base font-bold text-slate-600 high-contrast:text-zinc-400">Place: Coimbatore</div>
                </div>

                <div className="text-center">
                  <div className="w-48 border-b-2 border-slate-900 high-contrast:border-white mb-2"></div>
                  <span className="text-base font-bold text-slate-700 high-contrast:text-white">
                    Signature / Thumb Impression
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
};
