import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { setNotificationFcn } from '../reducers/notificationReducer'
import { setLoggedInUser, clearLoggedInUser } from '../reducers/loggedInUserReducer'
import loginService from '../services/login'
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

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const loggedInUser = useSelector(state => state.loggedInUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password
      })
      console.log('user', user)
      /* user example
      {
        token: "...",
        username: "root",
        name: "jonas"
      } */
      window.localStorage.setItem(
        'loggedInBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(setLoggedInUser(user))
      setUsername('')
      setPassword('')
      navigate('/')
    } catch (exception) {
      dispatch(setNotificationFcn({ errorMessage: 'wrong credentials', successMessage: '' }, 5))
      setUsername('')
      setPassword('')
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBlogAppUser')
    blogService.setToken(null)
    dispatch(clearLoggedInUser())
  }
  if (loggedInUser) {
    return <div>{loggedInUser.name} logged in <button onClick={handleLogout}>logout</button></div>
  }
  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type='text' value={username} name='Username' onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password
          <input type='password' value={password} name='Password' onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type='submit'>login</button>
      </form>
    </>
  )
}

export default LoginForm