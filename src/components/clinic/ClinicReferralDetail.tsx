import React from 'react';
import { CheckIcon, ShieldCheckIcon, TriangleAlertIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { ReferralTimeline } from '../ReferralTimeline';
import type { ClinicReferral, ReferralStage } from '../../types/sesi';

interface ClinicReferralDetailProps {
  referral: ClinicReferral;
  onAction: (stage: ReferralStage) => void;
}

export function ClinicReferralDetail({ referral: r, onAction }: ClinicReferralDetailProps) {
  const urgent = r.priority === 'Urgent';
  return (
    <article className="flex min-h-full flex-col rounded-2xl border border-line bg-surface" aria-label={`Referral for ${r.patient}`}>
      <header className="border-b border-line px-6 py-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className={`rounded-full px-2.5 py-1 text-xs font-bold tracking-wide ${urgent ? 'bg-urgent text-white' : 'bg-subtle text-muted'}`}>{urgent ? 'URGENT' : 'ROUTINE'}</span>
          <span className="text-sm text-muted">
            {r.id} · {r.category}
          </span>
        </div>
        <h2 className="mt-3 text-2xl font-bold text-ink">{r.patient}</h2>
        <p className="mt-1 text-[15px] text-muted">
          Age {r.age} · {r.village} · Referred {r.referredDate}, {r.referredTime} by {r.chw} (CHW)
        </p>
      </header>

      <div className="grid flex-1 gap-8 px-6 py-6 xl:grid-cols-[1fr_260px]">
        <div>
          <section aria-labelledby="why-heading">
            <h3 id="why-heading" className="text-sm font-semibold text-muted">
              Why this referral
            </h3>
            <p className="mt-1.5 text-[17px] font-semibold text-ink">Referral criteria met · {r.category} protocol</p>
            <ul className="mt-3 space-y-1.5">
              {r.escalation.map((e) =>
              <li key={e} className="flex items-center gap-2.5 text-[15px] text-ink">
                  <span className="h-1.5 w-1.5 rounded-full bg-urgent" aria-hidden />
                  {e}
                </li>
              )}
            </ul>
          </section>

          <section className="mt-8" aria-labelledby="findings-heading">
            <h3 id="findings-heading" className="text-sm font-semibold text-muted">
              Findings recorded by CHW
            </h3>
            <dl className="mt-2 divide-y divide-line border-y border-line">
              {r.findings.map((f) =>
              <div key={f.label} className="grid grid-cols-[180px_1fr] gap-4 py-2.5 text-[15px]">
                  <dt className="text-muted">{f.label}</dt>
                  <dd className={`font-semibold ${f.flagged ? 'text-urgent' : f.value === 'Not available' ? 'text-warn' : 'text-ink'}`}>{f.value}</dd>
                </div>
              )}
            </dl>
            <p className="mt-3 flex gap-2 text-sm text-muted">
              <ShieldCheckIcon className="h-4 w-4 shrink-0 translate-y-0.5" aria-hidden />
              Missing measurements are shown as missing. Sesi never estimates values or suggests a diagnosis.
            </p>
          </section>
        </div>

        <section aria-labelledby="progress-heading">
          <h3 id="progress-heading" className="mb-3 text-sm font-semibold text-muted">
            Referral progress
          </h3>
          <ReferralTimeline stage={r.stage} />
        </section>
      </div>

      <footer className="sticky bottom-0 flex flex-wrap items-center gap-3 rounded-b-2xl border-t border-line bg-surface px-6 py-4">
        {r.stage === 'sent' &&
        <>
            <p className="mr-auto text-[15px] text-muted">Let the CHW know the referral has arrived.</p>
            <Button size="md" onClick={() => onAction('acknowledged')}>
              Acknowledge referral
            </Button>
          </>
        }
        {r.stage === 'acknowledged' &&
        <>
            <p className="mr-auto text-[15px] text-muted">Did the patient come to the clinic?</p>
            <Button size="md" variant="secondary" onClick={() => onAction('not_attended')}>
              Patient did not attend
            </Button>
            <Button size="md" onClick={() => onAction('attended')} icon={<CheckIcon />}>
              Patient attended
            </Button>
          </>
        }
        {r.stage === 'attended' &&
        <>
            <p className="mr-auto flex items-center gap-2 font-semibold text-ok">
              <CheckIcon className="h-5 w-5" strokeWidth={3} aria-hidden />
              Attendance recorded
            </p>
            <Button size="md" onClick={() => onAction('closed')}>
              Complete referral
            </Button>
          </>
        }
        {r.stage === 'not_attended' &&
        <p className="flex items-center gap-2 font-semibold text-warn">
            <TriangleAlertIcon className="h-5 w-5" aria-hidden />
            Non-attendance recorded. The CHW has been asked to follow up.
          </p>
        }
        {r.stage === 'closed' &&
        <p className="flex items-center gap-2 font-semibold text-ok">
            <CheckIcon className="h-5 w-5" strokeWidth={3} aria-hidden />
            Referral completed. The CHW has been notified.
          </p>
        }
      </footer>
    </article>);

}