import React from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { LargeButton } from '../components/LargeButton';
import { HelpCircle, ArrowLeft, Volume2, Sparkles, Compass, ShieldCheck, PhoneCall } from 'lucide-react';

export const HelpPage: React.FC = () => {
  const { goBack, t, readAloudText } = useApp();

  const handleReadAloudHelp = () => {
    readAloudText(
      'Help and Guide. This assistant helps you fill complicated forms. You can use Auto-Fill to read documents automatically, or Guide Me to answer simple questions one by one with your voice. You can increase text size with the A plus button and switch to High Contrast anytime.'
    );
  };

  const helpTopics = [
    {
      title: 'How does Auto-Fill work?',
      icon: <Sparkles className="w-8 h-8 text-blue-600 high-contrast:text-yellow-400" />,
      desc: 'You upload your form and supporting certificates. The assistant automatically reads key information (like your name or date of birth) and places it into the right boxes for your approval.'
    },
    {
      title: 'How does Guide Me work?',
      icon: <Compass className="w-8 h-8 text-emerald-600 high-contrast:text-yellow-400" />,
      desc: 'The assistant asks you one simple question at a time. You can speak your answer using the microphone button or type it. It will confirm your answer before moving to the next question.'
    },
    {
      title: 'How do I make the text bigger or clearer?',
      icon: <HelpCircle className="w-8 h-8 text-amber-600 high-contrast:text-yellow-400" />,
      desc: 'Look at the top bar on any screen. Click [+ A] to make text larger, or click [High Contrast] to switch to sharp, high-visibility colors with black background and bold text.'
    },
    {
      title: 'Is my information safe and private?',
      icon: <ShieldCheck className="w-8 h-8 text-indigo-600 high-contrast:text-yellow-400" />,
      desc: 'Yes! Your progress stays stored strictly on your current device browser. It is never sold or transmitted publicly, and you can delete saved applications anytime.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 high-contrast:bg-black high-contrast:text-white">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-8 flex flex-col justify-center">
        
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3 high-contrast:bg-yellow-400 high-contrast:text-black">
            <HelpCircle className="w-10 h-10" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 high-contrast:text-yellow-400">
            {t('help')} & Instructions
          </h1>
          <p className="text-xl sm:text-2xl font-medium text-slate-600 high-contrast:text-white mt-1">
            Easy answers and step-by-step guidance for completing your forms.
          </p>
        </div>

        {/* Read aloud helper */}
        <div className="text-center mb-8">
          <button
            type="button"
            onClick={handleReadAloudHelp}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-100 text-blue-900 font-bold text-lg hover:bg-blue-200 high-contrast:bg-zinc-900 high-contrast:text-yellow-400 high-contrast:border high-contrast:border-yellow-400"
          >
            <Volume2 className="w-6 h-6" />
            <span>Hear Help Read Aloud</span>
          </button>
        </div>

        {/* Help Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {helpTopics.map((topic, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-slate-300 shadow-md high-contrast:bg-black high-contrast:border-yellow-400"
            >
              <div className="flex items-center gap-3 mb-3">
                {topic.icon}
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 high-contrast:text-white">
                  {topic.title}
                </h2>
              </div>
              <p className="text-lg sm:text-xl font-medium text-slate-700 high-contrast:text-zinc-300 leading-relaxed">
                {topic.desc}
              </p>
            </div>
          ))}
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
