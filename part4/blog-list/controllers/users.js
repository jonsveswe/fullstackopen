const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const UserModel = require('../models/user')

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await UserModel.find({}).populate('blog_ids', { title: 1, author: 1 })
    response.json(users)
  } catch (error) {
    next(error)
  }
})

usersRouter.get('/:id', async (request, response) => {
  const user = await UserModel.findById(request.params.id)
  console.log('user: ', user)
  if (user) {
    response.json(user)
  } else {
    response.status(404).end()
  }
})

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body

  // "Manual" validation since our User model doesn't have password but passwordHash.
  if (!password || password.length < 3) {
    return response.status(400).json({ error: 'password must be at least 3 characters long' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new UserModel({
    username,
    name,
    passwordHash,
  })

  try {
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter