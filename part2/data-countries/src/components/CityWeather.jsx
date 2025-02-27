import { useState, useEffect } from 'react'
import axios from 'axios'
const CityWeather = (props) => {
    console.log('CityWeather props: ', props)
    const { country } = props
    const [cityWeather, setCityWeather] = useState(null)
    const [counter, setCounter] = useState(0)
    const api_key = import.meta.env.VITE_WEATHER_KEY
    console.log('cityWeather 1 : ', cityWeather)

    useEffect(() => {
        console.log('inside useEffect CityWeather')
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&APPID=${api_key}`).then(response => {
            console.log('weather response.data: ', response.data)
            setCityWeather(response.data)
        }).catch(error => {
            console.log('error', error)
        })
    }, [country.capital[0]])

    if (!cityWeather) {
        console.log('no cityWeather')
        return null
    }
    console.log('cityWeather 2 : ', cityWeather)
    return (
        <>
            <h1>weather in {cityWeather.name}</h1>
            <button onClick={() => setCounter(counter+1)}>{counter}</button>
            <div>temperature: {cityWeather.main.temp - 273.15} Celsius</div>
            <img src={`http://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png`} alt={cityWeather.weather[0].description} />
            <div>wind: {cityWeather.wind.speed} m/s</div>
        </>
    )
}

export default CityWeather