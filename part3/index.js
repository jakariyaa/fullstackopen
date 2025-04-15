const express = require('express')
const app = express()

app.use(express.json())

let persons = [
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  const now = new Date().toString()
  response.send(
    `<div>Phonebook has info for ${persons.length} people</div>` +
    `</br>` +
    `<div>${now}</div>`
  )
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(p => p.id === id)
  person ? response.json(person) : response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(p => p.id !== id)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body || !body.name || !body.number) {
    return response.status(400).json({
      error: 'Bad Request. Missing Information.'
    })
  }

  if (persons.find(p => p.name === body.name)) {
    return response.status(409).json({
      error: 'Name must be unique.'
    })
  }

  const person = {
    id: String(Math.round(1000000 * Math.random())),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)
  response.status(201).json(person)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log("Server running at:", PORT)
})