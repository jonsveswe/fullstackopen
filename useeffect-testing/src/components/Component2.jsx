import { useState, useEffect } from 'react'
import axios from 'axios'
const Component2 = (props) => {
	const {counterFromParent, city} = props
	const [counter, setCounter] = useState(0)
	const [cityWeather, setCityWeather] = useState(null)

	useEffect(() => {
        console.log('inside useEffect CityWeather')
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=a39624dd40152134e76ff3d41d9aa61c`).then(response => {
            console.log('weather response.data: ', response.data)
            setCityWeather(response.data)
        }).catch(error => {
            console.log('error', error)
        })
    }, [])

	return (
		<>
			<h1>{counter}</h1>
			<button onClick={() => setCounter(counter + 1)}>Button2</button>
		</>
	)
}

export default Component2