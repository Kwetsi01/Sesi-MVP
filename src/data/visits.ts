import { barriers } from './screening';

export type VisitTypeId = 'routine' | 'maternal' | 'followup';

export interface GuidedQuestion {
  id: string;
  title: string;
  hint?: string;
  options: string[];
  multi?: boolean;
  showIf?: (answers: Record<string, string[]>) => boolean;
}

export const visitTypes: {id: VisitTypeId;label: string;cta: string;}[] = [
{ id: 'routine', label: 'Routine household visit', cta: 'Start visit' },
{ id: 'maternal', label: 'Maternal-health screening', cta: 'Start screening' },
{ id: 'followup', label: 'Referral follow-up', cta: 'Start follow-up' }];


export const routineQuestions: GuidedQuestion[] = [
{ id: 'members', title: 'How many people live in this household?', options: ['1–2', '3–4', '5–6', '7 or more'] },
{ id: 'unwell', title: 'Is anyone in the household unwell today?', options: ['Yes', 'No'] },
{ id: 'pregnant', title: 'Is anyone in the household pregnant?', options: ['Yes', 'No', 'Unsure'] },
{ id: 'immunisation', title: 'Are any children under 5 behind on immunisations?', options: ['Yes', 'No', 'No children under 5'] },
{ id: 'medication', title: 'Is anyone missing their chronic medication collection?', options: ['Yes', 'No'] },
{
  id: 'education',
  title: 'Which health education did you give?',
  hint: 'Select all that apply.',
  multi: true,
  options: ['Nutrition', 'Hygiene and sanitation', 'Family planning', 'Immunisation', 'Medication adherence', 'None today']
}];


export const followUpQuestions: GuidedQuestion[] = [
{ id: 'contact', title: 'Were you able to speak with the patient?', options: ['Yes, in person', 'Yes, by phone', 'Could not contact'] },
{
  id: 'attended',
  title: 'Has the patient been to the clinic since the referral?',
  options: ['Already attended', 'Not yet', 'Unsure'],
  showIf: (a) => !!a.contact && a.contact[0] !== 'Could not contact'
},
{
  id: 'plan',
  title: 'Will the patient attend the clinic?',
  options: ['Will attend', 'Unable to attend'],
  showIf: (a) => !!a.attended && a.attended[0] !== 'Already attended'
},
{
  id: 'barrier',
  title: 'What is stopping them from attending?',
  hint: 'This is shared anonymously with district reporting.',
  options: barriers,
  showIf: (a) => !!a.plan && a.plan[0] === 'Unable to attend'
}];