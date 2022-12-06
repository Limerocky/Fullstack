import { useState, useEffect } from 'react'
import personService from './services/personService'


const Form = ({ addNewPerson }) => {
  return (
    <form onSubmit={addNewPerson}>
      <div>
        name: <input type={"text"} name={"name"} />
      </div>
      <div>
        number: <input type={"text"} name={"number"} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const List = ({ persons, filter, setPersons }) => {
  const deletion = ( id, name ) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService.notDeleteTM(id)
      setPersons(persons.filter(person => person.id != id))
    }
  }

  return (
    <ul>
      {persons
        .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
        .map(person => 
          <li key={person.id}>{person.name} {person.number}
            <button type={"submit"} onClick={() => deletion(person.id, person.name)}>Delete</button>
          </li>
        )
      }
    </ul>
  )
}

const Message = ({ message }) => {
  if (message === null) {
    return null
  }
  let cName = ''

  if (message[0] === 'A') {
    cName = 'success'
  }
  else if (message[0] === 'E') {
    cName = 'error'
  }

  return (
    <div className={cName}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)


  const addNewPerson = (event) => {
    event.preventDefault()
    const person = {
      name: event.target.name.value,
      number: event.target.number.value
    }

    if (persons.some(e => e.name === person.name)) {
      const id = persons.filter(existing => existing.name === person.name)[0].id
      personService.update(id, person).catch(error => {
        setMessage(`ERROR ${person.name} has been removed from the server. Refresh the page to add them back.`)

        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      setPersons(persons.filter(e => e.id !== id).concat(person))
    }
    else {
      personService.create(person).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
      setMessage(`Added ${person.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } 
  }


  useEffect(() => {
    personService.getAll().then(persons => {
      setPersons(persons)
    })
  }, [])


  const onFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} />
      <div>
        filter shown with <input value={filter} onChange={onFilterChange}/>
      </div>
      <h2>add a new</h2>
      <Form addNewPerson={addNewPerson} />
      <h2>Numbers</h2>
      <List persons={persons} filter={filter} setPersons={setPersons}/>
    </div>
  )
}

export default App