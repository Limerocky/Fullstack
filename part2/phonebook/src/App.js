import { useState, useEffect } from 'react'
import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')


  const addNewPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }

    if (persons.some(e => e.name === person.name)) {
      alert(`${person.name} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat(person))
    } 
    setNewName('')
    setNewNumber('')
  }


  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      console.log(response.data)
      setPersons(response.data)
    })
  }, [])


  const onNameChange = (event) => {
    setNewName(event.target.value)
  }

  const onNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const onFilterChange = (event) => {
    setFilter(event.target.value)
  }


  const Form = () => {
    <form onSubmit={addNewPerson}>
      <div>
        name: <input value={newName} onChange={onNameChange}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={onNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={filter} onChange={onFilterChange}/>
      </div>
      <h2>add a new</h2>
      <Form />
      <h2>Numbers</h2>
      <div>
        <ul>
            {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person => <li key={person.id}>{person.name} {person.number}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default App