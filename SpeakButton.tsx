import React from 'react';
import { useApp } from '../context/AppContext';
import { Volume2, VolumeX } from 'lucide-react';

interface SpeakButtonProps {
  text: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SpeakButton: React.FC<SpeakButtonProps> = ({
  text,
  label,
  size = 'md',
  className = ''
}) => {
  const { readAloudText, stopAudio, isSpeaking, activeSpeakingText, t } = useApp();

  const isCurrentTextSpeaking = isSpeaking && activeSpeakingText === text;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCurrentTextSpeaking) {
      stopAudio();
    } else {
      readAloudText(text);
    }
  };

  const sizeClasses = {
    sm: 'p-1.5 text-sm gap-1 rounded-lg',
    md: 'p-2 text-base gap-1.5 rounded-xl',
    lg: 'px-4 py-2.5 text-lg gap-2 rounded-2xl'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isCurrentTextSpeaking ? t('stopAudio') : `${t('readAloud')}: ${text}`}
      title={isCurrentTextSpeaking ? t('stopAudio') : t('readAloud')}
      className={`inline-flex items-center justify-center font-bold border-2 transition-all shadow-sm focus:outline-none focus:ring-4 ${
        isCurrentTextSpeaking
          ? 'bg-amber-500 text-white border-amber-700 animate-pulse ring-4 ring-amber-200 high-contrast:bg-yellow-400 high-contrast:text-black high-contrast:border-white'
          : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200 high-contrast:bg-black high-contrast:text-yellow-400 high-contrast:border-yellow-400'
      } ${sizeClasses[size]} ${className}`}
    >
      {isCurrentTextSpeaking ? (
        <VolumeX className={iconSizes[size]} />
      ) : (
        <Volume2 className={iconSizes[size]} />
      )}
      {label && <span>{isCurrentTextSpeaking ? t('stopAudio') : label}</span>}
    </button>
  );
};
