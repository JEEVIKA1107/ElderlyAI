import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { LargeButton } from '../components/LargeButton';
import { seniorCitizenForm, educationAssistanceForm, smallBusinessForm } from '../data/demoForms';
import { FormSchema } from '../types';
import { UploadCloud, FileText, ArrowLeft, Check, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';

export const FormUploadPage: React.FC = () => {
  const { startNewApplication, navigateTo, goBack, activeApp, t } = useApp();

  const [selectedFile, setSelectedFile] = useState<{ name: string; size: number } | null>(null);
  const [selectedSchema, setSelectedSchema] = useState<FormSchema>(seniorCitizenForm);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentMode = activeApp?.mode || 'auto-fill';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile({
        name: file.name,
        size: file.size
      });
      // Pick matching demo schema or fallback to dynamic custom schema based on name
      if (file.name.toLowerCase().includes('education') || file.name.toLowerCase().includes('college')) {
        setSelectedSchema(educationAssistanceForm);
      } else if (file.name.toLowerCase().includes('business') || file.name.toLowerCase().includes('shop')) {
        setSelectedSchema(smallBusinessForm);
      } else {
        setSelectedSchema(seniorCitizenForm);
      }
    }
  };

  const handleSelectDemo = (schema: FormSchema) => {
    setSelectedSchema(schema);
    setSelectedFile({
      name: `${schema.formName.replace(/\s+/g, '_')}_Official_Form.pdf`,
      size: 245000
    });
  };

  const handleProceedToUnderstanding = () => {
    startNewApplication(selectedSchema, currentMode);
    navigateTo('understanding');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 high-contrast:bg-black high-contrast:text-white">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-8 flex flex-col justify-center">
        
        {/* Step Indicator */}
        <div className="mb-6 flex items-center gap-3">
          <span className="px-4 py-1.5 rounded-full bg-blue-100 text-blue-800 font-black text-base high-contrast:bg-yellow-400 high-contrast:text-black">
            Step 1
          </span>
          <span className="text-xl sm:text-2xl font-bold text-slate-700 high-contrast:text-white">
            {t('uploadTitle')}
          </span>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border-4 border-slate-300 high-contrast:bg-black high-contrast:border-yellow-400 card-theme">
          
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 high-contrast:text-yellow-400 mb-3 text-center">
            {t('uploadTitle')}
          </h1>

          <p className="text-xl sm:text-2xl font-medium text-slate-700 high-contrast:text-white mb-8 text-center max-w-2xl mx-auto">
            {t('uploadInstruction')}
          </p>

          {/* Large Upload Box */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer border-4 border-dashed border-blue-400 hover:border-blue-600 bg-blue-50/50 hover:bg-blue-50 rounded-3xl p-8 sm:p-12 text-center transition-all flex flex-col items-center justify-center gap-4 mb-8 high-contrast:bg-zinc-950 high-contrast:border-yellow-400"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
          >
            <div className="w-20 h-20 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center high-contrast:bg-yellow-400 high-contrast:text-black">
              <UploadCloud className="w-12 h-12" />
            </div>

            <div>
              <p className="text-2xl sm:text-3xl font-black text-slate-900 high-contrast:text-yellow-400 mb-1">
                📄 {selectedFile ? selectedFile.name : 'Choose a PDF or image of your form'}
              </p>
              <p className="text-lg sm:text-xl font-semibold text-slate-600 high-contrast:text-white">
                {t('supportedFormats')}
              </p>
            </div>

            <LargeButton
              type="button"
              variant="primary"
              size="normal"
              className="mt-2"
            >
              {t('chooseFile')}
            </LargeButton>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Demo Forms Quick Selectors (Proving Dynamic Schemas) */}
          <div className="pt-2 mb-8">
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 high-contrast:text-yellow-400 mb-4 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-amber-500" />
              <span>{t('chooseFromDemo')}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Demo 1: Senior Citizen */}
              <button
                type="button"
                onClick={() => handleSelectDemo(seniorCitizenForm)}
                className={`p-4 rounded-2xl border-3 text-left transition-all flex flex-col justify-between ${
                  selectedSchema.id === seniorCitizenForm.id
                    ? 'border-blue-700 bg-blue-50 ring-4 ring-blue-200 high-contrast:bg-zinc-900 high-contrast:border-yellow-400'
                    : 'border-slate-300 hover:border-slate-400 bg-white high-contrast:bg-black high-contrast:border-white'
                }`}
              >
                <div>
                  <span className="text-xs font-black uppercase text-blue-700 high-contrast:text-yellow-400">Sample A</span>
                  <h3 className="text-lg font-black text-slate-900 high-contrast:text-white mt-1">
                    Senior Citizen Assistance
                  </h3>
                  <p className="text-sm font-medium text-slate-600 high-contrast:text-zinc-300 mt-1">
                    Welfare & Healthcare Application
                  </p>
                </div>
                {selectedSchema.id === seniorCitizenForm.id && (
                  <span className="mt-3 text-sm font-black text-blue-700 flex items-center gap-1 high-contrast:text-yellow-400">
                    <Check className="w-4 h-4" /> Selected
                  </span>
                )}
              </button>

              {/* Demo 2: Education Assistance */}
              <button
                type="button"
                onClick={() => handleSelectDemo(educationAssistanceForm)}
                className={`p-4 rounded-2xl border-3 text-left transition-all flex flex-col justify-between ${
                  selectedSchema.id === educationAssistanceForm.id
                    ? 'border-blue-700 bg-blue-50 ring-4 ring-blue-200 high-contrast:bg-zinc-900 high-contrast:border-yellow-400'
                    : 'border-slate-300 hover:border-slate-400 bg-white high-contrast:bg-black high-contrast:border-white'
                }`}
              >
                <div>
                  <span className="text-xs font-black uppercase text-emerald-700 high-contrast:text-yellow-400">Sample B</span>
                  <h3 className="text-lg font-black text-slate-900 high-contrast:text-white mt-1">
                    Higher Education Scholarship
                  </h3>
                  <p className="text-sm font-medium text-slate-600 high-contrast:text-zinc-300 mt-1">
                    College Tuition & Marksheet Grants
                  </p>
                </div>
                {selectedSchema.id === educationAssistanceForm.id && (
                  <span className="mt-3 text-sm font-black text-emerald-700 flex items-center gap-1 high-contrast:text-yellow-400">
                    <Check className="w-4 h-4" /> Selected
                  </span>
                )}
              </button>

              {/* Demo 3: Small Business */}
              <button
                type="button"
                onClick={() => handleSelectDemo(smallBusinessForm)}
                className={`p-4 rounded-2xl border-3 text-left transition-all flex flex-col justify-between ${
                  selectedSchema.id === smallBusinessForm.id
                    ? 'border-blue-700 bg-blue-50 ring-4 ring-blue-200 high-contrast:bg-zinc-900 high-contrast:border-yellow-400'
                    : 'border-slate-300 hover:border-slate-400 bg-white high-contrast:bg-black high-contrast:border-white'
                }`}
              >
                <div>
                  <span className="text-xs font-black uppercase text-amber-700 high-contrast:text-yellow-400">Sample C</span>
                  <h3 className="text-lg font-black text-slate-900 high-contrast:text-white mt-1">
                    Small Business Support
                  </h3>
                  <p className="text-sm font-medium text-slate-600 high-contrast:text-zinc-300 mt-1">
                    Enterprise Registration & Bank Grant
                  </p>
                </div>
                {selectedSchema.id === smallBusinessForm.id && (
                  <span className="mt-3 text-sm font-black text-amber-700 flex items-center gap-1 high-contrast:text-yellow-400">
                    <Check className="w-4 h-4" /> Selected
                  </span>
                )}
              </button>

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
              type="button"
              onClick={handleProceedToUnderstanding}
              variant="primary"
              size="large"
              icon={<ArrowRight className="w-7 h-7" />}
              className="w-full sm:w-auto"
            >
              {t('continue')}
            </LargeButton>
          </div>

        </div>
      </main>
    </div>
  );
};
