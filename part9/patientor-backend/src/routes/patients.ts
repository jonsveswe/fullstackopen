import express from 'express';
import { Response, Request, NextFunction } from 'express';
import PatientService from '../services/patientService';
import { NonSensitivePatientDataEntry, Patient, NewPatientEntry, Entry, EntryWithoutId } from '../types';
// import { toNewPatientEntry } from '../utils/utils';
import { NewPatientEntrySchema, EntrySchema, parseDiagnosisCodes } from '../utils/utils';
import z from 'zod';

const router = express.Router();

// Middleware
// If req.body is not a proper new patient entry, the middleware will throw an error
const newPatientParser = (req: Request, _res: Response, next: NextFunction) => { 
  try {
    NewPatientEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    EntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};
const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.get('/', (_req, res: Response<NonSensitivePatientDataEntry[]>) => {
  res.send(PatientService.getNonSensitivePatientDataEntries());
});

router.get('/:id', (req, res: Response<Patient>) => {
  const patient = PatientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

// The middleware newPatientParser is used to check that the request body is a proper new patient entry
router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
    const addedEntry = PatientService.addPatient(req.body);  
    res.json(addedEntry);
});

router.post('/:id/entries', newEntryParser, (req: Request<{id: string}, unknown, EntryWithoutId>, res: Response<Entry>) => {
  const addedEntry = PatientService.addEntry(req.params.id, req.body);  
  res.json(addedEntry);
});

/* router.post('/', (req, res) => {
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
}); */

router.use(errorMiddleware);
export default router;