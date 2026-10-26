import React from 'react';
import { followUpQuestions } from '../../../data/visits';
import { GuidedQuestions } from '../GuidedQuestions';
import type { VisitFlag, VisitSummary } from '../../../hooks/useFieldFlow';
import type { Patient } from '../../../types/sesi';

interface FollowUpVisitScreenProps {
  patient: Patient;
  onExit: () => void;
  onComplete: (summary: VisitSummary) => void;
}

export function FollowUpVisitScreen({ patient, onExit, onComplete }: FollowUpVisitScreenProps) {
  return (
    <GuidedQuestions
      title="Referral follow-up"
      patient={patient}
      context={
      <div className="rounded-2xl border border-line bg-surface px-4 py-3">
          <p className="text-sm text-muted">Latest referral</p>
          <p className="font-semibold text-ink">Maternal Health · Demo PHC Clinic</p>
          <p className="text-sm font-semibold text-warn">Attendance not confirmed</p>
        </div>
      }
      questions={followUpQuestions}
      onExit={onExit}
      onComplete={(a) => {
        const contact = a.contact?.[0];
        const attended = a.attended?.[0];
        const plan = a.plan?.[0];
        const barrier = a.barrier?.[0];
        const outcome =
        contact === 'Could not contact' ?
        'Could not contact' :
        attended === 'Already attended' ?
        'Already attended' :
        plan ?? 'Unsure';
        const flags: VisitFlag[] = [];
        if (barrier) flags.push({ text: `Barrier recorded: ${barrier}. Shared with district reporting.` });
        if (outcome === 'Could not contact') flags.push({ text: 'Try again within 2 days.' });
        if (outcome === 'Already attended') flags.push({ text: 'The clinic will confirm attendance to close the referral.' });
        onComplete({
          title: 'Follow-up recorded',
          lines: [
          { label: 'Contact', value: contact ?? '—' },
          ...(attended ? [{ label: 'Clinic visit', value: attended }] : []),
          { label: 'Outcome', value: outcome },
          ...(barrier ? [{ label: 'Barrier', value: barrier }] : [])],

          flags,
          suggestScreening: false
        });
      }} />);


}