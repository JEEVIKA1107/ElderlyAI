import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DoorOpen, AlertTriangle } from 'lucide-react';
import { LargeButton } from './LargeButton';

export const ExitDialog: React.FC = () => {
  const { isExitDialogOpen, closeExitDialog, t } = useApp();
  const [showBrowserNotice, setShowBrowserNotice] = useState(false);

  if (!isExitDialogOpen) return null;

  const handleExitApp = () => {
    try {
      window.close();
      // If browser security prevents window.close() (because it wasn't opened by script)
      setTimeout(() => {
        setShowBrowserNotice(true);
      }, 300);
    } catch {
      setShowBrowserNotice(true);
    }
  };

  const handleCancel = () => {
    setShowBrowserNotice(false);
    closeExitDialog();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-title"
    >
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border-4 border-slate-400 high-contrast:bg-black high-contrast:border-yellow-400 text-slate-900 high-contrast:text-white card-theme">
        
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 high-contrast:bg-yellow-400 high-contrast:text-black">
            <DoorOpen className="w-8 h-8" />
          </div>
          <div>
            <h2 id="exit-title" className="text-2xl sm:text-3xl font-black text-slate-900 high-contrast:text-yellow-400">
              {t('exitTitle')}
            </h2>
          </div>
        </div>

        <p className="text-xl sm:text-2xl font-medium text-slate-700 high-contrast:text-white mb-6">
          {t('exitConfirm')}
        </p>

        {showBrowserNotice && (
          <div className="mb-6 p-4 rounded-2xl bg-blue-50 border-2 border-blue-300 text-blue-900 text-lg sm:text-xl font-bold flex items-start gap-3 high-contrast:bg-zinc-900 high-contrast:border-yellow-400 high-contrast:text-yellow-400">
            <AlertTriangle className="w-6 h-6 flex-shrink-0 mt-0.5 text-amber-600" />
            <span>{t('browserCloseNotice')}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <LargeButton
            onClick={handleExitApp}
            variant="danger"
            size="large"
            className="flex-1"
          >
            {t('exitAppBtn')}
          </LargeButton>

          <LargeButton
            onClick={handleCancel}
            variant="secondary"
            size="large"
            className="flex-1"
          >
            {t('cancel')}
          </LargeButton>
        </div>

      </div>
    </div>
  );
};
