import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleCheckIcon, PhoneIcon, TriangleAlertIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../../ui/Button';
import { RecordFollowUpSheet } from '../RecordFollowUpSheet';
import type { FollowUp } from '../../../types/sesi';

interface TasksScreenProps {
  items: FollowUp[];
  onRecorded: (id: string) => void;
}

export function TasksScreen({ items, onRecorded }: TasksScreenProps) {
  const [recording, setRecording] = useState<FollowUp | null>(null);

  function save(item: FollowUp, result: string, barrier: string | null) {
    setRecording(null);
    onRecorded(item.id);
    toast.success(`Follow-up recorded for ${item.patient}`, { description: barrier ? `${result} · Barrier: ${barrier}` : result });
  }

  return (
    <div className="px-5 pb-6 pt-6">
      <h1 className="text-[26px] font-bold text-ink">Follow-ups</h1>
      <p className="mt-1 text-[17px] font-semibold text-ink" aria-live="polite">
        {items.length === 0 ? 'No follow-ups left today' : `${items.length} ${items.length === 1 ? 'patient requires' : 'patients require'} follow-up`}
      </p>

      {items.length === 0 ?
      <div className="mt-6 flex flex-col items-center rounded-2xl border border-line bg-surface px-6 py-10 text-center">
          <CircleCheckIcon className="h-10 w-10 text-ok" aria-hidden />
          <p className="mt-3 font-semibold text-ink">All follow-ups recorded</p>
          <p className="mt-1 text-sm text-muted">New follow-ups appear here when a referral outcome isn't confirmed.</p>
        </div> :

      <ul className="mt-4 space-y-3">
          <AnimatePresence initial={false}>
            {items.map((f) =>
          <motion.li
            key={f.id}
            layout
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="rounded-2xl border border-line bg-surface p-4">
            
                <p className="text-lg font-semibold text-ink">{f.patient}</p>
                <p className="text-[15px] text-muted">
                  {f.category} · Referred {f.referred}
                </p>
                <p className="mt-2 flex items-center gap-2 font-semibold text-warn">
                  <TriangleAlertIcon className="h-4 w-4" aria-hidden />
                  {f.issue}
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2.5">
                  <Button
                variant="secondary"
                size="md"
                icon={<PhoneIcon />}
                onClick={() => toast(`Calling ${f.patient}…`, { description: 'Simulated in this prototype.' })}>
                
                    Contact patient
                  </Button>
                  <Button size="md" onClick={() => setRecording(f)}>
                    Record follow-up
                  </Button>
                </div>
              </motion.li>
          )}
          </AnimatePresence>
        </ul>
      }
      <RecordFollowUpSheet item={recording} onClose={() => setRecording(null)} onSave={save} />
    </div>);

}