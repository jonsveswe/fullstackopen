const blogsRouter = require('express').Router()
const BlogModel = require('../models/blog.js')

blogsRouter.get('/', (request, response) => {
  BlogModel
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
  const body = request.body
  // const blog = new BlogModel(request.body)
  // const blog = new BlogModel(body)
  const blog = new BlogModel({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })
  blog
    .save()
    .then(result => {
      response.status(201).json(result) // 201 = resource created
    })
})

module.exports = blogsRouter