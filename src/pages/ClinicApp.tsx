import React, { useState } from 'react';
import { toast } from 'sonner';
import { useClinicReferrals } from '../hooks/useClinicReferrals';
import { clinicGroup } from '../utils/referral';
import { ClinicSidebar, clinicViews, type ClinicView } from '../components/clinic/ClinicSidebar';
import { ClinicReferralList } from '../components/clinic/ClinicReferralList';
import { ClinicReferralDetail } from '../components/clinic/ClinicReferralDetail';
import type { ClinicReferral, ReferralStage } from '../types/sesi';

const titles: Record<ClinicView, {title: string;empty: string;}> = {
  inbox: { title: 'Referral Inbox', empty: 'No new referrals' },
  active: { title: 'Active referrals', empty: 'No active referrals' },
  completed: { title: 'Completed referrals', empty: 'Nothing completed yet' }
};

const toasts: Partial<Record<ReferralStage, string>> = {
  acknowledged: 'Referral acknowledged · CHW notified',
  attended: 'Attendance recorded · CHW notified',
  not_attended: 'Non-attendance recorded · follow-up sent to CHW',
  closed: 'Referral completed and closed'
};

export function ClinicApp() {
  const { all, updateStage } = useClinicReferrals();
  const [view, setView] = useState<ClinicView>('inbox');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const counts: Record<ClinicView, number> = {
    inbox: all.filter((r) => clinicGroup(r.stage) === 'inbox').length,
    active: all.filter((r) => clinicGroup(r.stage) === 'active').length,
    completed: all.filter((r) => clinicGroup(r.stage) === 'completed').length
  };

  const list = all.
  filter((r) => clinicGroup(r.stage) === view).
  sort((a, b) => a.priority === b.priority ? 0 : a.priority === 'Urgent' ? -1 : 1);
  const selected = list.find((r) => r.id === selectedId) ?? list[0] ?? null;

  function handleAction(r: ClinicReferral, stage: ReferralStage) {
    updateStage(r, stage);
    setSelectedId(r.id);
    setView(clinicGroup(stage));
    const msg = toasts[stage];
    if (msg) toast.success(msg, { description: r.patient });
  }

  return (
    <div className="flex flex-1 bg-canvas">
      <ClinicSidebar view={view} onChange={setView} counts={counts} />
      <main className="flex min-w-0 flex-1 flex-col">
        <header className="border-b border-line bg-surface px-6 py-5">
          <h1 className="text-2xl font-bold text-ink">{titles[view].title}</h1>
          <p className="text-[15px] text-muted">Tuesday, 4 October · Demo PHC Clinic</p>
          <div className="mt-3 flex gap-2 md:hidden" role="tablist">
            {clinicViews.map((v) =>
            <button
              key={v.id}
              role="tab"
              aria-selected={view === v.id}
              onClick={() => setView(v.id)}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-semibold ${view === v.id ? 'bg-brand text-white' : 'bg-subtle text-ink'}`}>
              
                {v.label} {counts[v.id]}
              </button>
            )}
          </div>
        </header>
        <div className="grid flex-1 gap-6 p-6 lg:grid-cols-[minmax(300px,380px)_1fr]">
          <ClinicReferralList referrals={list} selectedId={selected?.id ?? null} onSelect={setSelectedId} emptyLabel={titles[view].empty} />
          <div className="min-w-0">
            {selected ?
            <ClinicReferralDetail key={selected.id} referral={selected} onAction={(stage) => handleAction(selected, stage)} /> :

            <div className="hidden h-full place-items-center rounded-2xl border border-dashed border-line text-muted lg:grid">Select a referral to view it</div>
            }
          </div>
        </div>
      </main>
    </div>);

}