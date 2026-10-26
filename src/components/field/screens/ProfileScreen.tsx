import React from 'react';
import { HardDriveIcon, ShieldCheckIcon } from 'lucide-react';
import { useDemo } from '../../../contexts/DemoContext';
import { DEMO } from '../../../data/demo';
import { safetyPrinciples } from '../../../data/screening';
import type { Language } from '../../../types/sesi';

export function ProfileScreen() {
  const { language, setLanguage, syncState, referral } = useDemo();
  const pending = syncState === 'waiting' ? 1 : 0;

  return (
    <div className="px-5 pb-6 pt-6">
      <div className="flex items-center gap-4">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-brand text-xl font-bold text-white" aria-hidden>
          NM
        </span>
        <div>
          <h1 className="text-[22px] font-bold text-ink">{DEMO.chw}</h1>
          <p className="text-[15px] text-muted">Community Health Worker · Ward 16, Lenyenye</p>
        </div>
      </div>

      <section className="mt-7" aria-labelledby="lang-heading">
        <h2 id="lang-heading" className="text-sm font-semibold text-muted">
          App language
        </h2>
        <div className="mt-2 flex rounded-xl bg-line/60 p-1" role="radiogroup" aria-labelledby="lang-heading">
          {(['en', 'ts'] as Language[]).map((l) =>
          <button
            key={l}
            role="radio"
            aria-checked={language === l}
            onClick={() => setLanguage(l)}
            className={`h-11 flex-1 rounded-lg text-[15px] font-semibold transition-colors duration-150 ${language === l ? 'bg-surface text-ink shadow-sm' : 'text-muted'}`}>
            
              {l === 'en' ? 'English' : 'Xitsonga'}
            </button>
          )}
        </div>
        {language === 'ts' && <p className="mt-2 text-sm text-warn">Xitsonga is a preview in this prototype. Some screens remain in English.</p>}
      </section>

      <section className="mt-7 flex gap-3 rounded-2xl border border-line bg-surface p-4" aria-label="Device storage">
        <HardDriveIcon className="h-6 w-6 shrink-0 text-brand-dark" aria-hidden />
        <div>
          <p className="font-semibold text-ink">Stored on this phone</p>
          <p className="text-[15px] text-muted">
            {12 + (referral ? 1 : 0)} records · {pending ? `${pending} waiting to sync` : 'everything synced'}
          </p>
        </div>
      </section>

      <section className="mt-7" aria-labelledby="safety-heading">
        <h2 id="safety-heading" className="flex items-center gap-2 text-lg font-semibold text-ink">
          <ShieldCheckIcon className="h-5 w-5 text-brand-dark" aria-hidden />
          How Sesi keeps care safe
        </h2>
        <ol className="mt-3 space-y-3">
          {safetyPrinciples.map((p, i) =>
          <li key={p} className="flex gap-3 text-[15px] text-ink">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-soft text-xs font-bold text-brand-dark">{i + 1}</span>
              {p}
            </li>
          )}
        </ol>
      </section>
    </div>);

}