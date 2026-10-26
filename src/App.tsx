import React from 'react';
import { MotionConfig } from 'framer-motion';
import { Toaster } from 'sonner';
import { DemoProvider } from './contexts/DemoContext';
import { DemoShell } from './components/DemoShell';

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <DemoProvider>
        <DemoShell />
        <Toaster position="top-center" richColors closeButton />
      </DemoProvider>
    </MotionConfig>);

}