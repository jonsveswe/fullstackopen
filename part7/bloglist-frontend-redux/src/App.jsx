import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { setLoggedInUser, clearLoggedInUser } from './reducers/loggedInUserReducer'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Users from './components/UserList'
import User from './components/User'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch
} from 'react-router-dom'

const Menu = ({ user }) => {
  const dispatch = useDispatch()
  const padding = {
    paddingRight: 5
  }
  const style = {
    padding: 5,
    marghinBottom: 10,
    border: 'solid',
    borderWidth: 1,
    backgroundColor: 'lightgrey'
  }
  return (
    <div style={style}>
      <Link to='/' style={padding}>blogs</Link>
      <Link to="/users" style={padding} >users</Link>
      {user
        ? <div style={{ display: 'inline-block' }}>{user} logged in <button onClick={() => dispatch(clearLoggedInUser())}>logout</button></div>
        : <Link to="/login" style={padding} >login</Link>
      }
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(state => state.loggedInUser)
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)
  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null
  const match2 = useMatch('/users/:id')
  const user = match2
    ? users.find(user => user.id === match2.params.id)
    : null
  console.log('Render App')
  console.log('loggedInUser.token: ', loggedInUser?.token)
  console.log('blogs: ', blogs)
  console.log('blog: ', blog)
  console.log('users: ', users)
  console.log('user: ', user)
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInBlogAppUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      blogService.setToken(user.token)
      dispatch(setLoggedInUser(user))
    }
  }, [])

  return (
    <>
      <Menu user={loggedInUser?.name} />
      <h2>blog app</h2>
      <Notification />
      <Routes>
        <Route path="/" element={<div><AddBlogForm /><BlogList /></div>} />
        <Route path='/blogs/:id' element={<Blog blog={blog} />} /> {/* Utilizing useMatch() */}
        {/* <Route path='/blogs/:id' element={<Blog blogs={blogs} />} /> */} {/* Utilizing useParams() */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/users" element={loggedInUser ? <Users /> : <Navigate replace to="/login" />} />
        <Route path="/users/:id" element={<User user={user} />} />
        {/*         {user && <Togglable buttonLabel="new blog">
          <h1>create new</h1>
          <AddBlogForm />
          <BlogList />
        </Togglable>} */}
      </Routes>
    </>
  )
}

export default App