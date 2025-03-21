import { useState } from 'react'

export const useCountry = (country) => {  
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  const onReset = () => {
    setValue('')
  }

  return {
    type,
    name,
    value,
    onChange,
    onReset
  }
}