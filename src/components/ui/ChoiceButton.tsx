import React from 'react';
import { CheckIcon } from 'lucide-react';

interface ChoiceButtonProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
  badge?: string;
}

export function ChoiceButton({ label, selected, onSelect, disabled, badge }: ChoiceButtonProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      disabled={disabled}
      onClick={onSelect}
      className={`flex min-h-[60px] w-full items-center justify-between gap-3 rounded-2xl border-2 px-4 text-left text-[17px] font-medium transition-[background-color,border-color,transform] duration-150 ease-out active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:active:scale-100 ${
      selected ?
      'border-brand bg-brand-soft text-brand-dark' :
      disabled ?
      'border-line bg-subtle text-muted' :
      'border-line bg-surface text-ink hover:border-ink/25'}`
      }>
      
      <span>{label}</span>
      {badge ?
      <span className="shrink-0 whitespace-nowrap rounded-full bg-line px-2.5 py-1 text-xs font-semibold text-muted">{badge}</span> :

      <span
        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 transition-colors duration-150 ${
        selected ? 'border-brand bg-brand text-white' : 'border-line'}`
        }
        aria-hidden>
        
          {selected && <CheckIcon className="h-4 w-4" strokeWidth={3} />}
        </span>
      }
    </button>);

}