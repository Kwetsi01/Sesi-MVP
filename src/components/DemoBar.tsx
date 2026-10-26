import React from 'react';
import { Building2Icon, LayoutDashboardIcon, LightbulbIcon, RotateCcwIcon, SmartphoneIcon } from 'lucide-react';
import { useDemo } from '../contexts/DemoContext';
import { demoHint } from '../utils/referral';
import type { Surface } from '../types/sesi';

const surfaces: {id: Surface;label: string;Icon: typeof SmartphoneIcon;}[] = [
{ id: 'field', label: 'Sesi Field', Icon: SmartphoneIcon },
{ id: 'clinic', label: 'Sesi Clinic', Icon: Building2Icon },
{ id: 'district', label: 'Sesi District', Icon: LayoutDashboardIcon }];


export function DemoBar() {
  const { surface, setSurface, online, setOnline, reset, referral, syncState } = useDemo();
  return (
    <div className="sticky top-0 z-50 w-full bg-ink text-white print:hidden">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3 lg:px-6">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-sm font-bold">S</span>
          <div className="leading-tight">
            <p className="text-sm font-semibold">Sesi prototype</p>
            <p className="text-xs text-white/60">Demo controls · v0.1</p>
          </div>
        </div>

        <nav aria-label="Product surface" className="flex rounded-xl bg-white/10 p-1">
          {surfaces.map(({ id, label, Icon }) => {
            const active = surface === id;
            return (
              <button
                key={id}
                onClick={() => setSurface(id)}
                aria-pressed={active}
                className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors duration-150 ease-out ${
                active ? 'bg-white text-ink' : 'text-white/75 hover:text-white'}`
                }>
                
                <Icon className="h-4 w-4" aria-hidden />
                {label}
              </button>);

          })}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <label className="flex cursor-pointer items-center gap-3 text-sm">
            <span className="whitespace-nowrap text-white/70">Field device</span>
            <button
              role="switch"
              aria-checked={online}
              onClick={() => setOnline(!online)}
              className={`relative h-7 w-[92px] rounded-full text-xs font-semibold transition-colors duration-200 ease-out ${
              online ? 'bg-ok' : 'bg-[#B8650A]'}`
              }>
              
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform duration-200 ease-out ${
                online ? 'translate-x-[64px]' : 'translate-x-1'}`
                }
                style={{ left: 0 }} />
              
              <span className={`absolute inset-y-0 flex items-center ${online ? 'left-3' : 'right-3'}`}>
                {online ? 'Online' : 'Offline'}
              </span>
            </button>
          </label>
          <button
            onClick={reset}
            className="flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-sm text-white/75 transition-colors duration-150 hover:bg-white/10 hover:text-white">
            
            <RotateCcwIcon className="h-4 w-4" aria-hidden />
            Reset demo
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2 border-t border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 lg:px-6" aria-live="polite">
        <LightbulbIcon className="h-4 w-4 shrink-0 text-[#F2C46D]" aria-hidden />
        <span className="text-white/55">Next:</span>
        <span>{demoHint(surface, referral, online, syncState)}</span>
      </div>
    </div>);

}