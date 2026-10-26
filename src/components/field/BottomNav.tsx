import React from 'react';
import { HouseIcon, ListChecksIcon, SendIcon, UserIcon, UsersIcon } from 'lucide-react';
import type { FieldTab } from '../../hooks/useFieldFlow';

const items: {id: FieldTab;label: string;Icon: typeof HouseIcon;}[] = [
{ id: 'home', label: 'Home', Icon: HouseIcon },
{ id: 'patients', label: 'Patients', Icon: UsersIcon },
{ id: 'referrals', label: 'Referrals', Icon: SendIcon },
{ id: 'tasks', label: 'Tasks', Icon: ListChecksIcon },
{ id: 'profile', label: 'Profile', Icon: UserIcon }];


interface BottomNavProps {
  active: FieldTab;
  onChange: (t: FieldTab) => void;
  taskCount: number;
}

export function BottomNav({ active, onChange, taskCount }: BottomNavProps) {
  return (
    <nav aria-label="Sesi Field" className="grid shrink-0 grid-cols-5 border-t border-line bg-surface pb-1">
      {items.map(({ id, label, Icon }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            aria-current={isActive ? 'page' : undefined}
            className={`relative flex flex-col items-center gap-1 py-2.5 text-xs font-medium transition-colors duration-150 ${
            isActive ? 'text-brand-dark' : 'text-muted hover:text-ink'}`
            }>
            
            <span className={`grid h-8 w-14 place-items-center rounded-full transition-colors duration-150 ${isActive ? 'bg-brand-soft' : ''}`}>
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            {label}
            {id === 'tasks' && taskCount > 0 &&
            <span className="absolute right-[18%] top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-urgent px-1 text-[11px] font-bold text-white">
                {taskCount}
              </span>
            }
          </button>);

      })}
    </nav>);

}