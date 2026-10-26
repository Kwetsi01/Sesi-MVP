import React, { useState } from 'react';
import { DEMO } from '../data/demo';
import { DistrictOverview } from '../components/district/DistrictOverview';
import { DistrictReferrals } from '../components/district/DistrictReferrals';
import { ChwActivityTable } from '../components/district/ChwActivityTable';
import { DistrictReport } from '../components/district/DistrictReport';

type Tab = 'overview' | 'referrals' | 'chw' | 'report';

const tabs: {id: Tab;label: string;}[] = [
{ id: 'overview', label: 'Overview' },
{ id: 'referrals', label: 'Referrals' },
{ id: 'chw', label: 'CHW Activity' },
{ id: 'report', label: 'Report' }];


export function DistrictApp() {
  const [tab, setTab] = useState<Tab>('overview');
  return (
    <div className="flex flex-1 flex-col bg-canvas">
      <header className="border-b border-line bg-surface print:hidden">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-4 px-6 pt-6">
          <div>
            <h1 className="text-2xl font-bold text-ink">Sesi District</h1>
            <p className="text-[15px] text-muted">{DEMO.district} · Wards 14–19 · Last 30 days</p>
          </div>
        </div>
        <nav aria-label="Sesi District" className="mx-auto mt-4 flex max-w-6xl gap-6 px-6">
          {tabs.map((t) =>
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            aria-current={tab === t.id ? 'page' : undefined}
            className={`-mb-px whitespace-nowrap border-b-2 pb-3 text-[15px] font-semibold transition-colors duration-150 ${
            tab === t.id ? 'border-brand text-ink' : 'border-transparent text-muted hover:text-ink'}`
            }>
            
              {t.label}
            </button>
          )}
        </nav>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-6">
        {tab === 'overview' && <DistrictOverview />}
        {tab === 'referrals' && <DistrictReferrals />}
        {tab === 'chw' && <ChwActivityTable />}
        {tab === 'report' && <DistrictReport />}
      </main>
    </div>);

}