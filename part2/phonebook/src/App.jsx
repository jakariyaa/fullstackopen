import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({ filterValue, onFilterChange }) => <div>
  filter shown with <input value={filterValue}
    onChange={(event) => onFilterChange(event.target.value)} />
</div>

const PersonForm = ({
  onFormSubmit, nameValue, onNameChange, numberValue, onNumberChange
}) => <form onSubmit={onFormSubmit}>
    <div>
      name: <input value={nameValue}
        onChange={(event) => onNameChange(event.target.value)} />
    </div>
    <div>
      number: <input value={numberValue}
        onChange={(event) => onNumberChange(event.target.value)} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>

const Persons = ({ persons }) => <div>
  {persons.map(person =>
    <p key={person.name}>{person.name} {person.number}</p>)}
</div>


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(intialPersons => {
        setPersons(intialPersons)
      })
  }, [])

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(searchText.toLowerCase()))

  const handleNameAdd = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName) !== undefined) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const newPersonObj = { name: newName, number: newNumber }
    personService
      .create(newPersonObj)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={searchText} onFilterChange={setSearchText} />
      <h2>Add a new</h2>
      <PersonForm onFormSubmit={handleNameAdd}
        nameValue={newName} onNameChange={setNewName}
        numberValue={newNumber} onNumberChange={setNewNumber} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App