const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', function (req) {
  return JSON.stringify(req.body)
})
// app.use(morgan('tiny'))
// app.use(morgan(':method :url :status :res :response-time ms'))
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.body(req, res)
  ].join(' ')
}))

let phonebook = [
  {
    'id': '1',
    'name': 'Arto Hellas',
    'number': '040-123456'
  },
  {
    'id': '2',
    'name': 'Ada Lovelace',
    'number': '39-44-5323523'
  },
  {
    'id': '3',
    'name': 'Dan Abramov',
    'number': '12-43-234345'
  },
  {
    'id': '4',
    'name': 'Mary Poppendieck',
    'number': '39-23-6423122'
  }
]

app.get('/info', (request, response) => {
  response.send(`<div>Phonebook has info for ${phonebook.length} people</div>
        <div>${new Date()}</div>`)
})

app.get('/api/persons', (request, response) => {
  response.json(phonebook)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  // console.log(request.params)
  const person = phonebook.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.statusMessage = `Person with id ${id} was not found`
    response.status(404).end()
  }
})

const generateId = () => {
  const min = 1
  const max = 1000000
  return String(Math.floor(Math.random() * (max - min) + min))
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  // console.log('body: ',body)
  if (!body.name || !body.number) {
    return response.status(400).json({ // 400 = bad request
      error: 'Name or number missing'
    })
  } else if (phonebook.find(person => person.name === body.name)) {
    return response.status(400).json({ // 400 = bad request
      error: 'Name must be unique'
    })
  }
  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }
  phonebook = phonebook.concat(person)
  // console.log('phonebook: ',phonebook)
  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = phonebook.find(person => person.id === id)
  if (person) {
    phonebook = phonebook.filter(person => person.id !== id)
    response.json(person) // 200 (OK) and the person in the body data.
  } else {
    response.statusMessage = `Person with id ${id} was not found`
    response.status(404).end()
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log('Server is running on port ', PORT)
})