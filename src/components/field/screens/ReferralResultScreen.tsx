import React from 'react';
import { motion } from 'framer-motion';
import { CircleCheckIcon, ShieldCheckIcon, TriangleAlertIcon } from 'lucide-react';
import { evaluateReferral } from '../../../utils/screening';
import { Button } from '../../ui/Button';
import { FlowHeader } from '../FlowHeader';
import type { ScreeningAnswers } from '../../../types/sesi';

interface ReferralResultScreenProps {
  answers: ScreeningAnswers;
  onBack: () => void;
  onCreate: () => void;
  onFinish: () => void;
}

export function ReferralResultScreen({ answers, onBack, onCreate, onFinish }: ReferralResultScreenProps) {
  const { met, findings } = evaluateReferral(answers);

  if (!met) {
    return (
      <div className="flex min-h-full flex-col">
        <FlowHeader title="Screening result" onBack={onBack} />
        <div className="flex-1 px-5 pt-6">
          <CircleCheckIcon className="h-12 w-12 text-ok" aria-hidden />
          <h2 className="mt-4 text-[26px] font-bold leading-tight text-ink">No referral criteria met</h2>
          <p className="mt-3 text-[17px] text-muted">Give routine antenatal advice and remind her when to visit the clinic. Sesi will add this visit to her record.</p>
        </div>
        <div className="sticky bottom-0 border-t border-line bg-canvas px-5 py-3">
          <Button className="w-full" onClick={onFinish}>
            Finish visit
          </Button>
        </div>
      </div>);

  }

  return (
    <div className="flex min-h-full flex-col">
      <FlowHeader title="Screening result" onBack={onBack} />
      <div className="flex-1 px-5 pb-6 pt-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          className="rounded-3xl bg-urgent px-5 py-6 text-white"
          role="alert">
          
          <TriangleAlertIcon className="h-9 w-9" aria-hidden />
          <h2 className="mt-3 text-[30px] font-bold leading-tight">Referral required</h2>
          <p className="mt-2 text-[17px] font-medium leading-snug text-white/95">
            The information recorded meets the configured referral criteria for this pathway.
          </p>
        </motion.div>

        <section className="mt-6" aria-labelledby="findings-heading">
          <h3 id="findings-heading" className="text-sm font-semibold text-muted">
            Findings requiring escalation
          </h3>
          <ul className="mt-2 space-y-2">
            {findings.map((f) =>
            <li key={f} className="flex items-center gap-3 text-[17px] font-medium text-ink">
                <span className="h-2 w-2 shrink-0 rounded-full bg-urgent" aria-hidden />
                {f}
              </li>
            )}
          </ul>
        </section>

        <div className="mt-5 flex items-center justify-between rounded-2xl border border-line bg-surface px-4 py-3.5">
          <span className="text-[15px] text-muted">BP reading</span>
          <span className="font-semibold text-ink">{answers.bpAvailable ? answers.bpReading : 'Unavailable'}</span>
        </div>

        <p className="mt-5 text-[17px] font-semibold text-ink">Follow the approved referral pathway.</p>
        <p className="mt-4 flex gap-2 text-sm text-muted">
          <ShieldCheckIcon className="h-4 w-4 shrink-0 translate-y-0.5" aria-hidden />
          Sesi checks answers against the approved maternal-health protocol. It does not make a diagnosis.
        </p>
      </div>
      <div className="sticky bottom-0 border-t border-line bg-canvas px-5 py-3">
        <Button variant="urgent" className="w-full" onClick={onCreate}>
          Create referral
        </Button>
      </div>
    </div>);

}