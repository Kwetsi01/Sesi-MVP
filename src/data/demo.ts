import type { ReferralStage } from '../types/sesi';

export const DEMO = {
  chw: 'Nkhensani M.',
  chwFirst: 'Nkhensani',
  clinic: 'Demo PHC Clinic',
  date: '4 October 2026',
  time: '11:42',
  category: 'Maternal Health',
  referralId: 'R-2050',
  district: 'Mopani District'
};

export const stageTimes: Record<ReferralStage, string> = {
  created: '11:42',
  sent: '11:46',
  acknowledged: '12:05',
  attended: '13:18',
  not_attended: '16:00',
  closed: '13:24'
};