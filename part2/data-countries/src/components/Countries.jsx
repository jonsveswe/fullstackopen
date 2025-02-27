import CityWeather from './CityWeather'
const Countries = (props) => {
    console.log('Countries props: ', props)
    const { countries, handleShowCountry } = props
    console.log(countries.length)

    if (countries.length > 10) {
        return (
            <>
                <div>Too many matches, specify another filter</div>
            </>
        )
    } else if (countries.length === 1) {
        return (
            <>
                <h1>{countries[0].name.common}</h1>
                <div>capital: {countries[0].capital[0]}</div>
                <div>population: {countries[0].population}</div>
                <h2>languages</h2>
                <ul>
                    {Object.values(countries[0].languages).map(language => <li key={language}>{language}</li>)}
                </ul>
                <img src={countries[0].flags.png} alt={countries[0].name.common} />
                <CityWeather country={countries[0]} />
            </>
        )
    } else if (countries.length > 1 && countries.length <= 10) {
        return (
            <>
                {countries.map(country => <div key={country.name.common}>name: {country.name.common} <button onClick={(event) => handleShowCountry(country)}>show</button></div>)}
            </>
        )
    }
}

export default Countries