import type { ClinicReferral } from '../types/sesi';

export const clinicReferrals: ClinicReferral[] = [
{
  id: 'R-2048', patient: 'Patient #1061', age: 29, village: 'Khujwana', category: 'Maternal Health', priority: 'Routine',
  referredDate: '4 Oct 2026', referredTime: '09:15', chw: 'Lindiwe K.',
  escalation: ['No antenatal booking recorded at 16 weeks'],
  findings: [
  { label: 'Gestation', value: '16 weeks' },
  { label: 'Antenatal booking', value: 'Not yet booked', flagged: true },
  { label: 'Severe headache', value: 'No' },
  { label: 'BP', value: '118/76' }],

  stage: 'sent'
},
{
  id: 'R-2046', patient: 'Patient #1077', age: 35, village: 'Mariveni', category: 'Maternal Health', priority: 'Routine',
  referredDate: '3 Oct 2026', referredTime: '14:02', chw: 'Thabo N.',
  escalation: ['Missed scheduled antenatal visit'],
  findings: [
  { label: 'Gestation', value: '28 weeks' },
  { label: 'Missed visit', value: 'Yes', flagged: true },
  { label: 'Swelling', value: 'No' },
  { label: 'BP', value: '124/80' }],

  stage: 'sent'
},
{
  id: 'R-2033', patient: 'Patient #1024', age: 24, village: 'Lenyenye', category: 'Maternal Health', priority: 'Urgent',
  referredDate: '3 Oct 2026', referredTime: '15:10', chw: 'Nkhensani M.',
  escalation: ['Reduced fetal movement reported'],
  findings: [
  { label: 'Gestation', value: '37 weeks' },
  { label: 'Fetal movement', value: 'Reduced', flagged: true },
  { label: 'BP', value: 'Not available' },
  { label: 'Reason', value: 'Equipment not working' }],

  stage: 'acknowledged'
},
{
  id: 'R-1998', patient: 'Patient #0991', age: 22, village: 'Dan Village', category: 'Maternal Health', priority: 'Routine',
  referredDate: '28 Sep 2026', referredTime: '10:30', chw: 'Nkhensani M.',
  escalation: ['Antenatal booking overdue'],
  findings: [
  { label: 'Gestation', value: '19 weeks' },
  { label: 'Antenatal booking', value: 'Not yet booked', flagged: true }],

  stage: 'closed'
},
{
  id: 'R-1984', patient: 'Patient #0988', age: 33, village: 'Nkowankowa', category: 'Maternal Health', priority: 'Urgent',
  referredDate: '24 Sep 2026', referredTime: '08:50', chw: 'Thabo N.',
  escalation: ['Vaginal bleeding reported'],
  findings: [
  { label: 'Gestation', value: '30 weeks' },
  { label: 'Bleeding', value: 'Yes', flagged: true }],

  stage: 'closed'
}];