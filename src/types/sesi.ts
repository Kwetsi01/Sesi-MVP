export type Surface = 'field' | 'clinic' | 'district';
export type ReferralStage = 'created' | 'sent' | 'acknowledged' | 'attended' | 'not_attended' | 'closed';
export type SyncState = 'idle' | 'waiting' | 'syncing' | 'synced';
export type Answer = 'yes' | 'no' | 'unsure';
export type Language = 'en' | 'ts';
export type BpReason = 'Equipment unavailable' | 'Equipment not working' | 'Patient declined' | 'Other';

export interface Patient {
  id: string;
  name: string;
  age: number;
  sex: 'Female' | 'Male';
  village: string;
  phone: string;
  note: string;
}

export interface ScreeningAnswers {
  gestation: number | null;
  headache: Answer | null;
  vision: Answer | null;
  swelling: Answer | null;
  bpAvailable: boolean | null;
  bpReading: string;
  bpReason: BpReason | null;
}

export interface DemoReferral {
  id: string;
  patient: Patient;
  answers: ScreeningAnswers;
  stage: ReferralStage;
}

export interface Finding {
  label: string;
  value: string;
  flagged?: boolean;
}

export type FieldTone = 'urgent' | 'attention' | 'routine';

export interface FieldReferral {
  id: string;
  patient: string;
  category: string;
  destination: string;
  referred: string;
  tone: FieldTone;
  group: 'active' | 'followup' | 'completed';
  status: string;
  detail: string;
}

export interface FollowUp {
  id: string;
  patient: string;
  category: string;
  referred: string;
  issue: string;
}

export interface ClinicReferral {
  id: string;
  patient: string;
  age: number;
  village: string;
  category: string;
  priority: 'Urgent' | 'Routine';
  referredDate: string;
  referredTime: string;
  chw: string;
  escalation: string[];
  findings: Finding[];
  stage: ReferralStage;
  isDemo?: boolean;
}

export interface OutstandingReferral {
  id: string;
  patient: string;
  chw: string;
  status: 'Awaiting attendance' | 'Follow-up required';
  daysOpen: number;
  note: string;
}

export interface ChwActivity {
  name: string;
  ward: string;
  screenings: number;
  referrals: number;
  followUps: number;
  lastSync: string;
}

export interface Barrier {
  label: string;
  count: number;
}