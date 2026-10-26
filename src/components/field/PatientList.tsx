import React from 'react';
import { ChevronRightIcon } from 'lucide-react';
import type { Patient } from '../../types/sesi';

interface PatientListProps {
  patients: Patient[];
  onSelect: (p: Patient) => void;
}

export function PatientList({ patients, onSelect }: PatientListProps) {
  return (
    <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
      {patients.map((p) =>
      <li key={p.id}>
          <button
          onClick={() => onSelect(p)}
          className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors duration-150 hover:bg-subtle">
          
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-soft text-sm font-bold text-brand-dark" aria-hidden>
              {initials(p.name)}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-semibold text-ink">{p.name}</span>
              <span className="block truncate text-sm text-muted">
                {p.sex}, {p.age} · {p.village}
              </span>
              <span className="block truncate text-sm text-muted">{p.note}</span>
            </span>
            <ChevronRightIcon className="h-5 w-5 shrink-0 text-muted" aria-hidden />
          </button>
        </li>
      )}
    </ul>);

}

function initials(name: string): string {
  if (name.startsWith('Patient #')) return name.slice(9, 11);
  return name.
  split(' ').
  map((n) => n[0]).
  slice(0, 2).
  join('');
}