import React from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/Button';
import type { OutstandingReferral } from '../../types/sesi';

interface OutstandingListProps {
  items: OutstandingReferral[];
  limit?: number;
}

export function OutstandingList({ items, limit }: OutstandingListProps) {
  const shown = limit ? items.slice(0, limit) : items;
  return (
    <ul className="divide-y divide-line">
      {shown.map((r) => {
        const followUp = r.status === 'Follow-up required';
        return (
          <li key={r.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 py-3">
            <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${followUp ? 'bg-[#E08A12]' : 'bg-brand'}`} aria-hidden />
            <div className="min-w-[180px] flex-1">
              <p className="font-semibold text-ink">{r.patient}</p>
              <p className="text-sm text-muted">
                {r.chw} · {r.note}
              </p>
            </div>
            <div className="w-40 text-sm">
              <p className={`font-semibold ${followUp ? 'text-warn' : 'text-ink'}`}>{r.status}</p>
              <p className="text-muted">{r.daysOpen === 0 ? 'Opened today' : `Open ${r.daysOpen} ${r.daysOpen === 1 ? 'day' : 'days'}`}</p>
            </div>
            <Button
              size="md"
              variant="secondary"
              className="h-9 px-3 text-sm"
              onClick={() => toast.success(`Reminder sent to ${r.chw}`, { description: `Follow up on ${r.patient}` })}>
              
              Remind CHW
            </Button>
          </li>);

      })}
    </ul>);

}