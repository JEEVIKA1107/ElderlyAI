import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce">
      <div className="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl border-2 border-slate-700 flex items-center gap-3 text-lg font-bold high-contrast:bg-black high-contrast:border-yellow-400 high-contrast:text-yellow-400">
        <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 high-contrast:text-yellow-400" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
