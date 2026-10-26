import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDemo } from '../../../contexts/DemoContext';
import { DEMO } from '../../../data/demo';
import { fieldReferrals } from '../../../data/fieldReferrals';
import { fieldStatus } from '../../../utils/referral';
import { ReferralTimeline } from '../../ReferralTimeline';
import type { FieldTone, ReferralStage } from '../../../types/sesi';

type Tab = 'active' | 'followup' | 'completed';

const tabs: {id: Tab;label: string;}[] = [
{ id: 'active', label: 'Active' },
{ id: 'followup', label: 'Follow-up' },
{ id: 'completed', label: 'Completed' }];


const toneStyles: Record<FieldTone, {dot: string;label: string;text: string;}> = {
  urgent: { dot: 'bg-urgent', label: 'Urgent', text: 'text-urgent' },
  attention: { dot: 'bg-[#E08A12]', label: 'Needs follow-up', text: 'text-warn' },
  routine: { dot: 'bg-muted', label: 'Routine', text: 'text-muted' }
};

const statusTone = { urgent: 'text-urgent', warn: 'text-warn', ok: 'text-ok', brand: 'text-brand-dark' };

export function ReferralsScreen() {
  const { referral, visitReferrals } = useDemo();
  const [tab, setTab] = useState<Tab>('active');

  const demoGroup: Tab | null = !referral ?
  null :
  referral.stage === 'closed' ?
  'completed' :
  referral.stage === 'not_attended' ?
  'followup' :
  'active';

  const visitGroup = (stage: ReferralStage): Tab => stage === 'closed' ? 'completed' : stage === 'not_attended' ? 'followup' : 'active';
  const visitList = visitReferrals.filter((r) => visitGroup(r.stage) === tab);
  const countFor = (g: Tab) =>
  fieldReferrals.filter((r) => r.group === g).length + (demoGroup === g ? 1 : 0) + visitReferrals.filter((r) => visitGroup(r.stage) === g).length;

  const counts: Record<Tab, number> = {
    active: countFor('active'),
    followup: countFor('followup'),
    completed: countFor('completed')
  };

  const list = fieldReferrals.filter((r) => r.group === tab);

  return (
    <div className="px-5 pb-6 pt-6">
      <h1 className="text-[26px] font-bold text-ink">Referrals</h1>
      <div role="tablist" aria-label="Referral status" className="mt-4 grid grid-cols-3 rounded-xl bg-line/60 p-1">
        {tabs.map((t) =>
        <button
          key={t.id}
          role="tab"
          aria-selected={tab === t.id}
          onClick={() => setTab(t.id)}
          className={`h-10 whitespace-nowrap rounded-lg text-[15px] font-semibold transition-colors duration-150 ${
          tab === t.id ? 'bg-surface text-ink shadow-sm' : 'text-muted'}`
          }>
          
            {t.label} <span className="tabular-nums text-muted">{counts[t.id]}</span>
          </button>
        )}
      </div>

      <ul className="mt-4 space-y-3" role="tabpanel">
        {referral && demoGroup === tab &&
        <motion.li layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="rounded-2xl border-2 border-brand/30 bg-surface p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-urgent">
              <span className="h-2.5 w-2.5 rounded-full bg-urgent" aria-hidden />
              Urgent
              <span className="ml-auto text-xs font-medium text-muted">Today {DEMO.time}</span>
            </div>
            <p className="mt-2 text-lg font-semibold text-ink">{referral.patient.name}</p>
            <p className="text-[15px] text-muted">
              {DEMO.category} · {DEMO.clinic}
            </p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
              key={referral.stage}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className={`mt-2 font-semibold ${statusTone[fieldStatus(referral.stage).tone]}`}
              aria-live="polite">
              
                {fieldStatus(referral.stage).label}
              </motion.p>
            </AnimatePresence>
            <div className="mt-4 border-t border-line pt-4">
              <ReferralTimeline stage={referral.stage} />
            </div>
          </motion.li>
        }
        {visitList.map((r) => {
          const s = fieldStatus(r.stage);
          return (
            <li key={r.id} className="rounded-2xl border border-line bg-surface p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-muted">
                <span className="h-2.5 w-2.5 rounded-full bg-muted" aria-hidden />
                Routine
                <span className="ml-auto text-xs font-medium">Today {r.referredTime}</span>
              </div>
              <p className="mt-2 text-lg font-semibold text-ink">{r.patient}</p>
              <p className="text-[15px] text-muted">
                {r.category} · {DEMO.clinic}
              </p>
              <p className="text-sm text-muted">{r.escalation[0]}</p>
              <p className={`mt-2 font-semibold ${statusTone[s.tone]}`}>{s.label}</p>
            </li>);

        })}
        {list.map((r) => {
          const t = toneStyles[r.tone];
          return (
            <li key={r.id} className="rounded-2xl border border-line bg-surface p-4">
              <div className={`flex items-center gap-2 text-sm font-semibold ${t.text}`}>
                <span className={`h-2.5 w-2.5 rounded-full ${t.dot}`} aria-hidden />
                {t.label}
              </div>
              <p className="mt-2 text-lg font-semibold text-ink">{r.patient}</p>
              <p className="text-[15px] text-muted">
                {r.category} · {r.destination}
              </p>
              <p className="text-sm text-muted">{r.referred}</p>
              <p className={`mt-2 font-semibold ${r.group === 'followup' ? 'text-warn' : r.group === 'completed' ? 'text-ok' : 'text-ink'}`}>{r.status}</p>
              <p className="text-[15px] text-muted">{r.detail}</p>
            </li>);

        })}
      </ul>
    </div>);

}