import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LargeButton } from '../components/LargeButton';
import { Header } from '../components/Header';
import { SpeechInput } from '../components/SpeechInput';
import { SpeakButton } from '../components/SpeakButton';
import { UserPlus, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { registerUser, navigateTo, goBack, t } = useApp();

  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [consentAgreed, setConsentAgreed] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage('Please enter your full legal name.');
      return;
    }

    if (!identifier.trim()) {
      setErrorMessage('Please enter your email address or phone number.');
      return;
    }

    if (password && confirmPassword && password !== confirmPassword) {
      setErrorMessage(t('passwordMismatch'));
      return;
    }

    if (!consentAgreed) {
      setErrorMessage(t('consentRequired'));
      return;
    }

    const res = registerUser(name, identifier, password || 'password123');
    if (res.success) {
      setIsSuccess(true);
    } else {
      setErrorMessage(res.errorMessage || 'Could not complete registration. Please try again.');
    }
  };

  // Success view
  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 high-contrast:bg-black high-contrast:text-white">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
          <div className="max-w-xl w-full bg-white rounded-3xl p-8 sm:p-12 shadow-xl border-4 border-emerald-400 high-contrast:bg-black high-contrast:border-yellow-400 text-center card-theme">
            
            <div className="mx-auto w-24 h-24 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6 high-contrast:bg-yellow-400 high-contrast:text-black">
              <CheckCircle2 className="w-16 h-16" />
            </div>

            <div className="flex items-center justify-center gap-3 mb-4">
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 high-contrast:text-yellow-400">
                {t('accountCreatedSuccess')}
              </h1>
              <SpeakButton text={`${t('accountCreatedSuccess')}. ${t('accountCreatedDesc')}`} size="md" />
            </div>

            <p className="text-xl sm:text-2xl font-medium text-slate-700 high-contrast:text-white mb-8 leading-relaxed">
              {t('accountCreatedDesc')}
            </p>

            <LargeButton
              onClick={() => navigateTo('dashboard')}
              variant="primary"
              size="huge"
            >
              {t('continue')}
            </LargeButton>

          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 high-contrast:bg-black high-contrast:text-white">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="max-w-xl w-full bg-white rounded-3xl p-6 sm:p-10 shadow-xl border-4 border-slate-300 high-contrast:bg-black high-contrast:border-yellow-400 card-theme">
          
          {/* Header */}
          <div className="text-center mb-6">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3 high-contrast:bg-yellow-400 high-contrast:text-black">
              <UserPlus className="w-9 h-9" />
            </div>

            <div className="flex items-center justify-center gap-3">
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight high-contrast:text-yellow-400">
                {t('createAccount')}
              </h1>
              <SpeakButton text={`${t('createAccount')}. ${t('createAccountTitle')}`} size="md" />
            </div>

            <p className="text-xl sm:text-2xl font-medium text-slate-600 high-contrast:text-white mt-1">
              {t('createAccountTitle')}
            </p>
          </div>

          {/* Friendly Error Notice */}
          {errorMessage && (
            <div 
              role="alert" 
              className="mb-6 p-4 rounded-2xl bg-red-50 border-2 border-red-300 text-red-800 text-lg sm:text-xl font-bold flex items-start gap-3 high-contrast:bg-zinc-950 high-contrast:border-yellow-400 high-contrast:text-yellow-400"
            >
              <AlertCircle className="w-7 h-7 flex-shrink-0 mt-0.5 text-red-600 high-contrast:text-yellow-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleRegisterSubmit} className="space-y-5">
            {/* Full Name SpeechInput */}
            <SpeechInput
              fieldId="reg-name"
              label={t('fullName')}
              value={name}
              onValueChange={setName}
              placeholder="e.g. Ramesh Kumar"
            />

            {/* Email or Phone SpeechInput */}
            <SpeechInput
              fieldId="reg-identifier"
              label={t('emailOrPhone')}
              value={identifier}
              onValueChange={setIdentifier}
              placeholder="e.g. ramesh@example.com or 9876543210"
            />

            {/* Password SpeechInput */}
            <SpeechInput
              fieldId="reg-password"
              type="password"
              label={t('createPassword')}
              value={password}
              onValueChange={setPassword}
              placeholder="Choose or speak your password"
            />

            {/* Confirm Password SpeechInput */}
            <SpeechInput
              fieldId="reg-confirm"
              type="password"
              label={t('confirmPassword')}
              value={confirmPassword}
              onValueChange={setConfirmPassword}
              placeholder="Re-enter or speak password"
            />

            {/* Consent Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-4 p-4 rounded-2xl border-2 border-slate-300 bg-slate-50 cursor-pointer hover:bg-slate-100 high-contrast:bg-zinc-950 high-contrast:border-yellow-400">
                <input
                  type="checkbox"
                  checked={consentAgreed}
                  onChange={(e) => setConsentAgreed(e.target.checked)}
                  className="w-7 h-7 rounded mt-1 text-emerald-600 focus:ring-emerald-500 flex-shrink-0 cursor-pointer"
                />
                <span className="text-lg sm:text-xl font-medium text-slate-800 high-contrast:text-white leading-relaxed">
                  {t('termsConsent')}
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <LargeButton
                type="submit"
                variant="accent"
                size="huge"
                icon={<UserPlus className="w-8 h-8" />}
              >
                {t('createAccount')}
              </LargeButton>
            </div>

            {/* Back Button */}
            <div className="flex items-center justify-between pt-4 border-t-2 border-slate-200 high-contrast:border-zinc-700">
              <button
                type="button"
                onClick={goBack}
                className="px-6 py-3 rounded-xl border-2 border-slate-300 font-bold text-lg sm:text-xl text-slate-700 hover:bg-slate-100 flex items-center gap-2 high-contrast:bg-black high-contrast:text-white high-contrast:border-white"
              >
                <ArrowLeft className="w-6 h-6" />
                <span>{t('back')}</span>
              </button>

              <button
                type="button"
                onClick={() => navigateTo('login')}
                className="text-lg sm:text-xl font-bold text-blue-700 hover:underline high-contrast:text-yellow-400"
              >
                {t('logIn')} →
              </button>
            </div>

          </form>

        </div>
      </main>
    </div>
  );
};
