import type { DemoReferral, ReferralStage, Surface, SyncState } from '../types/sesi';

const order: Record<ReferralStage, number> = {
  created: 0,
  sent: 1,
  acknowledged: 2,
  attended: 3,
  not_attended: 3,
  closed: 4
};

export function stageAtLeast(stage: ReferralStage, target: ReferralStage): boolean {
  return order[stage] >= order[target];
}

export type StatusTone = 'urgent' | 'warn' | 'ok' | 'brand';

export function fieldStatus(stage: ReferralStage): {label: string;tone: StatusTone;} {
  switch (stage) {
    case 'created':
      return { label: 'Waiting to sync', tone: 'warn' };
    case 'sent':
      return { label: 'Sent to clinic · Awaiting receipt', tone: 'brand' };
    case 'acknowledged':
      return { label: 'Received by clinic · Attendance awaiting', tone: 'brand' };
    case 'attended':
      return { label: 'Patient attended', tone: 'ok' };
    case 'not_attended':
      return { label: 'Did not attend · Follow-up required', tone: 'warn' };
    case 'closed':
      return { label: 'Referral closed', tone: 'ok' };
  }
}

export function clinicGroup(stage: ReferralStage): 'inbox' | 'active' | 'completed' {
  if (stage === 'sent' || stage === 'created') return 'inbox';
  if (stage === 'closed') return 'completed';
  return 'active';
}

export function demoHint(surface: Surface, referral: DemoReferral | null, online: boolean, sync: SyncState): string {
  if (!referral) {
    return surface === 'field' ?
    'Tap “Start household visit” and choose Demo Patient.' :
    'Switch to Sesi Field to start the household visit.';
  }
  switch (referral.stage) {
    case 'created':
      return online || sync === 'syncing' ?
      'Syncing the referral to Demo PHC Clinic…' :
      'Referral saved offline. Turn the field device Online to sync.';
    case 'sent':
      return surface === 'clinic' ?
      'Open the urgent referral and acknowledge it.' :
      'Switch to Sesi Clinic. The referral is in the inbox.';
    case 'acknowledged':
      return surface === 'clinic' ? 'Mark the patient as attended.' : 'In Sesi Clinic, mark the patient as attended.';
    case 'attended':
      return surface === 'clinic' ?
      'Complete the referral, then switch back to Sesi Field.' :
      'The CHW sees the outcome without tracing the patient.';
    case 'closed':
      return surface === 'district' ?
      'Referral completion now includes Demo Patient.' :
      'Open Sesi District to see the completion metric update.';
    case 'not_attended':
      return 'A follow-up was added to the CHW’s Tasks queue.';
  }
}