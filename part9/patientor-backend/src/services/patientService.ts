import patients from '../../data/patients';
import { NonSensitivePatientDataEntry, Patient, NewPatientEntry } from '../types';
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

const addPatient = ( entry : NewPatientEntry): Patient => {
  const newPatientEntry = {
    // id: Math.max(...diaries.map(d => d.id)) + 1,
    id: uuid(),
    ...entry
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitivePatientDataEntries,
  addPatient
};