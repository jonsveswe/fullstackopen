import axios from 'axios';
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from "../types";

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllDiaries = () => {
  return axios
    .get<NonSensitiveDiaryEntry[]>(baseUrl)
    .then(response => response.data)
}

export const createDiary = (object: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>(baseUrl, object) // The type parameter <Note> is used to specify the type of the response data. POST is a generic method
    .then(response => response.data)
}