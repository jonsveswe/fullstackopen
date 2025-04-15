export interface Note {
  id: string,
  content: string
}
export type NewNote = Omit<Note, 'id'>


export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}
export interface DiaryEntry {
  id: number;
  date: string;
  weather: string;
  visibility: Visibility;
  comment: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;
export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;