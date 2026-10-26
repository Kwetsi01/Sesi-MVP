import React from 'react';
import { PlusIcon } from 'lucide-react';
import { useDemo } from '../../../contexts/DemoContext';
import { DEMO } from '../../../data/demo';
import { fieldStatus } from '../../../utils/referral';
import { Button } from '../../ui/Button';
import { AttentionItem } from '../AttentionItem';

interface HomeScreenProps {
  onStartVisit: () => void;
  onOpenReferrals: () => void;
  onOpenTasks: () => void;
}

export function HomeScreen({ onStartVisit, onOpenReferrals, onOpenTasks }: HomeScreenProps) {
  const { referral } = useDemo();
  const demoOpen = referral && referral.stage !== 'closed' && referral.stage !== 'attended';
  const stats = [
  { value: 8, label: 'Visits' },
  { value: 3, label: 'Follow-ups' },
  { value: 1 + (demoOpen ? 1 : 0), label: 'Urgent', urgent: true }];


  return (
    <div className="flex min-h-full flex-col">
      <div className="flex-1 px-5 pb-6 pt-6">
        <p className="text-sm text-muted">Tuesday, 4 October</p>
        <h1 className="mt-1 text-[26px] font-bold leading-tight text-ink">Good morning, {DEMO.chwFirst}</h1>

        <section aria-labelledby="today-heading" className="mt-6">
          <h2 id="today-heading" className="text-sm font-semibold text-muted">
            Today's work
          </h2>
          <dl className="mt-2 grid grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-surface py-3">
            {stats.map((s) =>
            <div key={s.label} className="flex flex-col items-center">
                <dd className={`text-[28px] font-bold leading-none tabular-nums ${s.urgent ? 'text-urgent' : 'text-ink'}`}>{s.value}</dd>
                <dt className="mt-1.5 text-sm text-muted">{s.label}</dt>
              </div>
            )}
          </dl>
        </section>

        <section aria-labelledby="attention-heading" className="mt-7">
          <h2 id="attention-heading" className="text-lg font-semibold text-ink">
            Needs attention
          </h2>
          <ul className="mt-3 space-y-2.5">
            {referral &&
            <AttentionItem
              tone={referral.stage === 'closed' || referral.stage === 'attended' ? 'ok' : 'urgent'}
              title={fieldStatus(referral.stage).label}
              patient={referral.patient.name}
              meta={`${DEMO.category} · Referred today ${DEMO.time}`}
              onClick={onOpenReferrals} />

            }
            <AttentionItem
              tone="urgent"
              title="Referral awaiting attendance"
              patient="Patient #1024"
              meta="Maternal Health · Referred yesterday"
              onClick={onOpenReferrals} />
            
            <AttentionItem
              tone="warn"
              title="Attendance not confirmed"
              patient="Patient #1082"
              meta="Follow-up required · Referred 2 days ago"
              onClick={onOpenTasks} />
            
          </ul>
        </section>
      </div>
      <div className="sticky bottom-0 border-t border-line bg-canvas px-5 py-3">
        <Button className="w-full" icon={<PlusIcon />} onClick={onStartVisit}>
          Start household visit
        </Button>
      </div>
    </div>);

}