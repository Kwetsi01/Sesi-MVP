import React, { useState } from 'react';
import { PlusIcon, SearchIcon } from 'lucide-react';
import { Button } from '../../ui/Button';
import { FlowHeader } from '../FlowHeader';
import { PatientList } from '../PatientList';
import type { Patient } from '../../../types/sesi';

interface FindPatientScreenProps {
  patients: Patient[];
  onBack: () => void;
  onSelect: (p: Patient) => void;
  onAdd: () => void;
}

export function FindPatientScreen({ patients, onBack, onSelect, onAdd }: FindPatientScreenProps) {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const results = q ? patients.filter((p) => `${p.name} ${p.village}`.toLowerCase().includes(q)) : patients;

  return (
    <div className="flex min-h-full flex-col">
      <FlowHeader title="Start household visit" onBack={onBack} />
      <div className="flex-1 px-5 pb-6 pt-2">
        <h2 className="text-2xl font-bold text-ink">Find patient</h2>
        <label className="relative mt-4 block">
          <span className="sr-only">Search existing patient</span>
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search existing patient"
            className="h-14 w-full rounded-2xl border-2 border-line bg-surface pl-12 pr-4 text-[17px] text-ink outline-none transition-colors duration-150 placeholder:text-muted focus:border-brand" />
          
        </label>
        <div className="mt-4">
          {results.length > 0 ?
          <PatientList patients={results} onSelect={onSelect} /> :

          <div className="rounded-2xl border border-dashed border-line bg-surface px-5 py-8 text-center">
              <p className="font-semibold text-ink">No patient found</p>
              <p className="mt-1 text-sm text-muted">Check the spelling, or add them as a new patient.</p>
            </div>
          }
        </div>
      </div>
      <div className="sticky bottom-0 border-t border-line bg-canvas px-5 py-3">
        <Button variant="secondary" className="w-full" icon={<PlusIcon />} onClick={onAdd}>
          Add new patient
        </Button>
      </div>
    </div>);

}