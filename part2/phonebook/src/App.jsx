import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

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

  const handleAddContact = (event) => {
    event.preventDefault()
    const newPersonObj = { name: newName, number: newNumber }
    const foundPerson = persons.find(person => person.name === newName)
    if (foundPerson !== undefined) {
      const message = `${newName} is already added to phonebook, replace` +
        ` the old number with a new one?`
      if (window.confirm(message)) {
        personService
          .update(foundPerson.id, newPersonObj)
          .then(returnedPerson => {
            setPersons(persons.map(person =>
              person.id === returnedPerson.id ? returnedPerson : person))
          })
      }
    } else {
      personService
        .create(newPersonObj)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const onDeleteContact = (id, name) => {
    if (window.confirm(`Delete ${name} ?`))
      personService
        .remove(id)
        .then(deletedPerson => {
          setPersons(persons.filter(person => person.id !== deletedPerson.id))
        })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={searchText} onFilterChange={setSearchText} />
      <h2>Add a new</h2>
      <PersonForm onFormSubmit={handleAddContact}
        nameValue={newName} onNameChange={setNewName}
        numberValue={newNumber} onNumberChange={setNewNumber} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} onDeleteClick={onDeleteContact} />
    </div>
  )
}

export default App