const blogsRouter = require('express').Router()
const BlogModel = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await BlogModel.find({}).populate('user_id', { username: 1, name: 1 })
  response.json(blogs)

  /*   BlogModel
    .find({})
    .then(blogs => {
      response.json(blogs)
    }) */

})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await BlogModel.findById(request.params.id)
  console.log('request.params.id: ', request.params.id)
  console.log('blog: ', blog)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

/* const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
} */

blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  try {
    const body = request.body
    console.log('body: ', body)

    /*     const decodedToken = jwt.verify(request.token, process.env.SECRET) // request.token comes from tokenExtractor middleware
    console.log('decodedToken: ', decodedToken)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'no user found for token' })
    }
    const user = await UserModel.findById(decodedToken.id) */

    const user = request.user // user comes from userExtractor middleware
    const blog = new BlogModel({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0, // default value 0 if body.likes is undefined
      // Note that user_id has type "type: mongoose.Schema.Types.ObjectId, ref: 'User'",
      // so we can't use the simple string body.user_id.
      user_id: user._id
    })

    const savedBlog = await blog.save()
    user.blog_ids = user.blog_ids.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog) // 201 = resource created
  } catch (exception) {
    console.log(exception)
    next(exception)
  }

})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  // Remember to not make a new BlogModel, like when we do a post, since we want to update the existing one.
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0 // default value 0 if body.likes is undefined
  }

  try {
    const updatedBlog = await BlogModel.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
  } catch (exception) {
    console.log(exception)
    next(exception)
  }
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  try {
    // Only the user who added the blog can delete it.
    /*     const decodedToken = jwt.verify(request.token, process.env.SECRET) // request.token comes from tokenExtractor middleware
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'no user found for token' })
    } */

    const blog = await BlogModel.findById(request.params.id)
    console.log('blog.user_id: ', blog.user_id)
    console.log('request.user._id: ', request.user._id)
    if (blog.user_id.toString() !== request.user._id.toString()) {
      return response.status(401).json({ error: 'only the user that createsd the blog can delete the it' })
    }

    const blog2 = await BlogModel.findByIdAndDelete(request.params.id)
    response.json(blog2) // 200 = OK and blog in the body data
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter