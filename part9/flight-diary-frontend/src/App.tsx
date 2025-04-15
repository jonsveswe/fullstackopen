import { useState, useEffect } from "react";
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry, Visibility } from "./types";
import { getAllDiaries, createDiary } from './services/diaryService';
import axios from "axios";
const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [visibility, setVisibility] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [error, setError] = useState('');

  useEffect(() => {
    getAllDiaries().then(data => {      
      setDiaries(data)    
    })  
  }, [])

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const newDiaryEntry: NewDiaryEntry = {
      date: date,
      visibility: visibility as Visibility,
      weather: 'sunny',
      comment: 'en kommentar'
    }
    createDiary(newDiaryEntry).then(data => {      
      setDiaries(diaries.concat(data))
      setError('')    
    }).catch(error => {
      // https://dev.to/mdmostafizurrahaman/handle-axios-error-in-typescript-4mf9
      // isAxiosError is a type guard that will type narrowing the error so that we can access the error response
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message)
        console.log('error response: ', error.response)
        console.log('error status: ', error.status)
        setError(error.response?.data as string)
      } else {
        console.error('unexpected error: ', error)
        setError('unexpected error')
      }      
    })

    setVisibility('')
  };

  return (
    <div>
      <div>Error: {error}</div>  
      <form onSubmit={diaryCreation}>        
{/*         <input
          value={visibility}
          onChange={(event) => setVisibility(event.target.value)} 
        /> */}
        <input
          type="date"
          id="start"
          name="trip-start"
          value={date}
          min="2018-01-01"
          max="2026-12-31" 
          onChange={(event) => setDate(event.target.value)}	/>
      <div>{date}</div>
      {Object.values(Visibility).map((visibility) => (
        <div key={visibility}>
          <input
            type="radio"
            name="visibility"
            value={visibility}
            // checked={value === visibility}
            onChange={(event) => setVisibility(event.target.value)}
          />
          <label>{visibility}</label>
        </div>
      ))}
        <button type='submit'>add</button>
      </form>    
      <ul>        
        {diaries.map(diary =>          
        <li key={diary.id}>{diary.date} {diary.visibility} {diary.weather}</li>       
      )}      
      </ul>    
    </div>  
  )
}

export default App
