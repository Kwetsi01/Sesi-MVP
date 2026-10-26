import React from 'react';
import { ChevronRightIcon } from 'lucide-react';
import type { StatusTone } from '../../utils/referral';

interface AttentionItemProps {
  tone: StatusTone;
  title: string;
  patient: string;
  meta: string;
  onClick: () => void;
}

const dot: Record<StatusTone, string> = {
  urgent: 'bg-urgent',
  warn: 'bg-[#E08A12]',
  ok: 'bg-ok',
  brand: 'bg-brand'
};

export function AttentionItem({ tone, title, patient, meta, onClick }: AttentionItemProps) {
  return (
    <li>
      <button
        onClick={onClick}
        className="flex w-full items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3.5 text-left transition-colors duration-150 hover:border-ink/20">
        
        <span className={`h-3 w-3 shrink-0 rounded-full ${dot[tone]}`} aria-hidden />
        <span className="min-w-0 flex-1">
          <span className="block font-semibold text-ink">{title}</span>
          <span className="block text-[15px] text-ink">{patient}</span>
          <span className="block text-sm text-muted">{meta}</span>
        </span>
        <ChevronRightIcon className="h-5 w-5 shrink-0 text-muted" aria-hidden />
      </button>
    </li>);

}