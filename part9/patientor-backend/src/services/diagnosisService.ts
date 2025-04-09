import diagnoses from '../../data/diagnoses';
import { Diagnosis } from '../types';

const getEntries = () : Diagnosis[] => {
  return diagnoses;
};

/* const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {  
  return diagnoses.map(({ id, date, weather, visibility }) => ({    
    id,    
    date,    
    weather,    
    visibility,  
  }));
}; */
/* const addDiary = () => {
  return null;
}; */

export default {
  getEntries,
};