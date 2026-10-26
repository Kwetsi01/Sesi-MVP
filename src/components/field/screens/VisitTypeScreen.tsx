import React, { useState } from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { visitTypes, type VisitTypeId } from '../../../data/visits';
import { Button } from '../../ui/Button';
import { ChoiceButton } from '../../ui/ChoiceButton';
import { FlowHeader } from '../FlowHeader';
import type { Patient } from '../../../types/sesi';

interface VisitTypeScreenProps {
  patient: Patient;
  onBack: () => void;
  onContinue: (type: VisitTypeId) => void;
}

export function VisitTypeScreen({ patient, onBack, onContinue }: VisitTypeScreenProps) {
  const [type, setType] = useState<VisitTypeId>('maternal');
  const cta = visitTypes.find((v) => v.id === type)?.cta ?? 'Continue';

  return (
    <div className="flex min-h-full flex-col">
      <FlowHeader title={patient.name} onBack={onBack} />
      <div className="flex-1 px-5 pb-6 pt-2">
        <p className="text-sm text-muted">
          {patient.sex}, {patient.age} · {patient.village}
        </p>
        <h2 className="mt-4 text-2xl font-bold text-ink">What are you doing today?</h2>
        <div role="radiogroup" aria-label="Visit type" className="mt-5 space-y-3">
          {visitTypes.map((v) =>
          <ChoiceButton key={v.id} label={v.label} selected={type === v.id} onSelect={() => setType(v.id)} />
          )}
        </div>
      </div>
      <div className="sticky bottom-0 border-t border-line bg-canvas px-5 py-3">
        <Button className="w-full flex-row-reverse" onClick={() => onContinue(type)} icon={<ArrowRightIcon />}>
          {cta}
        </Button>
      </div>
    </div>);

}