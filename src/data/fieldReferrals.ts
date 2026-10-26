import type { FieldReferral, FollowUp } from '../types/sesi';

export const fieldReferrals: FieldReferral[] = [
{ id: 'R-2033', patient: 'Patient #1024', category: 'Maternal Health', destination: 'Demo PHC Clinic', referred: 'Referred yesterday', tone: 'urgent', group: 'active', status: 'Received by clinic', detail: 'Attendance: Awaiting' },
{ id: 'R-2019', patient: 'Patient #1082', category: 'Maternal Health', destination: 'Demo PHC Clinic', referred: 'Referred 2 days ago', tone: 'attention', group: 'followup', status: 'Attendance not confirmed', detail: 'Follow-up required' },
{ id: 'R-1998', patient: 'Patient #0991', category: 'Maternal Health', destination: 'Demo PHC Clinic', referred: 'Referred 28 September', tone: 'routine', group: 'completed', status: 'Attended 29 September', detail: 'Closed' },
{ id: 'R-1984', patient: 'Patient #0988', category: 'Maternal Health', destination: 'Demo PHC Clinic', referred: 'Referred 24 September', tone: 'urgent', group: 'completed', status: 'Attended 24 September', detail: 'Closed' }];


export const followUps: FollowUp[] = [
{ id: 'F-1024', patient: 'Patient #1024', category: 'Maternal Health', referred: '3 October', issue: 'Attendance not confirmed' },
{ id: 'F-1082', patient: 'Patient #1082', category: 'Maternal Health', referred: '2 October', issue: 'Attendance not confirmed' },
{ id: 'F-1069', patient: 'Patient #1069', category: 'Maternal Health', referred: '30 September', issue: 'Transport barrier reported' }];