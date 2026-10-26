import { useState } from 'react';
import { useDemo } from '../contexts/DemoContext';
import { followUps as seedFollowUps } from '../data/fieldReferrals';
import type { FollowUp } from '../types/sesi';

export function useTaskItems() {
  const { referral } = useDemo();
  const [items, setItems] = useState<FollowUp[]>(seedFollowUps);
  const [demoRecorded, setDemoRecorded] = useState(false);

  const demoItem: FollowUp | null =
  referral && referral.stage === 'not_attended' && !demoRecorded ?
  { id: 'F-demo', patient: referral.patient.name, category: 'Maternal Health', referred: '4 October', issue: 'Did not attend clinic' } :
  null;

  return {
    items: demoItem ? [demoItem, ...items] : items,
    remove: (id: string) => id === 'F-demo' ? setDemoRecorded(true) : setItems((prev) => prev.filter((i) => i.id !== id))
  };
}