import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'sonner';
import { useDemo } from '../contexts/DemoContext';
import { useFieldFlow } from '../hooks/useFieldFlow';
import { useTaskItems } from '../hooks/useTaskItems';
import { PhoneFrame } from '../components/field/PhoneFrame';
import { FieldStatusBar } from '../components/field/FieldStatusBar';
import { BottomNav } from '../components/field/BottomNav';
import { JourneyRail } from '../components/field/JourneyRail';
import { ReferralUpdateSheet } from '../components/field/ReferralUpdateSheet';
import { HomeScreen } from '../components/field/screens/HomeScreen';
import { FindPatientScreen } from '../components/field/screens/FindPatientScreen';
import { AddPatientScreen } from '../components/field/screens/AddPatientScreen';
import { VisitTypeScreen } from '../components/field/screens/VisitTypeScreen';
import { ScreeningScreen } from '../components/field/screens/ScreeningScreen';
import { RoutineVisitScreen } from '../components/field/screens/RoutineVisitScreen';
import { FollowUpVisitScreen } from '../components/field/screens/FollowUpVisitScreen';
import { VisitCompleteScreen } from '../components/field/screens/VisitCompleteScreen';
import { ReferralResultScreen } from '../components/field/screens/ReferralResultScreen';
import { ReferralDocumentScreen } from '../components/field/screens/ReferralDocumentScreen';
import { ReferralSavedScreen } from '../components/field/screens/ReferralSavedScreen';
import { ReferralsScreen } from '../components/field/screens/ReferralsScreen';
import { TasksScreen } from '../components/field/screens/TasksScreen';
import { PatientsScreen } from '../components/field/screens/PatientsScreen';
import { ProfileScreen } from '../components/field/screens/ProfileScreen';

export function FieldApp() {
  const flow = useFieldFlow();
  const tasks = useTaskItems();
  const { createReferral } = useDemo();
  const screenKey = flow.step ?? flow.tab;

  function renderScreen() {
    const { step, patient, answers } = flow;
    if (step === 'find') return <FindPatientScreen patients={flow.allPatients} onBack={flow.back} onSelect={flow.selectPatient} onAdd={() => flow.setStep('add')} />;
    if (step === 'add') return <AddPatientScreen onBack={flow.back} onSave={flow.addPatient} />;
    if (step === 'saved') return <ReferralSavedScreen onViewReferral={() => flow.goToTab('referrals')} onHome={() => flow.goToTab('home')} />;
    if (step && patient) {
      switch (step) {
        case 'visitType':
          return (
            <VisitTypeScreen
              patient={patient}
              onBack={flow.back}
              onContinue={(type) => flow.setStep(type === 'maternal' ? 'screening' : type === 'routine' ? 'routine' : 'followup')} />);


        case 'routine':
          return <RoutineVisitScreen patient={patient} onExit={flow.back} onComplete={flow.completeVisit} />;
        case 'followup':
          return <FollowUpVisitScreen patient={patient} onExit={flow.back} onComplete={flow.completeVisit} />;
        case 'visitDone':
          return flow.visitSummary ?
          <VisitCompleteScreen
            patient={patient}
            summary={flow.visitSummary}
            onHome={() => flow.goToTab('home')}
            onStartScreening={() => flow.setStep('screening')}
            onViewReferrals={() => flow.goToTab('referrals')} /> :

          null;
        case 'screening':
          return <ScreeningScreen patient={patient} answers={answers} onChange={flow.setAnswers} onExit={flow.back} onComplete={() => flow.setStep('result')} />;
        case 'result':
          return (
            <ReferralResultScreen
              answers={answers}
              onBack={flow.back}
              onCreate={() => flow.setStep('referral')}
              onFinish={() => {
                flow.goToTab('home');
                toast.success('Visit saved', { description: `${patient.name} · no referral needed` });
              }} />);


        case 'referral':
          return (
            <ReferralDocumentScreen
              patient={patient}
              answers={answers}
              onBack={flow.back}
              onConfirm={() => {
                createReferral(patient, answers);
                flow.setStep('saved');
              }} />);


      }
    }
    switch (flow.tab) {
      case 'home':
        return <HomeScreen onStartVisit={flow.startVisit} onOpenReferrals={() => flow.goToTab('referrals')} onOpenTasks={() => flow.goToTab('tasks')} />;
      case 'patients':
        return <PatientsScreen patients={flow.allPatients} onSelect={flow.selectPatient} />;
      case 'referrals':
        return <ReferralsScreen />;
      case 'tasks':
        return <TasksScreen items={tasks.items} onRecorded={tasks.remove} />;
      case 'profile':
        return <ProfileScreen />;
    }
  }

  return (
    <main className="flex flex-1 justify-center gap-16 md:px-6 md:py-8">
      <PhoneFrame>
        <FieldStatusBar />
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={screenKey}
              className="min-h-full"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}>
              
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </div>
        {!flow.step && <BottomNav active={flow.tab} onChange={flow.goToTab} taskCount={tasks.items.length} />}
        <ReferralUpdateSheet onViewReferral={() => flow.goToTab('referrals')} onOpenTasks={() => flow.goToTab('tasks')} />
      </PhoneFrame>
      <JourneyRail />
    </main>);

}