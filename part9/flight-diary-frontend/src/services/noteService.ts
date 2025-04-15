import axios from 'axios';
import { Note, NewNote } from "../types";

const baseUrl = 'http://localhost:3001/notes'

export const getAllNotes = () => {
  return axios
    .get<Note[]>(baseUrl)
    .then(response => response.data)
}

export const createNote = (object: NewNote) => {
  return axios
    .post<Note>(baseUrl, object) // The type parameter <Note> is used to specify the type of the response data. POST is a generic method
    .then(response => response.data)
}