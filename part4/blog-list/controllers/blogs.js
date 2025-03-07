const blogsRouter = require('express').Router()
const BlogModel = require('../models/blog')
const UserModel = require('../models/user')

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

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  console.log('body: ', body)

  const user = await UserModel.findById(body.user_id)
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

  const blog = new BlogModel({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0, // default value 0 if body.likes is undefined
    // Note that user_id has type "type: mongoose.Schema.Types.ObjectId, ref: 'User'",
    // so we can't use the simple string body.user_id.
    user_id: user._id
  })

  try {
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

  // Remember to not make a new BlogModel, like when we do a post.
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

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await BlogModel.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter