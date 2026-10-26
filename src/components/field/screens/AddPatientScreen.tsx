import React, { useState } from 'react';
import { CheckIcon } from 'lucide-react';
import { villages } from '../../../data/patients';
import { Button } from '../../ui/Button';
import { FlowHeader } from '../FlowHeader';
import type { Patient } from '../../../types/sesi';

interface AddPatientScreenProps {
  onBack: () => void;
  onSave: (p: Patient) => void;
}

const inputClass =
'mt-1.5 h-14 w-full rounded-2xl border-2 border-line bg-surface px-4 text-[17px] text-ink outline-none transition-colors duration-150 focus:border-brand';

export function AddPatientScreen({ onBack, onSave }: AddPatientScreenProps) {
  const [first, setFirst] = useState('');
  const [surname, setSurname] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState<'Female' | 'Male' | null>(null);
  const [phone, setPhone] = useState('');
  const [village, setVillage] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);

  const valid = first.trim() && surname.trim() && Number(age) > 0 && sex && village && consent;

  function save() {
    if (!valid || !sex || !village) return;
    onSave({
      id: `P-${Date.now()}`,
      name: `${first.trim()} ${surname.trim()}`,
      age: Number(age),
      sex,
      village,
      phone: phone.trim(),
      note: 'Added today'
    });
  }

  return (
    <div className="flex min-h-full flex-col">
      <FlowHeader title="Add new patient" onBack={onBack} />
      <form
        className="flex flex-1 flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          save();
        }}>
        
        <div className="flex-1 space-y-5 px-5 pb-6 pt-2">
          <p className="text-sm text-muted">Only what's needed for the referral. Nothing more.</p>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm font-semibold text-ink">
              First name
              <input value={first} onChange={(e) => setFirst(e.target.value)} className={inputClass} autoComplete="off" />
            </label>
            <label className="block text-sm font-semibold text-ink">
              Surname
              <input value={surname} onChange={(e) => setSurname(e.target.value)} className={inputClass} autoComplete="off" />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm font-semibold text-ink">
              Age
              <input value={age} onChange={(e) => setAge(e.target.value.replace(/\D/g, '').slice(0, 3))} inputMode="numeric" className={inputClass} placeholder="Years" />
            </label>
            <fieldset>
              <legend className="text-sm font-semibold text-ink">Sex</legend>
              <div className="mt-1.5 grid grid-cols-2 gap-2">
                {(['Female', 'Male'] as const).map((s) =>
                <button
                  key={s}
                  type="button"
                  aria-pressed={sex === s}
                  onClick={() => setSex(s)}
                  className={`h-14 rounded-2xl border-2 text-[15px] font-semibold transition-colors duration-150 ${
                  sex === s ? 'border-brand bg-brand-soft text-brand-dark' : 'border-line bg-surface text-ink'}`
                  }>
                  
                    {s}
                  </button>
                )}
              </div>
            </fieldset>
          </div>
          <label className="block text-sm font-semibold text-ink">
            Phone number <span className="font-normal text-muted">(optional)</span>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" className={inputClass} placeholder="07x xxx xxxx" />
          </label>
          <fieldset>
            <legend className="text-sm font-semibold text-ink">Community / village</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {villages.map((v) =>
              <button
                key={v}
                type="button"
                aria-pressed={village === v}
                onClick={() => setVillage(v)}
                className={`h-11 rounded-full border-2 px-4 text-[15px] font-medium transition-colors duration-150 ${
                village === v ? 'border-brand bg-brand-soft text-brand-dark' : 'border-line bg-surface text-ink'}`
                }>
                
                  {v}
                </button>
              )}
            </div>
          </fieldset>
          <button
            type="button"
            role="checkbox"
            aria-checked={consent}
            onClick={() => setConsent(!consent)}
            className={`flex w-full items-start gap-3 rounded-2xl border-2 p-4 text-left transition-colors duration-150 ${
            consent ? 'border-brand bg-brand-soft' : 'border-line bg-surface'}`
            }>
            
            <span className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border-2 ${consent ? 'border-brand bg-brand text-white' : 'border-muted'}`} aria-hidden>
              {consent && <CheckIcon className="h-4 w-4" strokeWidth={3} />}
            </span>
            <span>
              <span className="block font-semibold text-ink">Consent captured</span>
              <span className="block text-sm text-muted">The patient agreed to have their information recorded and shared with the clinic.</span>
            </span>
          </button>
        </div>
        <div className="sticky bottom-0 border-t border-line bg-canvas px-5 py-3">
          <Button type="submit" className="w-full" disabled={!valid}>
            Save and continue
          </Button>
        </div>
      </form>
    </div>);

}