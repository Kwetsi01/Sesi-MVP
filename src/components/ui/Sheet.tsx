import React from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';

interface SheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Sheet({ open, onClose, title, children }: SheetProps) {
  const target = typeof document !== 'undefined' ? document.getElementById('phone-overlay') : null;
  const content =
  <AnimatePresence>
      {open &&
    <motion.div
      key="sheet"
      className="absolute inset-0 z-40 flex flex-col justify-end"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      initial={{ opacity: 1 }}
      exit={{ opacity: 1 }}>
      
          <motion.div
        className="absolute inset-0 bg-ink/45"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        onClick={onClose} />
      
          <motion.div
        className="relative max-h-[92%] overflow-y-auto rounded-t-3xl bg-surface px-5 pb-6 pt-3"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}>
        
            <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-line" aria-hidden />
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-ink">{title}</h2>
              <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-10 w-10 place-items-center rounded-full text-muted transition-colors duration-150 hover:bg-subtle hover:text-ink">
            
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
    }
    </AnimatePresence>;

  return target ? createPortal(content, target) : content;
}