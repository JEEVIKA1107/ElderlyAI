import React from 'react';
import { useApp } from '../context/AppContext';
import { LargeButton } from '../components/LargeButton';
import { Header } from '../components/Header';
import { UserCheck, ArrowLeft, CheckCircle2, Shield } from 'lucide-react';

export const GuestPage: React.FC = () => {
  const { continueAsGuest, goBack, t } = useApp();

  const perks = [
    t('guestPerk1'),
    t('guestPerk2'),
    t('guestPerk3'),
    t('guestPerk4'),
    t('guestPerk5'),
    t('guestPerk6')
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 high-contrast:bg-black high-contrast:text-white">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="max-w-2xl w-full bg-white rounded-3xl p-6 sm:p-10 shadow-xl border-4 border-slate-300 high-contrast:bg-black high-contrast:border-yellow-400 card-theme">
          
          {/* Header */}
          <div className="text-center mb-6">
            <div className="mx-auto w-20 h-20 rounded-3xl bg-blue-100 text-blue-800 flex items-center justify-center mb-4 high-contrast:bg-yellow-400 high-contrast:text-black">
              <UserCheck className="w-12 h-12" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight high-contrast:text-yellow-400">
              {t('guestTitle')}
            </h1>
            <p className="text-xl sm:text-2xl font-medium text-slate-700 high-contrast:text-white mt-2">
              {t('guestDesc')}
            </p>
          </div>

          {/* Perks checklist */}
          <div className="bg-blue-50/70 rounded-2xl p-6 mb-8 border-2 border-blue-200 high-contrast:bg-zinc-950 high-contrast:border-white">
            <h2 className="text-xl sm:text-2xl font-black text-blue-950 high-contrast:text-yellow-400 mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-700 high-contrast:text-yellow-400" />
              <span>Full Access Included:</span>
            </h2>

            <ul className="space-y-3.5">
              {perks.map((perk, idx) => (
                <li key={idx} className="flex items-center gap-3 text-lg sm:text-xl font-bold text-slate-800 high-contrast:text-white">
                  <CheckCircle2 className="w-7 h-7 text-emerald-600 high-contrast:text-yellow-400 flex-shrink-0" />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4">
            <LargeButton
              onClick={continueAsGuest}
              variant="primary"
              size="huge"
              icon={<UserCheck className="w-8 h-8" />}
            >
              {t('continueAsGuest')}
            </LargeButton>

            <div className="pt-2 flex justify-start">
              <button
                type="button"
                onClick={goBack}
                className="px-6 py-3 rounded-xl border-2 border-slate-300 font-bold text-lg sm:text-xl text-slate-700 hover:bg-slate-100 flex items-center gap-2 high-contrast:bg-black high-contrast:text-white high-contrast:border-white"
              >
                <ArrowLeft className="w-6 h-6" />
                <span>{t('back')}</span>
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};
