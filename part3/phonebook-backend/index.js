const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/phonebook')
require('dotenv').config()

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

app.get('/info', (request, response, next) => {
  Person.find({}).then(persons => {
    console.log('persons: ', persons)
    response.send(`<div>Phonebook has info for ${persons.length} people</div>
            <div>${new Date()}</div>`)
  }).catch(error => {
    console.log('error: ', error)
    next(error) // continue to the error handler middleware
  })
})

app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(persons => {
    console.log('persons: ', persons)
    response.json(persons)
  }).catch(error => {
    console.log('error: ', error)
    next(error) // continue to the error handler middleware
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  console.log('request.params', request.params)
  Person.findById(id).then(person => {
    console.log(person)
    if (person) {
      response.json(person)
    } else {
      /*             response.statusMessage = `Person with id ${id} was not found`
                        response.status(404).end() // 404 = not found */
      response.status(404).send({ message: `Person with id ${id} was not found` }) // 404 = not found
    }
  }).catch(error => {
    console.log('error: ', error)
    next(error) // continue to the error handler middleware
  })
  /* .catch(error => {
        console.log('error: ', error)
        response.status(400).send({ error_reason: `${error.reason}` }) // 400 = bad request
    }) */
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  console.log('body: ', body)
  if (!body.name || !body.number) {
    return response.status(400).json({ // 400 = bad request
      error: 'Name or number missing'
    })
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  })
  person.save().then(savedPerson => {
    response.json(savedPerson)
  }).catch(error => {
    next(error)
  })
})

app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  const body = request.body
  console.log(id)
  console.log(body)
  const person = {
    name: body.name,
    number: body.number,
  }
  // Note that the ``findByIdAndUpdate`` method receives a *regular JavaScript object* as its argument,
  // and not a new Person object created with the ``Person`` constructor function.
  Person.findByIdAndUpdate(id, person, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndDelete(id).then(person => {
    console.log('person to delete: ', person)
    if (person) {
      response.json(person) // 200 (OK) and the person in the body data.
    } else {
      response.status(404).send({ message: `Person with id ${id} was not found` }) // 404 = not found
    }
  }).catch(error => {
    console.log('error: ', error)
    next(error) // continue to the error handler middleware
  })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.log('error: ', error)
  console.error('error.message: ', error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }
  // If no excplicit handler, pass the error to Express default error handler
  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log('Server is running on port ', PORT)
})