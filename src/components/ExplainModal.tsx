import React from 'react';
import { useApp } from '../context/AppContext';
import { explanations } from '../data/explanations';
import { HelpCircle, Check, Info } from 'lucide-react';
import { LargeButton } from './LargeButton';

export const ExplainModal: React.FC = () => {
  const { explainTermKey, closeExplain, settings, t, readAloudText } = useApp();

  if (!explainTermKey) return null;

  const entry = explanations[explainTermKey];

  const title = entry ? entry.title[settings.language] || entry.title.en : 'Explanation';
  const explanation = entry ? entry.explanation[settings.language] || entry.explanation.en : 'No explanation available for this term.';
  const example = entry ? entry.example[settings.language] || entry.example.en : '';

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="explain-title"
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border-4 border-blue-600 high-contrast:bg-black high-contrast:border-yellow-400 text-slate-900 high-contrast:text-white card-theme">
        
        {/* Modal Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 high-contrast:bg-yellow-400 high-contrast:text-black">
            <HelpCircle className="w-9 h-9" />
          </div>
          <div className="flex-1">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-sm font-black uppercase tracking-wider mb-1 high-contrast:bg-zinc-800 high-contrast:text-yellow-400">
              Simple Explanation
            </span>
            <h2 id="explain-title" className="text-2xl sm:text-3xl font-black leading-tight text-slate-900 high-contrast:text-yellow-400">
              {title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="space-y-5 text-xl sm:text-2xl font-medium leading-relaxed bg-slate-50 p-6 rounded-2xl border-2 border-slate-200 high-contrast:bg-zinc-950 high-contrast:border-white">
          <p className="text-slate-800 high-contrast:text-white">
            {explanation}
          </p>

          {example && (
            <div className="pt-4 border-t-2 border-slate-200 high-contrast:border-zinc-700">
              <div className="flex items-start gap-2.5 text-blue-900 high-contrast:text-yellow-400 font-semibold">
                <Info className="w-6 h-6 flex-shrink-0 mt-0.5" />
                <span>{example}</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer / Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => readAloudText(`${title}. ${explanation}. ${example}`)}
            className="w-full sm:w-auto px-5 py-3 rounded-xl border-2 border-slate-300 font-bold text-lg text-slate-700 hover:bg-slate-100 high-contrast:bg-black high-contrast:text-white high-contrast:border-white"
          >
            🔊 {t('hearQuestion')}
          </button>

          <LargeButton
            onClick={closeExplain}
            variant="primary"
            size="large"
            icon={<Check className="w-7 h-7" />}
            className="w-full sm:w-auto"
          >
            {t('gotIt')}
          </LargeButton>
        </div>

      </div>
    </div>
  );
};
