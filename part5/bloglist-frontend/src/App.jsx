import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  let tokenInApp
  console.log('Render App')
  console.log('tokenInApp: ', tokenInApp)
  console.log('user.token: ', user?.token)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInBlogAppUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

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
      tokenInApp = user.token
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setUsername('')
      setPassword('')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const handelLogout = () => {
    window.localStorage.removeItem('loggedInBlogAppUser')
    blogService.setToken(null)
    setUser(null)
  }
  const handleAddBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        title,
        author: 'mesa',
        url: 'www.me.com'
      }
      const blog = await blogService.create(newBlog)
      setBlogs(blogs.concat(blog))
      setTitle('')
      setSuccessMessage(`a new blog ${blog.title} by ${blog.author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage(`Could not add blog because: ${exception.response.data.error}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  return (
    <>
      <h2>blogs</h2>
      <Notification errorMessage={errorMessage} successMessage={successMessage} />
      {user === null ?
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword} />
        :
        <div>
          <div>{user.name} logged in <button onClick={handelLogout}>logout</button></div>
          <h1>create new</h1>
          <form onSubmit={handleAddBlog}>
            title:
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <button type="submit">add blog</button>
          </form>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </>
  )
}

export default App