import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import BlogList from './components/BlogList'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  console.log('Render App')
  console.log('user.token: ', user?.token)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInBlogAppUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }, [])

  return (
    <>
      <h2>blogs</h2>
      <Notification />
      <LoginForm />
      {user && <Togglable buttonLabel="new blog">
        <h1>create new</h1>
        <AddBlogForm />
        <BlogList />
      </Togglable>}
    </>
  )
}

export default App