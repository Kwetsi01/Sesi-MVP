import React, { useState } from 'react';
import { SearchIcon } from 'lucide-react';
import { PatientList } from '../PatientList';
import type { Patient } from '../../../types/sesi';

interface PatientsScreenProps {
  patients: Patient[];
  onSelect: (p: Patient) => void;
}

export function PatientsScreen({ patients, onSelect }: PatientsScreenProps) {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const results = q ? patients.filter((p) => `${p.name} ${p.village}`.toLowerCase().includes(q)) : patients;

  return (
    <div className="px-5 pb-6 pt-6">
      <h1 className="text-[26px] font-bold text-ink">Patients</h1>
      <p className="mt-1 text-[15px] text-muted">Tap a patient to start a visit.</p>
      <label className="relative mt-4 block">
        <span className="sr-only">Search patients</span>
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or village"
          className="h-14 w-full rounded-2xl border-2 border-line bg-surface pl-12 pr-4 text-[17px] outline-none transition-colors duration-150 placeholder:text-muted focus:border-brand" />
        
      </label>
      <div className="mt-4">
        {results.length ? <PatientList patients={results} onSelect={onSelect} /> : <p className="py-8 text-center text-muted">No patients match “{query}”.</p>}
      </div>
    </div>);

}