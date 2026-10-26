import React from 'react';
import { ArchiveIcon, ClipboardListIcon, InboxIcon } from 'lucide-react';

export type ClinicView = 'inbox' | 'active' | 'completed';

interface ClinicSidebarProps {
  view: ClinicView;
  onChange: (v: ClinicView) => void;
  counts: Record<ClinicView, number>;
}

export const clinicViews: {id: ClinicView;label: string;Icon: typeof InboxIcon;}[] = [
{ id: 'inbox', label: 'Referral Inbox', Icon: InboxIcon },
{ id: 'active', label: 'Active', Icon: ClipboardListIcon },
{ id: 'completed', label: 'Completed', Icon: ArchiveIcon }];


export function ClinicSidebar({ view, onChange, counts }: ClinicSidebarProps) {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-line bg-surface md:flex">
      <div className="border-b border-line px-5 py-5">
        <p className="text-lg font-bold text-ink">Sesi Clinic</p>
        <p className="text-sm text-muted">Demo PHC Clinic</p>
      </div>
      <nav aria-label="Sesi Clinic" className="flex-1 space-y-1 p-3">
        {clinicViews.map(({ id, label, Icon }) => {
          const active = view === id;
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              aria-current={active ? 'page' : undefined}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium transition-colors duration-150 ${
              active ? 'bg-brand-soft text-brand-dark' : 'text-ink hover:bg-subtle'}`
              }>
              
              <Icon className="h-5 w-5" aria-hidden />
              <span className="flex-1 text-left">{label}</span>
              <span className={`min-w-6 rounded-full px-2 py-0.5 text-center text-xs font-bold tabular-nums ${id === 'inbox' && counts.inbox > 0 ? 'bg-urgent text-white' : 'bg-subtle text-muted'}`}>
                {counts[id]}
              </span>
            </button>);

        })}
      </nav>
      <p className="border-t border-line px-5 py-4 text-xs leading-relaxed text-muted">
        Sesi Clinic receives and closes referrals. Clinical notes and prescribing stay in your existing systems.
      </p>
    </aside>);

}