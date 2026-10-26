import React from 'react';
import { WifiOffIcon } from 'lucide-react';
import { useDemo } from '../../../contexts/DemoContext';
import { DEMO } from '../../../data/demo';
import { findingsTable } from '../../../utils/screening';
import { Button } from '../../ui/Button';
import { FlowHeader } from '../FlowHeader';
import type { Patient, ScreeningAnswers } from '../../../types/sesi';

interface ReferralDocumentScreenProps {
  patient: Patient;
  answers: ScreeningAnswers;
  onBack: () => void;
  onConfirm: () => void;
}

export function ReferralDocumentScreen({ patient, answers, onBack, onConfirm }: ReferralDocumentScreenProps) {
  const { online } = useDemo();
  const meta = [
  { label: 'Patient', value: patient.name },
  { label: 'Date', value: DEMO.date },
  { label: 'Time', value: DEMO.time },
  { label: 'CHW', value: DEMO.chw },
  { label: 'Category', value: DEMO.category },
  { label: 'Priority', value: 'Urgent', urgent: true },
  { label: 'Destination', value: DEMO.clinic }];


  return (
    <div className="flex min-h-full flex-col">
      <FlowHeader title="Review referral" onBack={onBack} />
      <div className="flex-1 px-5 pb-6 pt-2">
        <article className="rounded-3xl border border-line bg-surface p-5" aria-label="Sesi referral">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <h2 className="text-sm font-bold tracking-wide text-ink">SESI REFERRAL</h2>
            <span className="rounded-full bg-subtle px-2.5 py-1 text-xs font-bold tracking-wide text-muted">CREATED</span>
          </div>
          <dl className="mt-3 space-y-2">
            {meta.map((m) =>
            <div key={m.label} className="flex justify-between gap-4 text-[15px]">
                <dt className="text-muted">{m.label}</dt>
                <dd className={`text-right font-semibold ${m.urgent ? 'text-urgent' : 'text-ink'}`}>{m.value}</dd>
              </div>
            )}
          </dl>
          <h3 className="mt-5 border-t border-line pt-4 text-[15px] font-bold text-ink">Findings</h3>
          <dl className="mt-2 space-y-2">
            {findingsTable(answers).map((f) =>
            <div key={f.label} className="flex justify-between gap-4 text-[15px]">
                <dt className="text-muted">{f.label}</dt>
                <dd className={`text-right font-semibold ${f.flagged ? 'text-urgent' : 'text-ink'}`}>{f.value}</dd>
              </div>
            )}
          </dl>
        </article>
        {!online &&
        <p className="mt-4 flex gap-2 text-sm text-warn">
            <WifiOffIcon className="h-4 w-4 shrink-0 translate-y-0.5" aria-hidden />
            You're offline. The referral will be saved on this phone and sent when you reconnect.
          </p>
        }
      </div>
      <div className="sticky bottom-0 border-t border-line bg-canvas px-5 py-3">
        <Button className="w-full" onClick={onConfirm}>
          Confirm referral
        </Button>
      </div>
    </div>);

}