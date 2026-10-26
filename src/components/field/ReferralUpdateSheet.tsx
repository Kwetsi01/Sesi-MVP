import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDownIcon, CheckIcon, TriangleAlertIcon } from 'lucide-react';
import { useDemo } from '../../contexts/DemoContext';
import { DEMO, stageTimes } from '../../data/demo';
import { Button } from '../ui/Button';
import { Sheet } from '../ui/Sheet';

interface ReferralUpdateSheetProps {
  onViewReferral: () => void;
  onOpenTasks: () => void;
}

const ease = [0.23, 1, 0.32, 1] as const;

export function ReferralUpdateSheet({ onViewReferral, onOpenTasks }: ReferralUpdateSheetProps) {
  const { referral, fieldUpdatePending, dismissFieldUpdate, surface } = useDemo();
  const open = fieldUpdatePending && !!referral && surface === 'field';
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!open) {
      setRevealed(false);
      return;
    }
    const t = window.setTimeout(() => setRevealed(true), 800);
    return () => window.clearTimeout(t);
  }, [open, referral?.stage]);

  if (!referral) return null;
  const missed = referral.stage === 'not_attended';
  const closed = referral.stage === 'closed';
  const name = referral.patient.name;

  return (
    <Sheet open={open} onClose={dismissFieldUpdate} title={`Update from ${DEMO.clinic}`}>
      {missed ?
      <div>
          <p className="flex items-center gap-2 text-xl font-bold text-warn">
            <TriangleAlertIcon className="h-6 w-6" aria-hidden />
            Did not attend
          </p>
          <p className="mt-2 text-[17px] text-ink">{name} did not attend {DEMO.clinic}. A follow-up has been added to your Tasks.</p>
          <Button
          className="mt-6 w-full"
          onClick={() => {
            dismissFieldUpdate();
            onOpenTasks();
          }}>
          
            Open tasks
          </Button>
        </div> :

      <div aria-live="polite">
          <div className="rounded-2xl bg-subtle p-4">
            <p className={`text-sm font-bold tracking-wide transition-colors duration-200 ${revealed ? 'text-muted line-through' : 'text-ink'}`}>AWAITING ATTENDANCE</p>
            <ArrowDownIcon className="my-2 h-5 w-5 text-muted" aria-hidden />
            <AnimatePresence>
              {revealed &&
            <motion.p
              initial={{ opacity: 0, scale: 0.96, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.24, ease }}
              className="flex items-center gap-2 text-2xl font-bold text-ok">
              
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-ok text-white">
                    <CheckIcon className="h-5 w-5" strokeWidth={3} />
                  </span>
                  ATTENDED
                </motion.p>
            }
            </AnimatePresence>
            {!revealed && <p className="h-8 text-sm text-muted">Receiving outcome…</p>}
          </div>

          <AnimatePresence>
            {revealed &&
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22, delay: 0.15, ease }}>
                <p className="mt-5 text-[17px] text-ink">
                  {name} attended {DEMO.clinic} at {stageTimes.attended}.
                </p>
                <p className="mt-1 text-[17px] font-semibold text-ink">Referral outcome confirmed.</p>

                {closed ?
            <motion.p
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.22, delay: 0.45, ease }}
              className="mt-5 flex items-center gap-2 rounded-2xl bg-ok-soft px-4 py-3 text-lg font-bold text-ok">
              
                    <CheckIcon className="h-5 w-5" strokeWidth={3} aria-hidden />
                    CLOSED
                    <span className="ml-auto text-sm font-medium">No tracing needed</span>
                  </motion.p> :

            <p className="mt-5 rounded-2xl bg-subtle px-4 py-3 text-[15px] text-muted">The clinic will close the referral once complete.</p>
            }

                <div className="mt-6 grid gap-2">
                  <Button
                onClick={() => {
                  dismissFieldUpdate();
                  onViewReferral();
                }}>
                
                    View referral
                  </Button>
                  <Button variant="ghost" onClick={dismissFieldUpdate}>
                    Done
                  </Button>
                </div>
              </motion.div>
          }
          </AnimatePresence>
        </div>
      }
    </Sheet>);

}