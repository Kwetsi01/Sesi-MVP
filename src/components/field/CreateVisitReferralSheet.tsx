import React from 'react';
import { WifiOffIcon } from 'lucide-react';
import { useDemo } from '../../contexts/DemoContext';
import { DEMO } from '../../data/demo';
import { Button } from '../ui/Button';
import { Sheet } from '../ui/Sheet';
import type { Patient } from '../../types/sesi';

interface CreateVisitReferralSheetProps {
  patient: Patient;
  draft: {category: string;reason: string;} | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function CreateVisitReferralSheet({ patient, draft, onClose, onConfirm }: CreateVisitReferralSheetProps) {
  const { online } = useDemo();
  const rows = draft ?
  [
  { label: 'Patient', value: patient.name },
  { label: 'CHW', value: DEMO.chw },
  { label: 'Category', value: draft.category },
  { label: 'Priority', value: 'Routine' },
  { label: 'Destination', value: DEMO.clinic },
  { label: 'Reason', value: draft.reason }] :

  [];

  return (
    <Sheet open={!!draft} onClose={onClose} title="Create referral">
      <article className="rounded-2xl border border-line p-4" aria-label="Sesi referral">
        <div className="flex items-center justify-between border-b border-line pb-3">
          <h3 className="text-sm font-bold tracking-wide text-ink">SESI REFERRAL</h3>
          <span className="rounded-full bg-subtle px-2.5 py-1 text-xs font-bold tracking-wide text-muted">DRAFT</span>
        </div>
        <dl className="mt-3 space-y-2">
          {rows.map((r) =>
          <div key={r.label} className="flex justify-between gap-4 text-[15px]">
              <dt className="text-muted">{r.label}</dt>
              <dd className="text-right font-semibold text-ink">{r.value}</dd>
            </div>
          )}
        </dl>
      </article>
      {!online &&
      <p className="mt-3 flex gap-2 text-sm text-warn">
          <WifiOffIcon className="h-4 w-4 shrink-0 translate-y-0.5" aria-hidden />
          You're offline. It will be saved on this phone and sent when you reconnect.
        </p>
      }
      <Button className="mt-5 w-full" onClick={onConfirm}>
        Confirm referral
      </Button>
    </Sheet>);

}