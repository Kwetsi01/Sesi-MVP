import React from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, LoaderCircleIcon, ShieldCheckIcon } from 'lucide-react';
import { useDemo } from '../../../contexts/DemoContext';
import { DEMO } from '../../../data/demo';
import { Button } from '../../ui/Button';

interface ReferralSavedScreenProps {
  onViewReferral: () => void;
  onHome: () => void;
}

const syncSteps = ['Waiting to sync', 'Syncing', 'Synced'];

export function ReferralSavedScreen({ onViewReferral, onHome }: ReferralSavedScreenProps) {
  const { syncState } = useDemo();
  const current = syncState === 'synced' ? 2 : syncState === 'syncing' ? 1 : 0;
  const synced = syncState === 'synced';

  return (
    <div className="flex min-h-full flex-col">
      <div className="flex-1 px-5 pb-6 pt-10">
        <motion.span
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          className="grid h-16 w-16 place-items-center rounded-full bg-ok text-white"
          aria-hidden>
          
          <CheckIcon className="h-9 w-9" strokeWidth={3} />
        </motion.span>
        <h1 className="mt-5 text-[28px] font-bold leading-tight text-ink">Referral created</h1>
        <p className="mt-2 text-[17px] text-muted" aria-live="polite">
          {synced ? `Sent to ${DEMO.clinic}. You'll be told when she attends.` : `The referral will be sent to ${DEMO.clinic} when connectivity is available.`}
        </p>

        {!synced &&
        <div className="mt-6 flex gap-3 rounded-2xl bg-brand-soft p-4">
            <ShieldCheckIcon className="h-6 w-6 shrink-0 text-brand-dark" aria-hidden />
            <div>
              <p className="font-semibold text-brand-dark">Saved securely on device</p>
              <p className="mt-0.5 text-[15px] text-brand-dark/90">Sesi will sync automatically when connectivity returns.</p>
            </div>
          </div>
        }

        <ol className="mt-6 space-y-3" aria-label="Sync progress">
          {syncSteps.map((label, i) => {
            const done = i < current || i === 2 && synced;
            const active = i === current && !done;
            return (
              <li key={label} className="flex items-center gap-3">
                <span
                  className={`grid h-8 w-8 place-items-center rounded-full border-2 transition-colors duration-200 ${
                  done ? 'border-ok bg-ok text-white' : active ? 'border-brand text-brand' : 'border-line text-muted'}`
                  }
                  aria-hidden>
                  
                  {done ? <CheckIcon className="h-4 w-4" strokeWidth={3} /> : active && i === 1 ? <LoaderCircleIcon className="h-4 w-4 animate-spin" /> : <span className="h-2 w-2 rounded-full bg-current" />}
                </span>
                <span className={`text-[17px] ${done || active ? 'font-semibold text-ink' : 'text-muted'}`}>{label}</span>
              </li>);

          })}
        </ol>
      </div>
      <div className="sticky bottom-0 grid gap-2 border-t border-line bg-canvas px-5 py-3">
        <Button onClick={onViewReferral}>View referral</Button>
        <Button variant="ghost" onClick={onHome}>
          Back to home
        </Button>
      </div>
    </div>);

}