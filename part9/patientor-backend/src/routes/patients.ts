import express from 'express';
import { Response } from 'express';
import PatientService from '../services/patientService';
import { NonSensitivePatientDataEntry } from '../types';
import { toNewPatientEntry } from '../utils/utils';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientDataEntry[]>) => {
  res.send(PatientService.getNonSensitivePatientDataEntries());
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = PatientService.addPatient(newPatientEntry);  
    console.log('addedEntry', addedEntry);  
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;