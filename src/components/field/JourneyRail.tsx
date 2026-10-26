import React from 'react';
import { CheckIcon } from 'lucide-react';
import { useDemo } from '../../contexts/DemoContext';
import { stageAtLeast } from '../../utils/referral';

const steps = [
{ place: 'Household', text: 'CHW identifies referral need' },
{ place: 'Sesi', text: 'Referral created and tracked' },
{ place: 'Clinic', text: 'Referral received, patient attends' },
{ place: 'Sesi', text: 'CHW notified, referral closed' },
{ place: 'District', text: 'Outcome becomes measurable' }];


export function JourneyRail() {
  const { referral } = useDemo();
  const s = referral?.stage;
  const done = [
  !!referral,
  !!s && stageAtLeast(s, 'sent'),
  !!s && s !== 'not_attended' && stageAtLeast(s, 'attended'),
  s === 'closed',
  s === 'closed'];

  const current = done.findIndex((d) => !d);

  return (
    <aside className="hidden w-80 shrink-0 pt-6 lg:block" aria-label="Demo journey">
      <p className="text-[22px] font-bold leading-snug text-ink">No patient should disappear between the household and the clinic.</p>
      <ol className="mt-8">
        {steps.map((step, i) => {
          const isDone = done[i];
          const isCurrent = i === current;
          return (
            <li key={i} className="relative flex gap-4 pb-6 last:pb-0">
              {i < steps.length - 1 && <span className={`absolute left-[15px] top-8 h-[calc(100%-28px)] w-0.5 ${isDone ? 'bg-ok' : 'bg-line'}`} aria-hidden />}
              <span
                className={`relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 text-sm font-bold transition-colors duration-200 ${
                isDone ? 'border-ok bg-ok text-white' : isCurrent ? 'border-brand bg-surface text-brand-dark' : 'border-line bg-canvas text-muted'}`
                }
                aria-hidden>
                
                {isDone ? <CheckIcon className="h-4 w-4" strokeWidth={3} /> : i + 1}
              </span>
              <div className="pt-1">
                <p className={`text-sm font-bold ${isDone || isCurrent ? 'text-ink' : 'text-muted'}`}>{step.place}</p>
                <p className={`text-[15px] ${isDone || isCurrent ? 'text-ink' : 'text-muted'}`}>{step.text}</p>
              </div>
            </li>);

        })}
      </ol>
    </aside>);

}