import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LargeButton } from '../components/LargeButton';
import { Header } from '../components/Header';
import { SpeechInput } from '../components/SpeechInput';
import { SpeakButton } from '../components/SpeakButton';
import { LogIn, ArrowLeft, Eye, EyeOff, AlertCircle, Sparkles } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { loginUser, navigateTo, goBack, t } = useApp();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!identifier.trim()) {
      setErrorMessage('Please enter your email address or phone number.');
      return;
    }

    const res = loginUser(identifier, password);
    if (!res.success) {
      setErrorMessage(res.errorMessage || t('loginError'));
    }
  };

  const handleFillDemo = () => {
    setIdentifier('ramesh@example.com');
    setPassword('password123');
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 high-contrast:bg-black high-contrast:text-white">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="max-w-xl w-full bg-white rounded-3xl p-6 sm:p-10 shadow-xl border-4 border-slate-300 high-contrast:bg-black high-contrast:border-yellow-400 card-theme">
          
          {/* Header */}
          <div className="text-center mb-8 relative">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4 high-contrast:bg-yellow-400 high-contrast:text-black">
              <LogIn className="w-9 h-9" />
            </div>

            <div className="flex items-center justify-center gap-3">
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight high-contrast:text-yellow-400">
                {t('logIn')}
              </h1>
              <SpeakButton text={`${t('logIn')}. ${t('welcomeBack')}`} size="md" />
            </div>

            <p className="text-xl sm:text-2xl font-medium text-slate-600 high-contrast:text-white mt-1">
              {t('welcomeBack')}
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

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-6">
            
            {/* Identifier SpeechInput */}
            <div>
              <SpeechInput
                fieldId="login-identifier"
                label={t('emailOrPhone')}
                value={identifier}
                onValueChange={setIdentifier}
                placeholder="e.g. ramesh@example.com or 9876543210"
                autoComplete="username"
              />
            </div>

            {/* Password SpeechInput */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xl sm:text-2xl font-bold text-slate-800 high-contrast:text-white">
                  {t('password')}
                </span>
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="text-base sm:text-lg font-bold text-blue-700 hover:underline flex items-center gap-1.5 high-contrast:text-yellow-400"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  <span>{showPassword ? t('hidePassword') : t('showPassword')}</span>
                </button>
              </div>

              <SpeechInput
                fieldId="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onValueChange={setPassword}
                placeholder="Enter or speak your password"
                autoComplete="current-password"
              />
            </div>

            {/* Login Action */}
            <div className="pt-2">
              <LargeButton
                type="submit"
                variant="primary"
                size="huge"
                icon={<LogIn className="w-8 h-8" />}
              >
                {t('logIn')}
              </LargeButton>
            </div>

            {/* Demo Shortcut */}
            <button
              type="button"
              onClick={handleFillDemo}
              className="w-full p-3 rounded-xl border-2 border-dashed border-blue-400 bg-blue-50 text-blue-900 font-bold text-base sm:text-lg flex items-center justify-center gap-2 hover:bg-blue-100 high-contrast:bg-zinc-900 high-contrast:text-yellow-400 high-contrast:border-yellow-400"
            >
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span>{t('demoLoginHint')}</span>
            </button>

            {/* Navigation options */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t-2 border-slate-200 high-contrast:border-zinc-700">
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
                onClick={() => navigateTo('register')}
                className="text-lg sm:text-xl font-bold text-blue-700 hover:underline high-contrast:text-yellow-400"
              >
                {t('createAccount')} →
              </button>
            </div>

          </form>

        </div>
      </main>
    </div>
  );
};
