const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

// Add the token to the request object so we can easily access it in the controllers.
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }
  next()
}

const userExtractor = async (request, response, next) => {
  try {
    // The object decoded from the token contains the username and id fields,
    // since we added them to the token in the loginRouter.post() when token was made.
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'no user found for token' })
    }
    const user = await User.findById(decodedToken.id)
    /* Example response:
      user:  {
        _id: new ObjectId('67cac5e905bac8d0696f6eb7'),
        username: 'hejhejda',
        name: 'jonasdd',
        passwordHash: '$2b$10$.LSdq5RfoC6UQ4tYobHd/Oa7Om0uyAwlb/oqOQqrP67akRrqapD.q',
        blog_ids: [],
        __v: 0
      }
      */
    request.user = user
    next()
  } catch (error) {
    next(error)
  }

}

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    // console.log('ValidationError error.message: ', error.message)
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  } else if (error.name ===  'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' }) // 401 Unauthorized
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  }
  next(error)
}

module.exports = {
  tokenExtractor,
  userExtractor,
  requestLogger,
  unknownEndpoint,
  errorHandler
}