import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { InboxIcon } from 'lucide-react';
import type { ClinicReferral } from '../../types/sesi';

interface ClinicReferralListProps {
  referrals: ClinicReferral[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  emptyLabel: string;
}

export function ClinicReferralList({ referrals, selectedId, onSelect, emptyLabel }: ClinicReferralListProps) {
  if (referrals.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-dashed border-line bg-surface px-6 py-12 text-center">
        <InboxIcon className="h-8 w-8 text-muted" aria-hidden />
        <p className="mt-3 font-semibold text-ink">{emptyLabel}</p>
        <p className="mt-1 text-sm text-muted">New referrals from CHWs appear here as soon as their phones sync.</p>
      </div>);

  }

  return (
    <ul className="space-y-2.5">
      <AnimatePresence initial={false}>
        {referrals.map((r) => {
          const selected = r.id === selectedId;
          const urgent = r.priority === 'Urgent';
          return (
            <motion.li key={r.id} layout initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}>
              <button
                onClick={() => onSelect(r.id)}
                aria-current={selected ? 'true' : undefined}
                className={`w-full rounded-2xl border bg-surface p-4 text-left transition-[border-color,box-shadow] duration-150 ${
                selected ? 'border-brand shadow-[0_0_0_1px_#0D6B4E]' : 'border-line hover:border-ink/25'}`
                }>
                
                <div className="flex items-center gap-2">
                  <span className={`flex items-center gap-1.5 text-xs font-bold tracking-wide ${urgent ? 'text-urgent' : 'text-muted'}`}>
                    <span className={`h-2 w-2 rounded-full ${urgent ? 'bg-urgent' : 'bg-muted'}`} aria-hidden />
                    {urgent ? 'URGENT' : 'ROUTINE'}
                  </span>
                  {r.isDemo && r.stage === 'sent' && <span className="rounded-full bg-brand-soft px-2 py-0.5 text-xs font-semibold text-brand-dark">New</span>}
                  <span className="ml-auto text-sm tabular-nums text-muted">
                    {r.referredDate === '4 Oct 2026' ? `Referred ${r.referredTime}` : r.referredDate}
                  </span>
                </div>
                <p className="mt-2 font-semibold text-ink">{r.patient}</p>
                <p className="text-sm text-muted">
                  {r.category} · from {r.chw}
                </p>
              </button>
            </motion.li>);

        })}
      </AnimatePresence>
    </ul>);

}