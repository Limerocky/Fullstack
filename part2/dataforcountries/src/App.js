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
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h4>languages:</h4>
      <Iterate arr={Object.values(country.languages)} />
      <img src={country.flags.png} alt={`flag of ${country.name.common}`} />
    </div>
  )
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
  const List = () => {

    if (filter !== '') {
  
      if (shown.length > 10) {
        return (<div>Too many matches, specify another filter</div>)
      }
      
      else if (shown.length > 1) {
        return (
          <ul style={{ listStyleType: 'none'}}>
            {shown.map(country => 
                <li key={country.population}>{country.name.common} <button value={country.name.common} onClick={handleChange}>show</button></li>
            )}
          </ul>
        )
      }
  
      else {
        return (<Single country={shown[0]} />)
      }
    }
  }


  return (
    <div>
      <div>
        find countries <input value={filter} onChange={handleChange} />
      </div>
      <List />
    </div>
  )
}

export default App;
