import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, MicIcon, PencilIcon } from 'lucide-react';
import { useDemo } from '../../contexts/DemoContext';
import { voiceTranscript } from '../../data/screening';
import { Button } from '../ui/Button';
import { Sheet } from '../ui/Sheet';
import type { Language } from '../../types/sesi';

interface VoiceSheetProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onEdit: () => void;
}

type Phase = 'ready' | 'listening' | 'review';

const words = voiceTranscript.split(' ');

const captured = [
{ label: 'Gestation', value: '34 weeks' },
{ label: 'Severe headache', value: 'Yes' },
{ label: 'Visual disturbance', value: 'Yes' }];


export function VoiceSheet({ open, onClose, onConfirm, onEdit }: VoiceSheetProps) {
  const { language, setLanguage } = useDemo();
  const [phase, setPhase] = useState<Phase>('ready');
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!open) {
      setPhase('ready');
      setCount(0);
    }
  }, [open]);

  useEffect(() => {
    if (phase !== 'listening') return;
    if (count >= words.length) {
      const t = window.setTimeout(() => setPhase('review'), 600);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => setCount((c) => c + 1), 130);
    return () => window.clearTimeout(t);
  }, [phase, count]);

  return (
    <Sheet open={open} onClose={onClose} title="Speak to Sesi">
      {phase !== 'review' &&
      <div>
          <div className="flex rounded-xl bg-subtle p-1" role="radiogroup" aria-label="Spoken language">
            {(['en', 'ts'] as Language[]).map((l) =>
          <button
            key={l}
            role="radio"
            aria-checked={language === l}
            onClick={() => setLanguage(l)}
            disabled={phase === 'listening'}
            className={`h-10 flex-1 rounded-lg text-[15px] font-semibold transition-colors duration-150 ${
            language === l ? 'bg-surface text-ink shadow-sm' : 'text-muted'}`
            }>
            
                {l === 'en' ? 'English' : 'Xitsonga'}
              </button>
          )}
          </div>
          {language === 'ts' &&
        <p className="mt-2 rounded-xl bg-warn-soft px-3 py-2 text-sm text-warn">
              Xitsonga voice is a preview and not yet validated. Check every captured answer.
            </p>
        }

          <div className="mt-6 flex flex-col items-center">
            <button
            onClick={() => phase === 'ready' && setPhase('listening')}
            aria-label={phase === 'listening' ? 'Listening' : 'Start speaking'}
            className="relative grid h-24 w-24 place-items-center rounded-full bg-brand text-white transition-transform duration-150 ease-out active:scale-95">
            
              {phase === 'listening' &&
            <motion.span
              className="absolute inset-0 rounded-full bg-brand"
              initial={{ scale: 1, opacity: 0.35 }}
              animate={{ scale: 1.45, opacity: 0 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
              aria-hidden />

            }
              <MicIcon className="relative h-10 w-10" />
            </button>
            <p className="mt-3 font-semibold text-ink">{phase === 'listening' ? 'Listening…' : 'Tap and describe the situation'}</p>
          </div>

          <div className="mt-5 min-h-[96px] rounded-2xl bg-subtle p-4 text-[17px] leading-relaxed text-ink" aria-live="polite">
            {phase === 'ready' ?
          <span className="text-muted">e.g. “She's 34 weeks pregnant and has a severe headache…”</span> :

          <>
                {language === 'ts' && <span className="mb-1 block text-xs font-semibold text-muted">Shown translated to English (preview)</span>}“{words.slice(0, count).join(' ')}”
              </>
          }
          </div>
          <p className="mt-3 text-center text-xs text-muted">Simulated for this prototype. No audio is recorded.</p>
        </div>
      }

      {phase === 'review' &&
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, ease: 'easeOut' }}>
          <p className="rounded-2xl bg-subtle p-4 text-[15px] italic leading-relaxed text-muted">“{voiceTranscript}”</p>
          <h3 className="mt-5 text-xl font-bold text-ink">I captured:</h3>
          <ul className="mt-3 divide-y divide-line rounded-2xl border border-line">
            {captured.map((c, i) =>
          <motion.li
            key={c.label}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.18, delay: i * 0.05, ease: 'easeOut' }}
            className="flex items-center justify-between px-4 py-3.5">
            
                <span className="text-[15px] text-muted">{c.label}</span>
                <span className="flex items-center gap-2 font-semibold text-ink">
                  {c.value}
                  <CheckIcon className="h-5 w-5 text-ok" strokeWidth={3} aria-label="captured" />
                </span>
              </motion.li>
          )}
          </ul>
          <p className="mt-5 text-lg font-semibold text-ink">Is this correct?</p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Button variant="secondary" icon={<PencilIcon />} onClick={onEdit}>
              Edit
            </Button>
            <Button icon={<CheckIcon />} onClick={onConfirm}>
              Confirm
            </Button>
          </div>
          <p className="mt-4 text-center text-xs text-muted">Sesi structures what you say. You confirm every answer.</p>
        </motion.div>
      }
    </Sheet>);

}