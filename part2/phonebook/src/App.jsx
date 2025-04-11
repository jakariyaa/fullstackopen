import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleNameAdd = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName) !== undefined) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const newNameObj = { name: newName }
    setPersons(persons.concat(newNameObj))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleNameAdd}>
        <div>
          name: <input value={newName}
            onChange={(event) => setNewName(event.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <p key={person.name}>{person.name}</p>)}
      </div>
    </div>
  )
}

export default App