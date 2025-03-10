const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const BlogModel = require('../models/blog')
const UserModel = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

let initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 6
  }
]

let token = ''

// Reset the database to a known state before running the tests.
beforeEach(async () => {
  console.log('beforeEach')
  await BlogModel.deleteMany({})
  await UserModel.deleteMany({})
  const saltRounds = 10
  const username = 'root'
  const password = 'sekret'
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const initialUser = {
    username: username,
    name: 'Jaa',
    passwordHash: passwordHash
  }
  const user = new UserModel(initialUser)
  await user.save()
  initialBlogs = [
    {
      ...initialBlogs[0],
      user_id: user._id
    },
    {
      ...initialBlogs[1],
      user_id: user._id
    }
  ]
  await BlogModel.insertMany(initialBlogs)

  const response = await api
    .post('/api/login')
    .send({ username: username, password: password })
  /*
    response.body:  {
      token: '...',
      username: 'root',
      name: 'Jaa'
    }
  */
  token = response.body.token
})

test('blogs are returned as json', async () => {
  // assert.ok('OK')
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')
  console.log('response.body: ', response.body)
  assert.strictEqual(response.body.length, 2)
})

test('the unique identifier property of the blog posts is named id, not _id', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual('id' in response.body[0], true)
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'abc',
    author: 'Jonas',
    url: 'http://aaa.html',
    likes: 3
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`) // 'bearer' does not work
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, initialBlogs.length + 1)

  const titles = response.body.map(r => r.title)
  assert(titles.includes('abc'))
})

test('if the likes property is missing from the request, it will default to 0', async () => {
  const newBlog = {
    title: 'abc',
    author: 'Jonas',
    url: 'http://aaa.html'
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`) // 'bearer' does not work
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body[response.body.length - 1].likes, 0)
})

// This can be solved by either checking "if (!body.title || !body.url)..." in the POST handler or by
// adding validation "required: true" in the blog model.
test('if the title or url property is missing from the request, the request will be rejected with 400', async () => {
  const newBlog = {
    author: 'Jonas',
    url: 'http://aaa.html'
  }
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`) // 'bearer' does not work
    .send(newBlog)
    .expect(400)
  console.log('First test missing Title')

  const newBlog2 = {
    title: 'abc',
    author: 'Jonas'
  }
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`) // 'bearer' does not work
    .send(newBlog2)
    .expect(400)
  console.log('Second test missing Url')
})

describe('updating a blog', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const response = await api.get('/api/blogs')
    const blogsBeforeUpdate = response.body
    console.log('response.body: ', response.body)
    const blogToUpdate = blogsBeforeUpdate[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ ...blogToUpdate, likes: blogToUpdate.likes + 1 })
      .expect(200)

    const response2 = await api.get('/api/blogs')
    const blogsAfterUpdate = response2.body
    console.log('response2.body: ', response2.body)
    assert.strictEqual(blogsAfterUpdate.length, initialBlogs.length)
    assert.strictEqual(blogsAfterUpdate[0].likes, blogToUpdate.likes + 1)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const response = await api.get('/api/blogs')
    const blogsBeforeDelete = response.body
    console.log('response.body: ', response.body)
    const blogToDelete = blogsBeforeDelete[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    const response2 = await api.get('/api/blogs')
    const blogsAfterDelete = response2.body
    console.log('response2.body: ', response2.body)
    assert.strictEqual(blogsAfterDelete.length, initialBlogs.length - 1)

    const titles = blogsAfterDelete.map(r => r.title)
    assert(!titles.includes(blogToDelete.title))
  })
})

after(async () => {
  await mongoose.connection.close()
})