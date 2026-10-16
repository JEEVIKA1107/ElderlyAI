import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface LargeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'danger' | 'outline';
  size?: 'normal' | 'large' | 'huge';
  icon?: ReactNode;
  children: ReactNode;
}

export const LargeButton: React.FC<LargeButtonProps> = ({
  variant = 'primary',
  size = 'large',
  icon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  let baseStyles = 'inline-flex items-center justify-center font-bold transition-all duration-150 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 shadow-md ';

  // Size variations
  if (size === 'normal') {
    baseStyles += 'px-5 py-3 text-base sm:text-lg rounded-xl min-h-[48px] ';
  } else if (size === 'large') {
    baseStyles += 'px-8 py-4 text-xl sm:text-2xl rounded-2xl min-h-[60px] gap-3 ';
  } else if (size === 'huge') {
    baseStyles += 'px-10 py-5 text-2xl sm:text-3xl rounded-2xl min-h-[72px] gap-4 w-full ';
  }

  // Variant styles
  if (variant === 'primary') {
    baseStyles += 'btn-primary bg-blue-700 text-white hover:bg-blue-800 border-2 border-blue-800 ';
  } else if (variant === 'secondary') {
    baseStyles += 'btn-secondary bg-slate-100 text-slate-800 hover:bg-slate-200 border-2 border-slate-300 ';
  } else if (variant === 'accent') {
    baseStyles += 'btn-accent bg-emerald-600 text-white hover:bg-emerald-700 border-2 border-emerald-800 ';
  } else if (variant === 'danger') {
    baseStyles += 'bg-red-600 text-white hover:bg-red-700 border-2 border-red-800 ';
  } else if (variant === 'outline') {
    baseStyles += 'bg-transparent text-slate-700 hover:bg-slate-100 border-2 border-slate-400 ';
  }

  return (
    <button
      className={`${baseStyles} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
