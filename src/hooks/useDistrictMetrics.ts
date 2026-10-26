import { useDemo } from '../contexts/DemoContext';
import { barriers as baseBarriers, districtBaseline, outstandingReferrals } from '../data/district';
import { DEMO } from '../data/demo';
import type { Barrier, OutstandingReferral } from '../types/sesi';

export interface CategoryOutcome {
  category: string;
  referrals: number;
  completed: number;
  outstanding: number;
}

export function useDistrictMetrics() {
  const { referral, visitReferrals } = useDemo();
  const demo = !!referral;
  const closed = referral?.stage === 'closed';
  const missed = referral?.stage === 'not_attended';
  const outstandingDemo = demo && !closed;

  const visitClosed = visitReferrals.filter((r) => r.stage === 'closed').length;
  const visitMissed = visitReferrals.filter((r) => r.stage === 'not_attended').length;
  const visitAwaiting = visitReferrals.length - visitClosed - visitMissed;

  const screenings = districtBaseline.screenings + (demo ? 1 : 0);
  const referrals = districtBaseline.referrals + (demo ? 1 : 0) + visitReferrals.length;
  const completed = districtBaseline.completed + (closed ? 1 : 0) + visitClosed;
  const awaiting = districtBaseline.awaiting + (outstandingDemo && !missed ? 1 : 0) + visitAwaiting;
  const followUp = districtBaseline.followUp + (missed ? 1 : 0) + visitMissed;
  const completion = Math.round(completed / referrals * 100);

  const barriers: Barrier[] = baseBarriers.map((b) =>
  b.label === 'BP unavailable' && referral?.answers.bpAvailable === false ? { ...b, count: b.count + 1 } : b
  );

  const demoOutstanding: OutstandingReferral[] =
  outstandingDemo && referral ?
  [
  {
    id: referral.id,
    patient: referral.patient.name,
    chw: DEMO.chw,
    status: missed ? 'Follow-up required' : 'Awaiting attendance',
    daysOpen: 0,
    note: referral.stage === 'created' ? 'Waiting to sync from CHW phone' : missed ? 'Did not attend' : 'Urgent · maternal health'
  }] :

  [];

  const visitOutstanding: OutstandingReferral[] = visitReferrals.
  filter((r) => r.stage !== 'closed').
  map((r) => ({
    id: r.id,
    patient: r.patient,
    chw: r.chw,
    status: r.stage === 'not_attended' ? 'Follow-up required' : 'Awaiting attendance',
    daysOpen: 0,
    note: `${r.category} · ${r.escalation[0]}`
  }));

  const outstanding = [...demoOutstanding, ...visitOutstanding, ...outstandingReferrals];

  const categoryMap = new Map<string, CategoryOutcome>();
  categoryMap.set('Maternal Health', {
    category: 'Maternal Health',
    referrals: districtBaseline.referrals + (demo ? 1 : 0),
    completed: districtBaseline.completed + (closed ? 1 : 0),
    outstanding: districtBaseline.awaiting + districtBaseline.followUp + (outstandingDemo ? 1 : 0)
  });
  visitReferrals.forEach((r) => {
    const c = categoryMap.get(r.category) ?? { category: r.category, referrals: 0, completed: 0, outstanding: 0 };
    c.referrals += 1;
    if (r.stage === 'closed') c.completed += 1;else
    c.outstanding += 1;
    categoryMap.set(r.category, c);
  });

  return {
    screenings,
    referrals,
    completed,
    awaiting,
    followUp,
    completion,
    medianDays: districtBaseline.medianDays,
    barriers,
    outstanding,
    categories: Array.from(categoryMap.values()),
    demoClosed: closed,
    demoActive: demo
  };
}