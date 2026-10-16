import React from 'react';
import { useApp } from '../context/AppContext';
import { LogOut } from 'lucide-react';
import { LargeButton } from './LargeButton';

export const LogoutDialog: React.FC = () => {
  const { isLogoutDialogOpen, closeLogoutDialog, logoutUser, t } = useApp();

  if (!isLogoutDialogOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-title"
    >
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border-4 border-slate-400 high-contrast:bg-black high-contrast:border-yellow-400 text-slate-900 high-contrast:text-white card-theme">
        
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center flex-shrink-0 high-contrast:bg-yellow-400 high-contrast:text-black">
            <LogOut className="w-8 h-8" />
          </div>
          <div>
            <h2 id="logout-title" className="text-2xl sm:text-3xl font-black text-slate-900 high-contrast:text-yellow-400">
              {t('logoutTitle')}
            </h2>
          </div>
        </div>

        <p className="text-xl sm:text-2xl font-medium text-slate-700 high-contrast:text-white mb-8 leading-relaxed">
          {t('logoutConfirm')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <LargeButton
            onClick={logoutUser}
            variant="danger"
            size="large"
            className="flex-1"
          >
            {t('logOut')}
          </LargeButton>

          <LargeButton
            onClick={closeLogoutDialog}
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
