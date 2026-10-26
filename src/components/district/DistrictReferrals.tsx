import React, { useState } from 'react';
import { useDistrictMetrics } from '../../hooks/useDistrictMetrics';
import { OutstandingList } from './OutstandingList';

type Filter = 'all' | 'Awaiting attendance' | 'Follow-up required';

export function DistrictReferrals() {
  const { outstanding } = useDistrictMetrics();
  const [filter, setFilter] = useState<Filter>('all');
  const items = filter === 'all' ? outstanding : outstanding.filter((r) => r.status === filter);
  const filters: {id: Filter;label: string;}[] = [
  { id: 'all', label: `All outstanding (${outstanding.length})` },
  { id: 'Awaiting attendance', label: 'Awaiting attendance' },
  { id: 'Follow-up required', label: 'Follow-up required' }];


  return (
    <section className="rounded-2xl border border-line bg-surface p-6" aria-labelledby="ref-heading">
      <h2 id="ref-heading" className="text-lg font-semibold text-ink">
        Unresolved referrals
      </h2>
      <div className="mt-3 flex flex-wrap gap-2" role="tablist">
        {filters.map((f) =>
        <button
          key={f.id}
          role="tab"
          aria-selected={filter === f.id}
          onClick={() => setFilter(f.id)}
          className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors duration-150 ${filter === f.id ? 'bg-ink text-white' : 'bg-subtle text-ink hover:bg-line'}`}>
          
            {f.label}
          </button>
        )}
      </div>
      <div className="mt-3">
        <OutstandingList items={items} />
      </div>
    </section>);

}