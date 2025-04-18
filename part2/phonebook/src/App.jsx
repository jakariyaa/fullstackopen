import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchText, setSearchText] = useState('')
  const [notifiMsg, setNotifMsg] = useState(null)

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
      const message = `${foundPerson.name} is already added to phonebook, replace` +
        ` the old number with a new one?`
      if (window.confirm(message)) {
        personService
          .update(foundPerson.id, newPersonObj)
          .then(returnedPerson => {
            setPersons(persons.map(person =>
              person.id === returnedPerson.id ? returnedPerson : person))
          }).catch(error => {
            setNotifMsg({
              type: 'error',
              content: `Information of ${foundPerson.name} has already been deleted. ` +
                `Error: ${error.response.data.error}`
            })
            setTimeout(() => {
              setNotifMsg(null)
            }, 3000)
          })
        setNotifMsg({
          type: 'successful',
          content: `Updated Number for ${foundPerson.name}`
        })
        setTimeout(() => {
          setNotifMsg(null)
        }, 3000)
      }
    } else {
      personService
        .create(newPersonObj)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        }).catch(error => {
          setNotifMsg({
            type: 'error',
            content: `Not Added. ${error.response.data.error}`
          })
          setTimeout(() => {
            setNotifMsg(null)
          }, 5000)
        })
      setNotifMsg({
        type: 'successful',
        content: `Added ${newName}`
      })
      setTimeout(() => {
        setNotifMsg(null)
      }, 3000)
    }
    setNewName('')
    setNewNumber('')
  }

  const onDeleteContact = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        }).catch(error => {
          setNotifMsg({
            type: 'error',
            content: `Information of ${name} has already been deleted. ` +
              `Error: ${error.response.data.error}`
          })
          setTimeout(() => {
            setNotifMsg(null)
          }, 5000)
        })
      setNotifMsg({
        type: 'successful',
        content: `Deleted ${name}`
      })
      setTimeout(() => {
        setNotifMsg(null)
      }, 3000)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifiMsg} />
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