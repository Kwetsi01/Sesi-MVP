import React from 'react';
import { useDemo } from '../contexts/DemoContext';
import { DemoBar } from './DemoBar';
import { FieldApp } from '../pages/FieldApp';
import { ClinicApp } from '../pages/ClinicApp';
import { DistrictApp } from '../pages/DistrictApp';

export function DemoShell() {
  const { surface, resetKey } = useDemo();
  return (
    <div className="flex min-h-screen w-full flex-col bg-canvas">
      <DemoBar />
      <div key={resetKey} className="flex flex-1 flex-col">
        {/* Surfaces stay mounted so each keeps its own navigation state while switching */}
        <div className={surface === 'field' ? 'flex flex-1 flex-col' : 'hidden'}>
          <FieldApp />
        </div>
        <div className={surface === 'clinic' ? 'flex flex-1 flex-col' : 'hidden'}>
          <ClinicApp />
        </div>
        <div className={surface === 'district' ? 'flex flex-1 flex-col' : 'hidden'}>
          <DistrictApp />
        </div>
      </div>
    </div>);

}