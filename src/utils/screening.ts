import type { Answer, Finding, ScreeningAnswers } from '../types/sesi';

const answerLabels: Record<Answer, string> = { yes: 'Yes', no: 'No', unsure: 'Unsure' };

export function answerLabel(a: Answer | null): string {
  return a ? answerLabels[a] : 'Not recorded';
}

function bpRaised(reading: string): boolean {
  const match = reading.match(/^(\d{2,3})\/(\d{2,3})$/);
  if (!match) return false;
  return Number(match[1]) >= 140 || Number(match[2]) >= 90;
}

export function evaluateReferral(a: ScreeningAnswers): {met: boolean;findings: string[];} {
  const findings: string[] = [];
  const raised = a.bpAvailable === true && bpRaised(a.bpReading);
  if (a.headache === 'yes') findings.push('Severe headache');
  if (a.vision === 'yes') findings.push('Visual disturbance');
  if (a.swelling === 'yes') findings.push('Swelling reported');
  if (raised) findings.push('BP at or above protocol threshold');
  const pregnant = (a.gestation ?? 0) >= 20;
  const met = pregnant && (a.headache === 'yes' || a.vision === 'yes' || raised);
  if (met) findings.push(`Pregnant, ${a.gestation} weeks`);
  return { met, findings };
}

export function findingsTable(a: ScreeningAnswers): Finding[] {
  const rows: Finding[] = [
  { label: 'Gestation', value: a.gestation ? `${a.gestation} weeks` : 'Not recorded' },
  { label: 'Severe headache', value: answerLabel(a.headache), flagged: a.headache === 'yes' },
  { label: 'Visual disturbance', value: answerLabel(a.vision), flagged: a.vision === 'yes' },
  { label: 'Swelling', value: a.swelling === 'yes' ? 'Reported' : answerLabel(a.swelling), flagged: a.swelling === 'yes' }];

  if (a.bpAvailable) {
    rows.push({ label: 'BP', value: a.bpReading, flagged: bpRaised(a.bpReading) });
  } else {
    rows.push({ label: 'BP', value: 'Not available' });
    rows.push({ label: 'Reason', value: a.bpReason ?? 'Not recorded' });
  }
  return rows;
}

export function isValidBp(reading: string): boolean {
  return /^\d{2,3}\/\d{2,3}$/.test(reading);
}