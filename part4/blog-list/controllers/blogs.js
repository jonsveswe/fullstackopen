const blogsRouter = require('express').Router()
const BlogModel = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await BlogModel.find({}).populate('user_id', { username: 1, name: 1 })
  response.json(blogs)
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

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  console.log('body: ', body)
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
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  // Remember to not make a new BlogModel, like when we do a post, since we want to update the existing one.
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0 // default value 0 if body.likes is undefined
  }
  const updatedBlog = await BlogModel.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const blog = await BlogModel.findById(request.params.id)
  console.log('blog.user_id: ', blog.user_id)
  console.log('request.user._id: ', request.user._id)
  if (blog.user_id.toString() !== request.user._id.toString()) {
    return response.status(401).json({ error: 'only the user that createsd the blog can delete the it' })
  }
  const blog2 = await BlogModel.findByIdAndDelete(request.params.id)
  response.json(blog2) // 200 = OK and blog in the body data
})

module.exports = blogsRouter