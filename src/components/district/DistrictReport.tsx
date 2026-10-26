import React from 'react';
import { PrinterIcon, ShieldCheckIcon } from 'lucide-react';
import { useDistrictMetrics } from '../../hooks/useDistrictMetrics';
import { chwActivity } from '../../data/district';
import { DEMO } from '../../data/demo';
import { safetyPrinciples } from '../../data/screening';
import { Button } from '../ui/Button';

const TARGET = 85;

export function DistrictReport() {
  const m = useDistrictMetrics();
  const totalBarriers = m.barriers.reduce((s, b) => s + b.count, 0);
  const topBarrier = [...m.barriers].sort((a, b) => b.count - a.count)[0];
  const staleChws = chwActivity.filter((c) => c.lastSync.includes('days'));
  const followUpCases = m.outstanding.filter((o) => o.status === 'Follow-up required');
  const referralRate = Math.round(m.referrals / m.screenings * 100);

  const indicators = [
  { label: 'Household screenings', value: String(m.screenings), note: 'Completed by 5 CHWs' },
  { label: 'Referrals created', value: String(m.referrals), note: `${referralRate}% of screenings` },
  { label: 'Referrals completed', value: String(m.completed), note: 'Attendance confirmed by clinic' },
  { label: 'Referral completion', value: `${m.completion}%`, note: `Target ${TARGET}%`, alert: m.completion < TARGET },
  { label: 'Awaiting attendance', value: String(m.awaiting), note: 'Open, within expected window' },
  { label: 'Follow-up required', value: String(m.followUp), note: 'Attendance not confirmed', alert: m.followUp > 0 },
  { label: 'Median referral → attendance', value: `${m.medianDays} days`, note: 'From CHW referral to clinic' }];


  const actions = [
  followUpCases.length > 0 && `Prioritise follow-up on ${followUpCases.length} referral${followUpCases.length === 1 ? '' : 's'} where attendance is not confirmed (see section 5).`,
  topBarrier && `Address “${topBarrier.label.toLowerCase()}”, the most common operational barrier (${topBarrier.count} cases). Check equipment allocation across wards.`,
  staleChws.length > 0 && `Check in with ${staleChws.map((c) => c.name).join(', ')}: phone has not synced for 3 days, so recent referrals may not have reached the clinic.`,
  m.completion < TARGET && `Completion is ${TARGET - m.completion} points below the ${TARGET}% target. Review clinic acknowledgement times with Demo PHC Clinic.`].
  filter(Boolean) as string[];

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <p className="text-[15px] text-muted">Updates live as referrals move through Sesi Field and Sesi Clinic.</p>
        <Button size="md" icon={<PrinterIcon />} onClick={() => window.print()}>
          Print / save as PDF
        </Button>
      </div>

      <article className="mx-auto max-w-4xl rounded-2xl border border-line bg-surface px-8 py-10 print:max-w-none print:rounded-none print:border-0 print:p-0 md:px-12" aria-labelledby="report-title">
        <header className="border-b-2 border-ink pb-6">
          <p className="text-sm font-semibold text-muted">Sesi District · Monthly referral report</p>
          <h2 id="report-title" className="mt-1 text-3xl font-bold text-ink">
            {DEMO.district}: September – October 2026
          </h2>
          <dl className="mt-4 grid gap-x-8 gap-y-1 text-[15px] sm:grid-cols-3">
            <div>
              <dt className="text-muted">Prepared for</dt>
              <dd className="font-semibold text-ink">District Health Manager</dd>
            </div>
            <div>
              <dt className="text-muted">Coverage</dt>
              <dd className="font-semibold text-ink">Wards 14–19 · 1 clinic</dd>
            </div>
            <div>
              <dt className="text-muted">Generated</dt>
              <dd className="font-semibold text-ink">4 October 2026</dd>
            </div>
          </dl>
        </header>

        <ReportSection n={1} title="Summary">
          <p className="text-[17px] leading-relaxed text-ink">
            CHWs completed <strong>{m.screenings} household screenings</strong> and created <strong>{m.referrals} referrals</strong>. Of these,{' '}
            <strong>{m.completed} reached a confirmed outcome</strong>, giving a referral completion rate of <strong>{m.completion}%</strong> against a {TARGET}% target.
            Patients took a median of <strong>{m.medianDays} days</strong> to attend after referral. <strong>{m.awaiting + m.followUp} referrals remain open</strong>,{' '}
            {m.followUp} of which need CHW follow-up.
          </p>
          {m.demoClosed &&
          <p className="mt-3 rounded-lg bg-ok-soft px-4 py-2.5 text-[15px] text-ok">
              Today: Demo Patient’s urgent maternal-health referral was closed after the clinic confirmed attendance.
            </p>
          }
        </ReportSection>

        <ReportSection n={2} title="Key indicators">
          <table className="w-full text-left text-[15px]">
            <tbody className="divide-y divide-line border-y border-line">
              {indicators.map((i) =>
              <tr key={i.label}>
                  <th scope="row" className="py-2.5 pr-4 font-medium text-ink">
                    {i.label}
                  </th>
                  <td className={`py-2.5 pr-4 text-right text-lg font-bold tabular-nums ${i.alert ? 'text-urgent' : 'text-ink'}`}>{i.value}</td>
                  <td className="py-2.5 text-muted">{i.note}</td>
                </tr>
              )}
            </tbody>
          </table>
        </ReportSection>

        <ReportSection n={3} title="Outcomes by referral category">
          <table className="w-full text-left text-[15px]">
            <thead>
              <tr className="border-b border-line text-sm text-muted">
                <th className="py-2 font-semibold">Category</th>
                <th className="py-2 text-right font-semibold">Referrals</th>
                <th className="py-2 text-right font-semibold">Completed</th>
                <th className="py-2 text-right font-semibold">Open</th>
                <th className="py-2 text-right font-semibold">Completion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {m.categories.map((c) =>
              <tr key={c.category}>
                  <td className="py-2.5 font-medium text-ink">{c.category}</td>
                  <td className="py-2.5 text-right tabular-nums">{c.referrals}</td>
                  <td className="py-2.5 text-right tabular-nums">{c.completed}</td>
                  <td className="py-2.5 text-right tabular-nums">{c.outstanding}</td>
                  <td className="py-2.5 text-right font-semibold tabular-nums">{Math.round(c.completed / c.referrals * 100)}%</td>
                </tr>
              )}
            </tbody>
          </table>
          {m.categories.length === 1 && <p className="mt-2 text-sm text-muted">Referrals created during routine household visits will appear here by category.</p>}
        </ReportSection>

        <ReportSection n={4} title="Operational barriers">
          <p className="mb-3 text-[15px] text-muted">{totalBarriers} barriers reported by CHWs during screening and follow-up.</p>
          <ul className="space-y-2.5">
            {m.barriers.map((b) =>
            <li key={b.label} className="grid grid-cols-[180px_1fr_40px] items-center gap-4 text-[15px]">
                <span className="text-ink">{b.label}</span>
                <span className="h-2 rounded-full bg-subtle">
                  <span className="block h-full rounded-full bg-ink/70" style={{ width: `${b.count / totalBarriers * 100}%` }} />
                </span>
                <span className="text-right font-bold tabular-nums">{b.count}</span>
              </li>
            )}
          </ul>
        </ReportSection>

        <ReportSection n={5} title="Open referrals needing attention">
          <table className="w-full text-left text-[15px]">
            <thead>
              <tr className="border-b border-line text-sm text-muted">
                <th className="py-2 font-semibold">Patient</th>
                <th className="py-2 font-semibold">CHW</th>
                <th className="py-2 font-semibold">Status</th>
                <th className="py-2 text-right font-semibold">Days open</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {m.outstanding.map((o) =>
              <tr key={o.id}>
                  <td className="py-2.5">
                    <span className="font-medium text-ink">{o.patient}</span>
                    <span className="block text-sm text-muted">{o.note}</span>
                  </td>
                  <td className="py-2.5 text-ink">{o.chw}</td>
                  <td className={`py-2.5 font-semibold ${o.status === 'Follow-up required' ? 'text-warn' : 'text-ink'}`}>{o.status}</td>
                  <td className="py-2.5 text-right tabular-nums">{o.daysOpen}</td>
                </tr>
              )}
            </tbody>
          </table>
        </ReportSection>

        <ReportSection n={6} title="CHW activity">
          <table className="w-full text-left text-[15px]">
            <thead>
              <tr className="border-b border-line text-sm text-muted">
                <th className="py-2 font-semibold">CHW</th>
                <th className="py-2 text-right font-semibold">Screenings</th>
                <th className="py-2 text-right font-semibold">Referrals</th>
                <th className="py-2 text-right font-semibold">Follow-ups</th>
                <th className="py-2 pl-4 font-semibold">Last sync</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {chwActivity.map((c) =>
              <tr key={c.name}>
                  <td className="py-2.5">
                    <span className="font-medium text-ink">{c.name}</span>
                    <span className="block text-sm text-muted">{c.ward}</span>
                  </td>
                  <td className="py-2.5 text-right tabular-nums">{c.screenings}</td>
                  <td className="py-2.5 text-right tabular-nums">{c.referrals}</td>
                  <td className="py-2.5 text-right tabular-nums">{c.followUps}</td>
                  <td className={`py-2.5 pl-4 ${c.lastSync.includes('days') ? 'font-semibold text-warn' : 'text-muted'}`}>{c.lastSync}</td>
                </tr>
              )}
            </tbody>
          </table>
        </ReportSection>

        <ReportSection n={7} title="Recommended actions">
          {actions.length ?
          <ol className="list-decimal space-y-2 pl-5 text-[15px] leading-relaxed text-ink marker:font-semibold">
              {actions.map((a) =>
            <li key={a}>{a}</li>
            )}
            </ol> :

          <p className="text-[15px] text-muted">No actions required this period.</p>
          }
        </ReportSection>

        <footer className="mt-10 border-t border-line pt-5 text-sm text-muted">
          <p className="flex items-center gap-2 font-semibold text-ink">
            <ShieldCheckIcon className="h-4 w-4" aria-hidden />
            About this data
          </p>
          <p className="mt-1.5 leading-relaxed">
            {safetyPrinciples.join(' ')} Figures are drawn from Sesi Field and Sesi Clinic records. Prototype data — not for clinical or operational use.
          </p>
        </footer>
      </article>
    </div>);

}

function ReportSection({ n, title, children }: {n: number;title: string;children: React.ReactNode;}) {
  return (
    <section className="mt-9 break-inside-avoid" aria-labelledby={`report-s${n}`}>
      <h3 id={`report-s${n}`} className="mb-3 text-lg font-bold text-ink">
        {n}. {title}
      </h3>
      {children}
    </section>);

}