import React from 'react';
import { chwActivity } from '../../data/district';

export function ChwActivityTable() {
  return (
    <section className="overflow-x-auto rounded-2xl border border-line bg-surface" aria-labelledby="chw-heading">
      <h2 id="chw-heading" className="px-6 pt-6 text-lg font-semibold text-ink">
        CHW activity · last 30 days
      </h2>
      <table className="mt-3 w-full min-w-[640px] text-left text-[15px]">
        <thead>
          <tr className="border-y border-line text-sm text-muted">
            <th className="px-6 py-2.5 font-semibold">Community Health Worker</th>
            <th className="px-4 py-2.5 text-right font-semibold">Screenings</th>
            <th className="px-4 py-2.5 text-right font-semibold">Referrals</th>
            <th className="px-4 py-2.5 text-right font-semibold">Follow-ups</th>
            <th className="px-6 py-2.5 font-semibold">Last sync</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {chwActivity.map((c) => {
            const stale = c.lastSync.includes('days');
            return (
              <tr key={c.name}>
                <td className="px-6 py-3">
                  <p className="font-semibold text-ink">{c.name}</p>
                  <p className="text-sm text-muted">{c.ward}</p>
                </td>
                <td className="px-4 py-3 text-right tabular-nums">{c.screenings}</td>
                <td className="px-4 py-3 text-right tabular-nums">{c.referrals}</td>
                <td className="px-4 py-3 text-right tabular-nums">{c.followUps}</td>
                <td className={`px-6 py-3 ${stale ? 'font-semibold text-warn' : 'text-muted'}`}>{c.lastSync}</td>
              </tr>);

          })}
        </tbody>
      </table>
    </section>);

}