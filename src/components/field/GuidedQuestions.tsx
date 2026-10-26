import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { ChoiceButton } from '../ui/ChoiceButton';
import { FlowHeader } from './FlowHeader';
import type { GuidedQuestion } from '../../data/visits';
import type { Patient } from '../../types/sesi';

interface GuidedQuestionsProps {
  title: string;
  patient: Patient;
  context?: React.ReactNode;
  questions: GuidedQuestion[];
  onExit: () => void;
  onComplete: (answers: Record<string, string[]>) => void;
}

export function GuidedQuestions({ title, patient, context, questions, onExit, onComplete }: GuidedQuestionsProps) {
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [index, setIndex] = useState(0);

  const visible = questions.filter((q) => !q.showIf || q.showIf(answers));
  const q = visible[Math.min(index, visible.length - 1)];
  const selected = answers[q.id] ?? [];

  function choose(option: string) {
    let nextValues: string[];
    if (!q.multi) nextValues = [option];else
    if (option === 'None today') nextValues = selected.includes(option) ? [] : [option];else
    {
      const without = selected.filter((s) => s !== 'None today');
      nextValues = without.includes(option) ? without.filter((s) => s !== option) : [...without, option];
    }
    // Clear answers to later questions whose visibility may change
    const idx = questions.findIndex((x) => x.id === q.id);
    const cleaned: Record<string, string[]> = {};
    questions.slice(0, idx).forEach((x) => answers[x.id] && (cleaned[x.id] = answers[x.id]));
    cleaned[q.id] = nextValues;
    setAnswers(q.multi ? { ...answers, [q.id]: nextValues } : cleaned);
  }

  function next() {
    const nowVisible = questions.filter((x) => !x.showIf || x.showIf(answers));
    if (index < nowVisible.length - 1) setIndex(index + 1);else
    onComplete(answers);
  }

  function back() {
    if (index > 0) setIndex(index - 1);else
    onExit();
  }

  return (
    <div className="flex min-h-full flex-col">
      <FlowHeader title={title} onBack={back} progress={(index + 1) / visible.length} />
      <p className="px-5 pt-3 text-sm text-muted">
        {patient.name} · {patient.sex}, {patient.age} · {patient.village}
      </p>
      {context && index === 0 && <div className="px-5 pt-3">{context}</div>}

      <div className="flex-1 overflow-hidden px-5 pb-6 pt-3">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}>
            
            <h2 className="text-[24px] font-bold leading-tight text-ink">{q.title}</h2>
            {q.hint && <p className="mt-2 text-[15px] text-muted">{q.hint}</p>}
            {q.multi ?
            <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label={q.title}>
                {q.options.map((o) => {
                const on = selected.includes(o);
                return (
                  <button
                    key={o}
                    type="button"
                    aria-pressed={on}
                    onClick={() => choose(o)}
                    className={`h-12 rounded-full border-2 px-4 text-[15px] font-medium transition-colors duration-150 ${
                    on ? 'border-brand bg-brand-soft text-brand-dark' : 'border-line bg-surface text-ink'}`
                    }>
                    
                      {o}
                    </button>);

              })}
              </div> :

            <div className="mt-6 space-y-3" role="radiogroup" aria-label={q.title}>
                {q.options.map((o) =>
              <ChoiceButton key={o} label={o} selected={selected[0] === o} onSelect={() => choose(o)} />
              )}
              </div>
            }
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="sticky bottom-0 border-t border-line bg-canvas px-5 py-3">
        <Button className="w-full flex-row-reverse" onClick={next} disabled={selected.length === 0} icon={<ArrowRightIcon />}>
          Continue
        </Button>
      </div>
    </div>);

}