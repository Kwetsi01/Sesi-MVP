import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, InfoIcon, SendIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useDemo } from '../../../contexts/DemoContext';
import { DEMO } from '../../../data/demo';
import { fieldStatus } from '../../../utils/referral';
import { Button } from '../../ui/Button';
import { CreateVisitReferralSheet } from '../CreateVisitReferralSheet';
import type { VisitFlag, VisitSummary } from '../../../hooks/useFieldFlow';
import type { Patient } from '../../../types/sesi';

interface VisitCompleteScreenProps {
  patient: Patient;
  summary: VisitSummary;
  onHome: () => void;
  onStartScreening: () => void;
  onViewReferrals: () => void;
}

export function VisitCompleteScreen({ patient, summary, onHome, onStartScreening, onViewReferrals }: VisitCompleteScreenProps) {
  const { addVisitReferral, visitReferrals } = useDemo();
  const [draft, setDraft] = useState<VisitFlag | null>(null);
  const [created, setCreated] = useState<Record<string, string>>({});

  function confirm() {
    if (!draft?.referral) return;
    const now = new Date();
    const id = `R-${2051 + visitReferrals.length}`;
    addVisitReferral({
      id,
      patient: patient.name,
      age: patient.age,
      village: patient.village,
      category: draft.referral.category,
      priority: 'Routine',
      referredDate: '4 Oct 2026',
      referredTime: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
      chw: DEMO.chw,
      escalation: [draft.referral.reason],
      findings: [
      { label: 'Reason', value: draft.referral.reason, flagged: true },
      { label: 'Found during', value: 'Routine household visit' }],

      stage: 'created'
    });
    setCreated((prev) => ({ ...prev, [draft.text]: id }));
    toast.success('Referral created', { description: `${draft.referral.category} · ${DEMO.clinic}` });
    setDraft(null);
  }

  return (
    <div className="flex min-h-full flex-col">
      <div className="flex-1 px-5 pb-6 pt-10">
        <motion.span
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          className="grid h-16 w-16 place-items-center rounded-full bg-ok text-white"
          aria-hidden>
          
          <CheckIcon className="h-9 w-9" strokeWidth={3} />
        </motion.span>
        <h1 className="mt-5 text-[28px] font-bold leading-tight text-ink">{summary.title}</h1>
        <p className="mt-1 text-[17px] text-muted">{patient.name} · saved on this phone</p>

        {summary.flags.length > 0 &&
        <section className="mt-6" aria-labelledby="flags-heading">
            <h2 id="flags-heading" className="text-sm font-semibold text-muted">
              Needs action
            </h2>
            <ul className="mt-2 space-y-2.5">
              {summary.flags.map((f) => {
              const refId = created[f.text];
              const ref = refId ? visitReferrals.find((r) => r.id === refId) : undefined;
              return (
                <li key={f.text} className="rounded-2xl bg-warn-soft p-4">
                    <p className="flex gap-2 text-[15px] font-semibold text-warn">
                      <InfoIcon className="h-4 w-4 shrink-0 translate-y-0.5" aria-hidden />
                      {f.text}
                    </p>
                    {f.referral && (
                  ref ?
                  <p className="mt-3 flex items-center gap-2 rounded-xl bg-surface px-3 py-2.5 text-[15px] font-semibold text-ok" aria-live="polite">
                          <CheckIcon className="h-4 w-4" strokeWidth={3} aria-hidden />
                          Referral created · {fieldStatus(ref.stage).label}
                        </p> :

                  <Button size="md" className="mt-3 w-full" icon={<SendIcon />} onClick={() => setDraft(f)}>
                          Create referral
                        </Button>)
                  }
                  </li>);

            })}
            </ul>
          </section>
        }

        <dl className="mt-6 divide-y divide-line rounded-2xl border border-line bg-surface">
          {summary.lines.map((l) =>
          <div key={l.label} className="flex justify-between gap-4 px-4 py-3 text-[15px]">
              <dt className="text-muted">{l.label}</dt>
              <dd className="text-right font-semibold text-ink">{l.value}</dd>
            </div>
          )}
        </dl>
      </div>
      <div className="sticky bottom-0 grid gap-2 border-t border-line bg-canvas px-5 py-3">
        {summary.suggestScreening && <Button onClick={onStartScreening}>Start maternal-health screening</Button>}
        {Object.keys(created).length > 0 && !summary.suggestScreening && <Button onClick={onViewReferrals}>View referrals</Button>}
        <Button variant={summary.suggestScreening || Object.keys(created).length > 0 ? 'ghost' : 'primary'} onClick={onHome}>
          Back to home
        </Button>
      </div>
      <CreateVisitReferralSheet patient={patient} draft={draft?.referral ?? null} onClose={() => setDraft(null)} onConfirm={confirm} />
    </div>);

}