import React from 'react';
import { CircleCheckIcon as CloudCheckIcon, RefreshCwIcon, WifiIcon, WifiOffIcon } from 'lucide-react';
import { useDemo } from '../../contexts/DemoContext';

export function FieldStatusBar() {
  const { online, syncState } = useDemo();
  const waiting = syncState === 'waiting';

  return (
    <header className="shrink-0">
      <div className="flex items-center justify-between border-b border-line bg-surface px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-sm font-bold text-white">S</span>
          <span className="font-semibold text-ink">Sesi Field</span>
        </div>
        <div aria-live="polite">
          {!online ?
          <span className="flex items-center gap-1.5 rounded-full bg-warn-soft px-3 py-1.5 text-sm font-semibold text-warn">
              <WifiOffIcon className="h-4 w-4" aria-hidden />
              Offline
            </span> :
          syncState === 'syncing' ?
          <span className="flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1.5 text-sm font-semibold text-brand-dark">
              <RefreshCwIcon className="h-4 w-4 animate-spin" aria-hidden />
              Syncing
            </span> :
          syncState === 'synced' ?
          <span className="flex items-center gap-1.5 rounded-full bg-ok-soft px-3 py-1.5 text-sm font-semibold text-ok">
              <CloudCheckIcon className="h-4 w-4" aria-hidden />
              Synced
            </span> :

          <span className="flex items-center gap-1.5 rounded-full bg-ok-soft px-3 py-1.5 text-sm font-semibold text-ok">
              <WifiIcon className="h-4 w-4" aria-hidden />
              Online
            </span>
          }
        </div>
      </div>
      {!online &&
      <p className="bg-warn-soft px-4 py-2 text-sm text-warn">
          {waiting ? '1 referral saved on this phone · will sync when online' : 'No connection. Your work is saved on this phone.'}
        </p>
      }
    </header>);

}