import type { Patient } from '../types/sesi';

export const patients: Patient[] = [
{ id: 'P-1101', name: 'Demo Patient', age: 27, sex: 'Female', village: 'Nkowankowa', phone: '072 555 0142', note: 'Pregnant · antenatal care at Demo PHC' },
{ id: 'P-1024', name: 'Patient #1024', age: 24, sex: 'Female', village: 'Lenyenye', phone: '073 555 0188', note: 'Referred yesterday · Maternal health' },
{ id: 'P-1082', name: 'Patient #1082', age: 31, sex: 'Female', village: 'Dan Village', phone: '076 555 0109', note: 'Follow-up required' },
{ id: 'P-1061', name: 'Patient #1061', age: 29, sex: 'Female', village: 'Khujwana', phone: '071 555 0133', note: 'Last visit 21 September' },
{ id: 'P-1047', name: 'Patient #1047', age: 2, sex: 'Male', village: 'Nkowankowa', phone: '072 555 0142', note: 'Household member of Demo Patient' }];


export const villages = ['Nkowankowa', 'Lenyenye', 'Dan Village', 'Khujwana', 'Mariveni'];