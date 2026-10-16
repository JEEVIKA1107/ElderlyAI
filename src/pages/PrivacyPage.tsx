import React from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { ShieldCheck, ArrowLeft, Lock, FileCheck2, AlertCircle } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  const { goBack, t } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 high-contrast:bg-black high-contrast:text-white">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-8 flex flex-col justify-center">
        
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3 high-contrast:bg-yellow-400 high-contrast:text-black">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 high-contrast:text-yellow-400">
            {t('privacy')} & Data Safety
          </h1>
          <p className="text-xl sm:text-2xl font-medium text-slate-600 high-contrast:text-white mt-1">
            How we protect your personal information and respect your privacy.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border-4 border-slate-300 high-contrast:bg-black high-contrast:border-yellow-400 card-theme space-y-8 mb-8">
          
          {/* Main Privacy Principles */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-blue-50 border-2 border-blue-200 high-contrast:bg-zinc-950 high-contrast:border-white">
              <div className="flex items-center gap-3 mb-2">
                <Lock className="w-7 h-7 text-blue-700 high-contrast:text-yellow-400" />
                <h2 className="text-2xl font-black text-blue-950 high-contrast:text-yellow-400">
                  Your Information Belongs to You
                </h2>
              </div>
              <p className="text-xl font-medium text-slate-800 high-contrast:text-white leading-relaxed">
                "Your information is used solely to help you complete your form."
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-50 border-2 border-emerald-200 high-contrast:bg-zinc-950 high-contrast:border-white">
              <div className="flex items-center gap-3 mb-2">
                <FileCheck2 className="w-7 h-7 text-emerald-700 high-contrast:text-yellow-400" />
                <h2 className="text-2xl font-black text-emerald-950 high-contrast:text-yellow-400">
                  Only Necessary Questions Asked
                </h2>
              </div>
              <p className="text-xl font-medium text-slate-800 high-contrast:text-white leading-relaxed">
                "The application should only request information needed for the specific form you have chosen."
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-amber-50 border-2 border-amber-200 high-contrast:bg-zinc-950 high-contrast:border-white">
              <div className="flex items-center gap-3 mb-2">
                <AlertCircle className="w-7 h-7 text-amber-700 high-contrast:text-yellow-400" />
                <h2 className="text-2xl font-black text-amber-950 high-contrast:text-yellow-400">
                  Document Safety Tip
                </h2>
              </div>
              <p className="text-xl font-medium text-slate-800 high-contrast:text-white leading-relaxed">
                "Do not upload documents that the form does not require. Keep your unneeded papers safe."
              </p>
            </div>
          </div>

          {/* Prototype Safety Guarantee */}
          <div className="border-t-2 border-slate-200 pt-6 high-contrast:border-zinc-700 text-lg sm:text-xl font-medium text-slate-700 high-contrast:text-zinc-300 space-y-2">
            <h3 className="text-xl font-black text-slate-900 high-contrast:text-white">
              Prototype Local Storage
            </h3>
            <p>
              This application operates locally in your web browser. All sample documents and mock data stay on your device and are never broadcast publicly.
            </p>
          </div>

        </div>

        {/* Back Action */}
        <div className="flex justify-start pt-4 border-t-2 border-slate-200 high-contrast:border-zinc-700">
          <button
            type="button"
            onClick={goBack}
            className="px-6 py-3.5 rounded-xl border-2 border-slate-300 font-bold text-lg sm:text-xl text-slate-700 hover:bg-slate-100 flex items-center gap-2 high-contrast:bg-black high-contrast:text-white high-contrast:border-white"
          >
            <ArrowLeft className="w-6 h-6" />
            <span>{t('back')}</span>
          </button>
        </div>

      </main>
    </div>
  );
};
