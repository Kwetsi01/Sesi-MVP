import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRightIcon, MicIcon, MinusIcon, PlusIcon } from 'lucide-react';
import { toast } from 'sonner';
import { bpReasons, voiceCaptured } from '../../../data/screening';
import { isValidBp } from '../../../utils/screening';
import { Button } from '../../ui/Button';
import { ChoiceButton } from '../../ui/ChoiceButton';
import { FlowHeader } from '../FlowHeader';
import { VoiceSheet } from '../VoiceSheet';
import type { Answer, Patient, ScreeningAnswers } from '../../../types/sesi';

type StepKey = 'gestation' | 'headache' | 'vision' | 'swelling' | 'bpAvailable' | 'bpReading' | 'bpReason';

interface ScreeningScreenProps {
  patient: Patient;
  answers: ScreeningAnswers;
  onChange: (a: ScreeningAnswers) => void;
  onExit: () => void;
  onComplete: () => void;
}

const questions: Record<StepKey, {title: string;hint?: string;}> = {
  gestation: { title: 'How many weeks pregnant is the patient?', hint: 'Use the antenatal card if she has one.' },
  headache: { title: 'Is she experiencing a severe headache?' },
  vision: { title: 'Is her vision blurry, or is she seeing spots?' },
  swelling: { title: 'Has she noticed swelling of her face or hands?' },
  bpAvailable: { title: 'Is a blood-pressure reading available?' },
  bpReading: { title: 'Enter the blood-pressure reading' },
  bpReason: { title: "Why wasn't BP recorded?", hint: 'This is shared with the clinic and district reporting.' }
};

const answerOptions: {value: Answer;label: string;}[] = [
{ value: 'yes', label: 'Yes' },
{ value: 'no', label: 'No' },
{ value: 'unsure', label: 'Unsure' }];


export function ScreeningScreen({ patient, answers, onChange, onExit, onComplete }: ScreeningScreenProps) {
  const [index, setIndex] = useState(0);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const steps = getSteps(answers);
  const step = steps[Math.min(index, steps.length - 1)];
  const q = questions[step];

  function next() {
    if (index < steps.length - 1) setIndex(index + 1);else
    onComplete();
  }

  function back() {
    if (index > 0) setIndex(index - 1);else
    onExit();
  }

  function applyVoice(jumpToNext: boolean) {
    const merged = { ...answers, ...voiceCaptured };
    onChange(merged);
    setVoiceOpen(false);
    if (jumpToNext) {
      const s = getSteps(merged);
      const firstOpen = s.findIndex((k) => !isAnswered(k, merged));
      setIndex(firstOpen === -1 ? s.length - 1 : firstOpen);
      toast.success('3 answers captured', { description: 'Continue with the remaining questions.' });
    } else {
      setIndex(0);
    }
  }

  const setAnswer = (key: 'headache' | 'vision' | 'swelling', value: Answer) => onChange({ ...answers, [key]: value });
  const [sys, dia] = answers.bpReading.split('/');

  return (
    <div className="flex min-h-full flex-col">
      <FlowHeader title="Maternal-health screening" onBack={back} progress={Math.min((index + 1) / 6, 1)} />
      <p className="px-5 pt-3 text-sm text-muted">
        {patient.name} · {patient.sex}, {patient.age}
      </p>

      <div className="flex-1 overflow-hidden px-5 pb-6 pt-3">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}>
            
            <h2 className="text-[24px] font-bold leading-tight text-ink">{q.title}</h2>
            {q.hint && <p className="mt-2 text-[15px] text-muted">{q.hint}</p>}

            <div className="mt-6">
              {step === 'gestation' &&
              <div>
                  <div className="flex items-center gap-3">
                    <button
                    aria-label="Fewer weeks"
                    onClick={() => onChange({ ...answers, gestation: clamp((answers.gestation ?? 21) - 1) })}
                    className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border-2 border-line bg-surface text-ink transition-colors duration-150 hover:border-ink/25">
                    
                      <MinusIcon className="h-6 w-6" />
                    </button>
                    <label className="flex-1">
                      <span className="sr-only">Weeks pregnant</span>
                      <input
                      inputMode="numeric"
                      value={answers.gestation ?? ''}
                      placeholder="—"
                      onChange={(e) => {
                        const v = e.target.value.replace(/\D/g, '').slice(0, 2);
                        onChange({ ...answers, gestation: v ? clamp(Number(v)) : null });
                      }}
                      className="h-16 w-full rounded-2xl border-2 border-line bg-surface text-center text-[32px] font-bold text-ink outline-none transition-colors duration-150 placeholder:text-muted focus:border-brand" />
                    
                    </label>
                    <button
                    aria-label="More weeks"
                    onClick={() => onChange({ ...answers, gestation: clamp((answers.gestation ?? 19) + 1) })}
                    className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border-2 border-line bg-surface text-ink transition-colors duration-150 hover:border-ink/25">
                    
                      <PlusIcon className="h-6 w-6" />
                    </button>
                  </div>
                  <p className="mt-2 text-center text-[15px] font-medium text-muted">weeks</p>
                </div>
              }

              {(step === 'headache' || step === 'vision' || step === 'swelling') &&
              <div role="radiogroup" aria-label={q.title} className="space-y-3">
                  {answerOptions.map((o) =>
                <ChoiceButton key={o.value} label={o.label} selected={answers[step] === o.value} onSelect={() => setAnswer(step, o.value)} />
                )}
                </div>
              }

              {step === 'bpAvailable' &&
              <div role="radiogroup" aria-label={q.title} className="space-y-3">
                  <ChoiceButton label="Yes" selected={answers.bpAvailable === true} onSelect={() => onChange({ ...answers, bpAvailable: true, bpReason: null })} />
                  <ChoiceButton label="No" selected={answers.bpAvailable === false} onSelect={() => onChange({ ...answers, bpAvailable: false, bpReading: '' })} />
                </div>
              }

              {step === 'bpReading' &&
              <div className="flex items-center gap-3">
                  <label className="flex-1">
                    <span className="text-sm font-semibold text-muted">Systolic</span>
                    <input
                    inputMode="numeric"
                    value={sys ?? ''}
                    onChange={(e) => onChange({ ...answers, bpReading: `${e.target.value.replace(/\D/g, '').slice(0, 3)}/${dia ?? ''}` })}
                    className="mt-1 h-16 w-full rounded-2xl border-2 border-line bg-surface text-center text-[28px] font-bold outline-none focus:border-brand" />
                  
                  </label>
                  <span className="mt-6 text-3xl text-muted" aria-hidden>
                    /
                  </span>
                  <label className="flex-1">
                    <span className="text-sm font-semibold text-muted">Diastolic</span>
                    <input
                    inputMode="numeric"
                    value={dia ?? ''}
                    onChange={(e) => onChange({ ...answers, bpReading: `${sys ?? ''}/${e.target.value.replace(/\D/g, '').slice(0, 3)}` })}
                    className="mt-1 h-16 w-full rounded-2xl border-2 border-line bg-surface text-center text-[28px] font-bold outline-none focus:border-brand" />
                  
                  </label>
                </div>
              }

              {step === 'bpReason' &&
              <div role="radiogroup" aria-label={q.title} className="space-y-3">
                  {bpReasons.map((r) =>
                <ChoiceButton key={r} label={r} selected={answers.bpReason === r} onSelect={() => onChange({ ...answers, bpReason: r })} />
                )}
                  <p className="pt-1 text-sm text-muted">Sesi records BP as unavailable. It never estimates a reading.</p>
                </div>
              }
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="sticky bottom-0 grid grid-cols-[auto_1fr] gap-3 border-t border-line bg-canvas px-5 py-3">
        <Button variant="secondary" icon={<MicIcon />} onClick={() => setVoiceOpen(true)} className="px-4">
          Speak answer
        </Button>
        <Button onClick={next} disabled={!isAnswered(step, answers)} icon={<ArrowRightIcon />} className="flex-row-reverse">
          Continue
        </Button>
      </div>

      <VoiceSheet open={voiceOpen} onClose={() => setVoiceOpen(false)} onConfirm={() => applyVoice(true)} onEdit={() => applyVoice(false)} />
    </div>);

}

function getSteps(a: ScreeningAnswers): StepKey[] {
  const s: StepKey[] = ['gestation', 'headache', 'vision', 'swelling', 'bpAvailable'];
  if (a.bpAvailable === true) s.push('bpReading');
  if (a.bpAvailable === false) s.push('bpReason');
  return s;
}

function isAnswered(k: StepKey, a: ScreeningAnswers): boolean {
  switch (k) {
    case 'gestation':
      return a.gestation !== null && a.gestation > 0;
    case 'headache':
    case 'vision':
    case 'swelling':
      return a[k] !== null;
    case 'bpAvailable':
      return a.bpAvailable !== null;
    case 'bpReading':
      return isValidBp(a.bpReading);
    case 'bpReason':
      return a.bpReason !== null;
  }
}

function clamp(n: number): number {
  return Math.max(1, Math.min(42, n));
}