import express from 'express';
import { Response, Request, NextFunction } from 'express';
import diaryService from '../services/diaryService';
import { DiaryEntry, NonSensitiveDiaryEntry, NewDiaryEntry } from '../types';
// import { toNewDiaryEntry } from '../utils/utils';
import { NewEntrySchema } from '../utils/utils';
import z from 'zod';

const router = express.Router();



router.get('/', (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
  res.send(diaryService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));

  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

// Middleware
const newDiaryParser = (req: Request, _res: Response, next: NextFunction) => { 
  try {
    NewEntrySchema.parse(req.body);
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

// So after the request passes newDiaryParser middleware, it is known that the request body is a proper new diary entry. We can tell this fact to TypeScript compiler by giving a type parameter to the Request type
// The syntax of the Request<unknown, unknown, NewDiaryEntry> looks a bit odd. The Request is a generic type with several type parameters. The third type parameter represents the request body, 
// and in order to give it the value NewDiaryEntry we have to give some value to the two first parameters. We decide to define those unknown since we do not need those for now.
router.post('/', newDiaryParser, (req: Request<unknown, unknown, NewDiaryEntry>, res: Response<DiaryEntry>) => {
    const addedEntry = diaryService.addDiary(req.body);  
    res.json(addedEntry);
});

/* router.post('/', (req, res) => {
  try {
    const newDiaryEntry = NewEntrySchema.parse(req.body);
    const addedEntry = diaryService.addDiary(newDiaryEntry);    
    res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {      
      res.status(400).send({ error: error.issues});    
    } else {      
      res.status(400).send({ error: 'unknown error' });
    }
  }
}); */

/* router.post('/', (req, res) => {
  try {
    const newDiaryEntry = toNewDiaryEntry(req.body);
    const addedEntry = diaryService.addDiary(newDiaryEntry);    
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});
 */

router.use(errorMiddleware);

export default router;