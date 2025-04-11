import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchText, setSearchText] = useState('')

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(searchText.toLowerCase()))

  const handleNameAdd = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName) !== undefined) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const newNameObj = { name: newName, number: newNumber }
    setPersons(persons.concat(newNameObj))
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