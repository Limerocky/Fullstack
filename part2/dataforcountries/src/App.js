import { useState, useEffect } from 'react'
import axios from 'axios'


const Iterate = ({ arr }) => {
  return(
    <ul>
      {arr.map(language => <li key={language}>{language}</li>)}
    </ul>
  )
}

const Single = ({ country }) => {
  const [weather, setWeather] = useState(null)
  
  const lat = country.latlng[0]
  const lon = country.latlng[1]
  const API_key = process.env.REACT_APP_API_KEY


  const hook = () => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`).then(response => {
      setWeather(response.data)
    })
  }
  useEffect(hook, [])
  console.log(weather)
  
  if (weather !== null) {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <h4>languages:</h4>
        <Iterate arr={Object.values(country.languages)} />
        <img src={country.flags.png} alt={`flag of ${country.name.common}`} />
        <p>temperature {Math.round((weather.main.temp - 273.15) * 100) / 100} Celcius</p>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
        <p>wind {weather.wind.speed} m/s</p>
      </div>
    )
  }
}

const List = ({ countries, filter, setFilter }) => {
  

  if (filter !== '') {

    if (countries.length > 10) {
      return (<div>Too many matches, specify another filter</div>)
    }
    
    else if (countries.length > 1) {
      return (
        <ul style={{ listStyleType: 'none'}}>
          {countries.map(country => 
              <li key={country.population}>{country.name.common} <button value={country.name.common} onClick={() => setFilter(country.name.common)}>show</button></li>
          )}
        </ul>
      )
    }

    else if (countries.length === 1) {
      return (<Single country={countries[0]} />)
    }

    else {
      return (<p>No country found</p>)
    }
  }
}


const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  
  const handleChange = event => setFilter(event.target.value)


  const hook = () => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      setCountries(response.data)
    })
  }
  useEffect(hook, [])


  const shown = countries.filter(element => element.name.common.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <div>
        find countries <input value={filter} onChange={handleChange} />
      </div>
      <List countries={shown} filter={filter} setFilter={setFilter}/>
    </div>
  )
}

export default App;
