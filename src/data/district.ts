import type { Barrier, ChwActivity, OutstandingReferral } from '../types/sesi';

export const districtBaseline = {
  screenings: 124,
  referrals: 31,
  completed: 25,
  awaiting: 4,
  followUp: 2,
  medianDays: 1.4
};

export const barriers: Barrier[] = [
{ label: 'BP unavailable', count: 9 },
{ label: 'Transport barriers', count: 5 },
{ label: 'Unable to contact', count: 3 }];


export const outstandingReferrals: OutstandingReferral[] = [
{ id: 'R-2019', patient: 'Patient #1082', chw: 'Nkhensani M.', status: 'Follow-up required', daysOpen: 2, note: 'Attendance not confirmed' },
{ id: 'R-2011', patient: 'Patient #1069', chw: 'Thabo N.', status: 'Follow-up required', daysOpen: 4, note: 'Transport barrier' },
{ id: 'R-2033', patient: 'Patient #1024', chw: 'Nkhensani M.', status: 'Awaiting attendance', daysOpen: 1, note: 'Received by clinic' },
{ id: 'R-2046', patient: 'Patient #1077', chw: 'Thabo N.', status: 'Awaiting attendance', daysOpen: 1, note: 'Not yet acknowledged' },
{ id: 'R-2048', patient: 'Patient #1061', chw: 'Lindiwe K.', status: 'Awaiting attendance', daysOpen: 0, note: 'Not yet acknowledged' },
{ id: 'R-2040', patient: 'Patient #1058', chw: 'Precious S.', status: 'Awaiting attendance', daysOpen: 2, note: 'Received by clinic' }];


export const chwActivity: ChwActivity[] = [
{ name: 'Nkhensani M.', ward: 'Ward 16 · Lenyenye', screenings: 34, referrals: 9, followUps: 7, lastSync: 'Today 11:46' },
{ name: 'Thabo N.', ward: 'Ward 14 · Mariveni', screenings: 29, referrals: 8, followUps: 5, lastSync: 'Today 09:12' },
{ name: 'Lindiwe K.', ward: 'Ward 15 · Khujwana', screenings: 26, referrals: 6, followUps: 4, lastSync: 'Today 10:03' },
{ name: 'Precious S.', ward: 'Ward 17 · Dan Village', screenings: 21, referrals: 5, followUps: 3, lastSync: 'Yesterday 16:40' },
{ name: 'Sipho R.', ward: 'Ward 19 · Nkowankowa', screenings: 14, referrals: 3, followUps: 1, lastSync: '3 days ago' }];