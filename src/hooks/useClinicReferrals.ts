import { useMemo, useState } from 'react';
import { useDemo } from '../contexts/DemoContext';
import { clinicReferrals } from '../data/clinicReferrals';
import { DEMO } from '../data/demo';
import { stageAtLeast } from '../utils/referral';
import { evaluateReferral, findingsTable } from '../utils/screening';
import type { ClinicReferral, ReferralStage } from '../types/sesi';

export function useClinicReferrals() {
  const { referral, setStage, visitReferrals, setVisitReferralStage } = useDemo();
  const [localStages, setLocalStages] = useState<Record<string, ReferralStage>>({});

  const all = useMemo<ClinicReferral[]>(() => {
    const list = clinicReferrals.map((r) => ({ ...r, stage: localStages[r.id] ?? r.stage }));
    const synced = visitReferrals.filter((r) => stageAtLeast(r.stage, 'sent'));
    list.unshift(...synced);
    if (referral && stageAtLeast(referral.stage, 'sent')) {
      list.unshift({
        id: referral.id,
        patient: referral.patient.name,
        age: referral.patient.age,
        village: referral.patient.village,
        category: DEMO.category,
        priority: 'Urgent',
        referredDate: '4 Oct 2026',
        referredTime: DEMO.time,
        chw: DEMO.chw,
        escalation: evaluateReferral(referral.answers).findings,
        findings: findingsTable(referral.answers),
        stage: referral.stage,
        isDemo: true
      });
    }
    return list;
  }, [referral, visitReferrals, localStages]);

  function updateStage(r: ClinicReferral, stage: ReferralStage) {
    if (r.isDemo) setStage(stage);else
    if (visitReferrals.some((v) => v.id === r.id)) setVisitReferralStage(r.id, stage);else
    setLocalStages((prev) => ({ ...prev, [r.id]: stage }));
  }

  return { all, updateStage };
}