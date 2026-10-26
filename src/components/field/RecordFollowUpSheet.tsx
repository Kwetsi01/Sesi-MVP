import React, { useEffect, useState } from 'react';
import { barriers, followUpResults } from '../../data/screening';
import { Button } from '../ui/Button';
import { ChoiceButton } from '../ui/ChoiceButton';
import { Sheet } from '../ui/Sheet';
import type { FollowUp } from '../../types/sesi';

interface RecordFollowUpSheetProps {
  item: FollowUp | null;
  onClose: () => void;
  onSave: (item: FollowUp, result: string, barrier: string | null) => void;
}

export function RecordFollowUpSheet({ item, onClose, onSave }: RecordFollowUpSheetProps) {
  const [result, setResult] = useState<string | null>(null);
  const [barrier, setBarrier] = useState<string | null>(null);

  useEffect(() => {
    setResult(null);
    setBarrier(null);
  }, [item]);

  const needsBarrier = result === 'Unable to attend';
  const valid = result && (!needsBarrier || barrier);

  return (
    <Sheet open={!!item} onClose={onClose} title={item ? `Follow-up · ${item.patient}` : 'Follow-up'}>
      <fieldset>
        <legend className="text-[17px] font-semibold text-ink">What happened?</legend>
        <div role="radiogroup" className="mt-3 space-y-2.5">
          {followUpResults.map((r) =>
          <ChoiceButton
            key={r}
            label={r}
            selected={result === r}
            onSelect={() => {
              setResult(r);
              if (r !== 'Unable to attend') setBarrier(null);
            }} />

          )}
        </div>
      </fieldset>
      {needsBarrier &&
      <fieldset className="mt-6">
          <legend className="text-[17px] font-semibold text-ink">Barrier</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {barriers.map((b) =>
          <button
            key={b}
            type="button"
            aria-pressed={barrier === b}
            onClick={() => setBarrier(b)}
            className={`h-11 rounded-full border-2 px-4 text-[15px] font-medium transition-colors duration-150 ${
            barrier === b ? 'border-brand bg-brand-soft text-brand-dark' : 'border-line bg-surface text-ink'}`
            }>
            
                {b}
              </button>
          )}
          </div>
          <p className="mt-2 text-sm text-muted">Barriers are shared anonymously with district reporting.</p>
        </fieldset>
      }
      <Button className="mt-6 w-full" disabled={!valid} onClick={() => item && result && onSave(item, result, barrier)}>
        Save follow-up
      </Button>
    </Sheet>);

}