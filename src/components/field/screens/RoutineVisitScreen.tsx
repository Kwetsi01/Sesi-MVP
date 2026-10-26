import React from 'react';
import { routineQuestions } from '../../../data/visits';
import { GuidedQuestions } from '../GuidedQuestions';
import type { VisitFlag, VisitSummary } from '../../../hooks/useFieldFlow';
import type { Patient } from '../../../types/sesi';

interface RoutineVisitScreenProps {
  patient: Patient;
  onExit: () => void;
  onComplete: (summary: VisitSummary) => void;
}

export function RoutineVisitScreen({ patient, onExit, onComplete }: RoutineVisitScreenProps) {
  return (
    <GuidedQuestions
      title="Routine household visit"
      patient={patient}
      questions={routineQuestions}
      onExit={onExit}
      onComplete={(a) => {
        const flags: VisitFlag[] = [];
        if (a.immunisation?.[0] === 'Yes')
        flags.push({ text: 'Child behind on immunisations', referral: { category: 'Child Health', reason: 'Child under 5 behind on immunisations' } });
        if (a.medication?.[0] === 'Yes')
        flags.push({ text: 'Missed chronic medication collection', referral: { category: 'Chronic Care', reason: 'Missed chronic medication collection' } });
        if (a.unwell?.[0] === 'Yes')
        flags.push({ text: 'Someone in the household is unwell', referral: { category: 'General', reason: 'Household member unwell at visit' } });
        onComplete({
          title: 'Household visit recorded',
          lines: [
          { label: 'Household size', value: a.members?.[0] ?? '—' },
          { label: 'Anyone unwell', value: a.unwell?.[0] ?? '—' },
          { label: 'Anyone pregnant', value: a.pregnant?.[0] ?? '—' },
          { label: 'Immunisations behind', value: a.immunisation?.[0] ?? '—' },
          { label: 'Missed medication', value: a.medication?.[0] ?? '—' },
          { label: 'Education given', value: (a.education ?? []).join(', ') || '—' }],

          flags,
          suggestScreening: a.pregnant?.[0] === 'Yes'
        });
      }} />);


}