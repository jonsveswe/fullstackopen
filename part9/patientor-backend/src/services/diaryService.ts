import diaries from '../../data/entries';
import { NonSensitiveDiaryEntry, DiaryEntry, NewDiaryEntry } from '../types';

const getEntries = () : DiaryEntry[] => {
  return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {  
  return diaries.map(({ id, date, weather, visibility }) => ({    
    id,    
    date,    
    weather,    
    visibility,  
  }));
};
const addDiary = ( entry : NewDiaryEntry): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaries.map(d => d.id)) + 1,
    ...entry
  };
  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};

// If no entry is found, undefined will be returned, since find() will return undefined if it doesn't find anything
const findById = (id: number): DiaryEntry | undefined => { 
  const entry = diaries.find(d => d.id === id);
  return entry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addDiary,
  findById
};