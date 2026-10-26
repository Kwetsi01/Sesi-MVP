import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDistrictMetrics } from '../../hooks/useDistrictMetrics';
import { OutstandingList } from './OutstandingList';

export function DistrictOverview() {
  const m = useDistrictMetrics();
  const statusRows = [
  { label: 'Completed', value: m.completed, color: 'bg-ok' },
  { label: 'Awaiting attendance', value: m.awaiting, color: 'bg-brand' },
  { label: 'Follow-up required', value: m.followUp, color: 'bg-[#E08A12]' }];

  const maxBarrier = Math.max(...m.barriers.map((b) => b.count));

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <section className="rounded-2xl border border-line bg-surface p-6 lg:col-span-2" aria-labelledby="completion-heading">
        <div className="grid gap-6 md:grid-cols-[1fr_auto]">
          <div>
            <h2 id="completion-heading" className="text-[15px] font-semibold text-muted">
              Referral completion
            </h2>
            <div className="mt-2 flex items-end gap-4">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={m.completion}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                  className="text-7xl font-bold leading-none tracking-tight tabular-nums text-ink"
                  aria-live="polite">
                  
                  {m.completion}%
                </motion.p>
              </AnimatePresence>
              {m.demoClosed &&
              <motion.span initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }} className="mb-2 rounded-full bg-ok-soft px-3 py-1 text-sm font-semibold text-ok">
                  +1 closed today · Demo Patient
                </motion.span>
              }
            </div>
            <p className="mt-3 text-[15px] text-muted">
              {m.completed} of {m.referrals} referrals reached a confirmed outcome this month.
            </p>
            <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-subtle">
              <div className="h-full rounded-full bg-ok transition-[width] duration-300 ease-out" style={{ width: `${m.completion}%` }} />
            </div>
          </div>
          <dl className="grid grid-cols-3 gap-6 border-line md:grid-cols-1 md:gap-4 md:border-l md:pl-8">
            {[
            { label: 'Household screenings', value: m.screenings },
            { label: 'Referrals', value: m.referrals },
            { label: 'Completed', value: m.completed }].
            map((s) =>
            <div key={s.label}>
                <dd className="text-[28px] font-bold leading-none tabular-nums text-ink">{s.value}</dd>
                <dt className="mt-1 text-sm text-muted">{s.label}</dt>
              </div>
            )}
          </dl>
        </div>
      </section>

      <section className="flex flex-col rounded-2xl border border-line bg-surface p-6" aria-labelledby="median-heading">
        <h2 id="median-heading" className="text-[15px] font-semibold text-muted">
          Median referral → attendance
        </h2>
        <p className="mt-2 text-5xl font-bold tabular-nums text-ink">
          {m.medianDays} <span className="text-2xl font-semibold text-muted">days</span>
        </p>
        <p className="mt-auto pt-4 text-sm text-muted">Time from CHW referral to confirmed clinic attendance.</p>
      </section>

      <section className="rounded-2xl border border-line bg-surface p-6 lg:col-span-2" aria-labelledby="status-heading">
        <h2 id="status-heading" className="text-lg font-semibold text-ink">
          Referral status
        </h2>
        <div className="mt-4 flex h-3 overflow-hidden rounded-full bg-subtle" aria-hidden>
          {statusRows.map((s) =>
          <div key={s.label} className={`${s.color} transition-[width] duration-300 ease-out`} style={{ width: `${s.value / m.referrals * 100}%` }} />
          )}
        </div>
        <dl className="mt-4 grid gap-3 sm:grid-cols-3">
          {statusRows.map((s) =>
          <div key={s.label} className="flex items-center gap-2.5">
              <span className={`h-2.5 w-2.5 rounded-full ${s.color}`} aria-hidden />
              <dt className="text-[15px] text-muted">{s.label}</dt>
              <dd className="ml-auto font-bold tabular-nums text-ink sm:ml-0">{s.value}</dd>
            </div>
          )}
        </dl>
      </section>

      <section className="rounded-2xl border border-line bg-surface p-6" aria-labelledby="barriers-heading">
        <h2 id="barriers-heading" className="text-lg font-semibold text-ink">
          Operational barriers
        </h2>
        <ul className="mt-4 space-y-3.5">
          {m.barriers.map((b) =>
          <li key={b.label}>
              <div className="flex items-baseline justify-between text-[15px]">
                <span className="text-ink">{b.label}</span>
                <span className="font-bold tabular-nums text-ink">{b.count}</span>
              </div>
              <div className="mt-1.5 h-1.5 rounded-full bg-subtle">
                <div className="h-full rounded-full bg-ink/70" style={{ width: `${b.count / maxBarrier * 100}%` }} />
              </div>
            </li>
          )}
        </ul>
        <p className="mt-4 text-sm text-muted">Reported by CHWs during screening and follow-up.</p>
      </section>

      <section className="rounded-2xl border border-line bg-surface p-6 lg:col-span-3" aria-labelledby="outstanding-heading">
        <div className="flex items-baseline justify-between">
          <h2 id="outstanding-heading" className="text-lg font-semibold text-ink">
            Outstanding referrals
          </h2>
          <span className="text-sm text-muted">{m.outstanding.length} unresolved</span>
        </div>
        <div className="mt-2">
          <OutstandingList items={m.outstanding} limit={5} />
        </div>
      </section>
    </div>);

}