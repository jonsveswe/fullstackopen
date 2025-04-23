import patients from '../../data/patients';
import { NonSensitivePatientDataEntry, Patient, NewPatientEntry, Entry, EntryWithoutId } from '../types';
import { v1 as uuid } from 'uuid';

const getEntries = () : Patient[] => {
  return patients;
};

const getNonSensitivePatientDataEntries = (): NonSensitivePatientDataEntry[] => {  
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({    
    id,    
    name,    
    dateOfBirth,    
    gender,    
    occupation,  
  }));
};

const findById = (id: string): Patient | undefined => { 
  const entry = patients.find(p => p.id === id);
  return entry;
};

const addPatient = ( entry : NewPatientEntry): Patient => {
  const newPatientEntry = {
    // id: Math.max(...diaries.map(d => d.id)) + 1,
    id: uuid(),
    ...entry
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = ( id: string, entry : EntryWithoutId): Entry => {
  const patient = findById(id);
  if (patient) {
    const entryWithId = { id: uuid(), ...entry };
    patient.entries.push(entryWithId);
    return entryWithId;
  } else {
    throw new Error('Patient not found');
  }
};

export default {
  getEntries,
  getNonSensitivePatientDataEntries,
  addPatient,
  findById,
  addEntry
};