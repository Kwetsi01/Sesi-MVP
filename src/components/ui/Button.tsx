import React from 'react';
import { twMerge } from 'tailwind-merge';

type Variant = 'primary' | 'secondary' | 'urgent' | 'ghost';
type Size = 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: React.ReactNode;
}

const variants: Record<Variant, string> = {
  primary: 'bg-brand text-white hover:bg-brand-dark',
  secondary: 'border-2 border-line bg-surface text-ink hover:border-ink/25',
  urgent: 'bg-urgent text-white hover:bg-urgent-dark',
  ghost: 'text-brand-dark hover:bg-brand-soft'
};

const sizes: Record<Size, string> = {
  md: 'h-11 rounded-xl px-4 text-[15px]',
  lg: 'h-14 rounded-2xl px-5 text-base'
};

export function Button({ variant = 'primary', size = 'lg', icon, className, children, type = 'button', ...rest }: ButtonProps) {
  return (
    <button
      type={type}
      className={twMerge(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-[background-color,border-color,color,transform] duration-150 ease-out active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100 [&_svg]:h-5 [&_svg]:w-5',
        variants[variant],
        sizes[size],
        className
      )}
      {...rest}>
      
      {icon}
      {children}
    </button>);

}