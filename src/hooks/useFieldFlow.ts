import { useCallback, useState } from 'react';
import { emptyAnswers } from '../data/screening';
import { patients as seedPatients } from '../data/patients';
import type { Patient, ScreeningAnswers } from '../types/sesi';

export type FieldTab = 'home' | 'patients' | 'referrals' | 'tasks' | 'profile';
export type FlowStep = 'find' | 'add' | 'visitType' | 'screening' | 'result' | 'referral' | 'saved' | 'routine' | 'followup' | 'visitDone';

export interface VisitFlag {
  text: string;
  /** When present, the CHW can create a referral directly from this finding */
  referral?: {category: string;reason: string;};
}

export interface VisitSummary {
  title: string;
  lines: {label: string;value: string;}[];
  flags: VisitFlag[];
  suggestScreening: boolean;
}

const backMap: Record<FlowStep, FlowStep | null> = {
  find: null,
  add: 'find',
  visitType: 'find',
  routine: 'visitType',
  followup: 'visitType',
  visitDone: null,
  screening: 'visitType',
  result: 'screening',
  referral: 'result',
  saved: null
};

export function useFieldFlow() {
  const [tab, setTab] = useState<FieldTab>('home');
  const [step, setStep] = useState<FlowStep | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [answers, setAnswers] = useState<ScreeningAnswers>(emptyAnswers);
  const [addedPatients, setAddedPatients] = useState<Patient[]>([]);
  const [visitSummary, setVisitSummary] = useState<VisitSummary | null>(null);

  const completeVisit = useCallback((summary: VisitSummary) => {
    setVisitSummary(summary);
    setStep('visitDone');
  }, []);

  const startVisit = useCallback(() => {
    setPatient(null);
    setAnswers(emptyAnswers);
    setStep('find');
  }, []);

  const selectPatient = useCallback((p: Patient) => {
    setPatient(p);
    setAnswers(emptyAnswers);
    setStep('visitType');
  }, []);

  const addPatient = useCallback(
    (p: Patient) => {
      setAddedPatients((prev) => [p, ...prev]);
      selectPatient(p);
    },
    [selectPatient]
  );

  const back = useCallback(() => {
    setStep((s) => s ? backMap[s] : null);
  }, []);

  const goToTab = useCallback((t: FieldTab) => {
    setStep(null);
    setTab(t);
  }, []);

  return {
    tab,
    step,
    setStep,
    patient,
    answers,
    setAnswers,
    allPatients: [...addedPatients, ...seedPatients],
    visitSummary,
    completeVisit,
    startVisit,
    selectPatient,
    addPatient,
    back,
    goToTab
  };
}