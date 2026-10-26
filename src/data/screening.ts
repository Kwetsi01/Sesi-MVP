import type { BpReason, ScreeningAnswers } from '../types/sesi';

export const emptyAnswers: ScreeningAnswers = {
  gestation: null,
  headache: null,
  vision: null,
  swelling: null,
  bpAvailable: null,
  bpReading: '',
  bpReason: null
};

export const bpReasons: BpReason[] = ['Equipment unavailable', 'Equipment not working', 'Patient declined', 'Other'];

export const voiceTranscript =
"She's 34 weeks pregnant. She's had a severe headache since yesterday and says her vision is blurry.";

export const voiceCaptured: Partial<ScreeningAnswers> = {
  gestation: 34,
  headache: 'yes',
  vision: 'yes'
};

export const followUpResults = ['Will attend', 'Unable to attend', 'Already attended', 'Could not contact', 'Other'];

export const barriers = ['Transport', 'Cost', 'Distance', 'Care responsibilities', 'Patient declined', 'Other'];

export const safetyPrinciples = [
'Sesi supports — not replaces — the CHW.',
'Sesi structures information. It does not practise medicine.',
'Referrals follow configured, approved protocols.',
'Missing measurements stay missing. Nothing is estimated.'];