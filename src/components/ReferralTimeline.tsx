import React from 'react';
import { CheckIcon, TriangleAlertIcon } from 'lucide-react';
import { stageTimes } from '../data/demo';
import { stageAtLeast } from '../utils/referral';
import type { ReferralStage } from '../types/sesi';

interface ReferralTimelineProps {
  stage: ReferralStage;
}

const steps: {key: ReferralStage;label: string;}[] = [
{ key: 'created', label: 'Referral created' },
{ key: 'sent', label: 'Sent to clinic' },
{ key: 'acknowledged', label: 'Received by clinic' },
{ key: 'attended', label: 'Patient attended' },
{ key: 'closed', label: 'Referral closed' }];


export function ReferralTimeline({ stage }: ReferralTimelineProps) {
  const missed = stage === 'not_attended';
  const firstPending = steps.findIndex((s) => !isDone(s.key));

  function isDone(key: ReferralStage): boolean {
    if (missed) return stageAtLeast('acknowledged', key);
    return stageAtLeast(stage, key);
  }

  return (
    <ol className="space-y-0">
      {steps.map((step, i) => {
        const done = isDone(step.key);
        const isMissedStep = missed && step.key === 'attended';
        const isNext = i === firstPending && !isMissedStep;
        const label = isMissedStep ? 'Did not attend' : missed && step.key === 'closed' ? 'Follow-up required' : step.label;
        return (
          <li key={step.key} className="relative flex gap-3 pb-4 last:pb-0">
            {i < steps.length - 1 &&
            <span className={`absolute left-[11px] top-6 h-[calc(100%-20px)] w-0.5 ${done ? 'bg-ok' : 'bg-line'}`} aria-hidden />
            }
            <span
              className={`relative z-10 grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 ${
              isMissedStep ?
              'border-warn bg-warn text-white' :
              done ?
              'border-ok bg-ok text-white' :
              isNext ?
              'border-brand bg-surface' :
              'border-line bg-surface'}`
              }
              aria-hidden>
              
              {isMissedStep ? <TriangleAlertIcon className="h-3 w-3" /> : done && <CheckIcon className="h-3.5 w-3.5" strokeWidth={3} />}
            </span>
            <div className="flex min-w-0 flex-1 items-baseline justify-between gap-2 pt-0.5">
              <span className={`text-sm ${done || isMissedStep ? 'font-semibold text-ink' : isNext ? 'font-medium text-ink' : 'text-muted'}`}>
                {label}
                <span className="sr-only">{done ? ' — done' : isNext ? ' — waiting' : ' — not yet'}</span>
              </span>
              <span className="shrink-0 text-xs tabular-nums text-muted">
                {done ? stageTimes[step.key] : isMissedStep ? stageTimes.not_attended : isNext ? 'Awaiting' : ''}
              </span>
            </div>
          </li>);

      })}
    </ol>);

}