import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { DEMO } from '../data/demo';
import type { ClinicReferral, DemoReferral, Language, Patient, ReferralStage, ScreeningAnswers, Surface, SyncState } from '../types/sesi';

interface DemoContextValue {
  surface: Surface;
  setSurface: (s: Surface) => void;
  online: boolean;
  setOnline: (v: boolean) => void;
  syncState: SyncState;
  referral: DemoReferral | null;
  createReferral: (patient: Patient, answers: ScreeningAnswers) => void;
  setStage: (stage: ReferralStage) => void;
  visitReferrals: ClinicReferral[];
  addVisitReferral: (r: ClinicReferral) => void;
  setVisitReferralStage: (id: string, stage: ReferralStage) => void;
  language: Language;
  setLanguage: (l: Language) => void;
  fieldUpdatePending: boolean;
  dismissFieldUpdate: () => void;
  resetKey: number;
  reset: () => void;
}

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: {children: React.ReactNode;}) {
  const [surface, setSurface] = useState<Surface>('field');
  const [online, setOnline] = useState(false);
  const [syncState, setSyncState] = useState<SyncState>('idle');
  const [referral, setReferral] = useState<DemoReferral | null>(null);
  const [visitReferrals, setVisitReferrals] = useState<ClinicReferral[]>([]);
  const [language, setLanguage] = useState<Language>('en');
  const [fieldUpdatePending, setFieldUpdatePending] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    if (syncState === 'waiting' && online) setSyncState('syncing');
    if (syncState === 'syncing' && !online) setSyncState('waiting');
  }, [online, syncState]);

  useEffect(() => {
    if (syncState !== 'syncing') return;
    const t = window.setTimeout(() => {
      setSyncState('synced');
      setReferral((r) => r && r.stage === 'created' ? { ...r, stage: 'sent' } : r);
      setVisitReferrals((list) => list.map((r) => r.stage === 'created' ? { ...r, stage: 'sent' } : r));
    }, 1800);
    return () => window.clearTimeout(t);
  }, [syncState]);

  const createReferral = useCallback((patient: Patient, answers: ScreeningAnswers) => {
    setReferral({ id: DEMO.referralId, patient, answers, stage: 'created' });
    setSyncState('waiting');
  }, []);

  const setStage = useCallback((stage: ReferralStage) => {
    setReferral((r) => r ? { ...r, stage } : r);
    if (stage === 'attended' || stage === 'closed' || stage === 'not_attended') setFieldUpdatePending(true);
  }, []);

  const addVisitReferral = useCallback((r: ClinicReferral) => {
    setVisitReferrals((list) => [{ ...r, stage: 'created' }, ...list]);
    setSyncState('waiting');
  }, []);

  const setVisitReferralStage = useCallback((id: string, stage: ReferralStage) => {
    setVisitReferrals((list) => list.map((r) => r.id === id ? { ...r, stage } : r));
  }, []);

  const reset = useCallback(() => {
    setSurface('field');
    setOnline(false);
    setSyncState('idle');
    setReferral(null);
    setVisitReferrals([]);
    setFieldUpdatePending(false);
    setResetKey((k) => k + 1);
  }, []);

  const value = useMemo<DemoContextValue>(
    () => ({
      surface,
      setSurface,
      online,
      setOnline,
      syncState,
      referral,
      createReferral,
      setStage,
      visitReferrals,
      addVisitReferral,
      setVisitReferralStage,
      language,
      setLanguage,
      fieldUpdatePending,
      dismissFieldUpdate: () => setFieldUpdatePending(false),
      resetKey,
      reset
    }),
    [surface, online, syncState, referral, createReferral, setStage, visitReferrals, addVisitReferral, setVisitReferralStage, language, fieldUpdatePending, resetKey, reset]
  );

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo(): DemoContextValue {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error('useDemo must be used inside DemoProvider');
  return ctx;
}