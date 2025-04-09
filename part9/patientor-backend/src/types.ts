/* export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';
export type Visibility = 'great' | 'good' | 'ok' | 'poor'; */
export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}
export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}
export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;
export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;

// ################################################################### //
export type Diagnosis = { 
  code: string, 
  name: string, 
  latin?: string 
};
export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}
export type Patient = { 
  id: string, 
  name: string, 
  dateOfBirth: string, 
  gender: Gender, 
  occupation: string, 
  ssn: string
};
export type NewPatientEntry = Omit<Patient, 'id'>;
export type NonSensitivePatientDataEntry = Omit<Patient, 'ssn'>;
