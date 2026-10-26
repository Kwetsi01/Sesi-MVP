import React from 'react';
import { ChevronLeftIcon } from 'lucide-react';

interface FlowHeaderProps {
  title: string;
  onBack: () => void;
  progress?: number;
}

export function FlowHeader({ title, onBack, progress }: FlowHeaderProps) {
  return (
    <div className="sticky top-0 z-10 bg-canvas">
      <div className="flex items-center gap-2 px-2 py-2">
        <button
          onClick={onBack}
          aria-label="Back"
          className="grid h-11 w-11 place-items-center rounded-full text-ink transition-colors duration-150 hover:bg-line/60">
          
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <h1 className="text-base font-semibold text-ink">{title}</h1>
      </div>
      {progress !== undefined &&
      <div className="mx-5 h-1.5 overflow-hidden rounded-full bg-line" role="progressbar" aria-valuenow={Math.round(progress * 100)} aria-valuemin={0} aria-valuemax={100} aria-label="Screening progress">
          <div className="h-full rounded-full bg-brand transition-[width] duration-300 ease-out" style={{ width: `${progress * 100}%` }} />
        </div>
      }
    </div>);

}