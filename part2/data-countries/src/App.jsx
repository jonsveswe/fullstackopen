import { useState, useEffect } from 'react'
import Countries from './components/Countries'
import axios from 'axios'
const App = () => {
  console.log('App rendered')
  const initialCountries = [
    { name: {common: 'Finland'}, capital: ['Helsinki'], population: 5500000 },
    { name: {common: 'Sweden'}, capital: ['Stockholm'], population: 10000000 },
    { name: {common: 'Norway'}, capital: ['Oslo'], population: 4000000 },
    { name: {common: 'Denmark'}, capital: ['Copenhagen'], population: 6000000 },
    { name: {common: 'Iceland'}, capital: ['Reykjavik'], population: 300000 }
  ]
  const [filterString, setFilterString] = useState('')
  const [countries, setCountries] = useState(initialCountries)

  useEffect(() => {
    console.log('inside useEffect')
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`).then(response => {
      console.log('response.data: ', response.data)
      setCountries(response.data)
    }).catch(error => {
      console.log('error', error)
    })
  }, [])

  const handleShowCountry = (country) => {
    console.log('inside handleShowCountry, country: ', country)
    setFilterString(country.name.common)
  }
  console.log('countries: ', countries)
  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(filterString.toLowerCase()))
  console.log('countriesToShow: ', countriesToShow)
  return (
    <>
      <h1>Data for countries</h1>
      <div>Debug: {filterString}</div>
      <div>Find countries: <input value={filterString} onChange={event => setFilterString(event.target.value)} /></div>
      <Countries countries={countriesToShow} handleShowCountry={handleShowCountry} />
    </>
  )
}
export default App