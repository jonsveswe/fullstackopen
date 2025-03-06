const blogsRouter = require('express').Router()
const BlogModel = require('../models/blog.js')

blogsRouter.get('/', async (request, response) => {
  const blogs = await BlogModel.find({})
  response.json(blogs)

  /*   BlogModel
    .find({})
    .then(blogs => {
      response.json(blogs)
    }) */

})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  // const blog = new BlogModel(request.body)
  // const blog = new BlogModel(body)

  /*   if (!body.title || !body.url) {
    return response.status(400).json({ error: 'title or url missing' })
  } */

  const blog = new BlogModel({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0 // default value 0 if body.likes is undefined
  })

  try {
    const result = await blog.save()
    response.status(201).json(result) // 201 = resource created
  } catch (exception) {
    console.log(exception)
    next(exception)
  }

  /*   blog
    .save()
    .then(result => {
      response.status(201).json(result) // 201 = resource created
    }) */

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