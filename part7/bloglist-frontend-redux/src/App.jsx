import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import Togglable from './components/Togglable'
import { useDispatch } from 'react-redux'
import { setNotificationFcn } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  let tokenInAppTest

  console.log('Render App')
  console.log('tokenInApp: ', tokenInAppTest)
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
      tokenInAppTest = user.token
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      // setErrorMessage('wrong credentials')
      dispatch(setNotificationFcn({ errorMessage: 'wrong credentials', successMessage: '' }, 5))
      setUsername('')
      setPassword('')
      /*       setTimeout(() => {
              setErrorMessage(null)
            }, 5000) */
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBlogAppUser')
    blogService.setToken(null)
    setUser(null)
  }
  const addBlog = async (newBlog) => {
    try {
      const blog = await blogService.create(newBlog)
      // setBlogs(blogs.concat(blog))
      const blogs = await blogService.getAll()
      setBlogs(blogs)
      // setSuccessMessage(`a new blog ${blog.title} by ${blog.author} added`)
      dispatch(setNotificationFcn({ errorMessage: '', successMessage: `a new blog ${blog.title} by ${blog.author} added` }, 5))
      /*       setTimeout(() => {
              setSuccessMessage(null)
            }, 5000) */
    } catch (exception) {
      // setErrorMessage(`Could not add blog because: ${exception.response.data.error}`)
      dispatch(setNotificationFcn({ errorMessage: `Could not add blog because: ${exception.response.data.error}`, successMessage: '' }, 5))
      /*       setTimeout(() => {
              setErrorMessage(null)
            }, 5000) */
    }
  }

  const updateLikes = async (blog) => {
    const updatedBlog = {
      ...blog,
      user_id: blog.user_id.id, // Note that in blog this is an object, but in updatedBlog this is a string that is needed for the PUT.
      likes: blog.likes + 1
    }
    await blogService.update(updatedBlog.id, updatedBlog)
    setBlogs(blogs.map(b => b.id !== blog.id ? b : { ...b, likes: b.likes + 1 }))
  }

  const deleteBlog = async (blog) => {
    /*     if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
          return */
    try {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    } catch (exception) {
      // setErrorMessage(`Could not delete blog because: ${exception.response.data.error}`)
      dispatch(setNotificationFcn({ errorMessage: `Could not delete blog because: ${exception.response.data.error}`, successMessage: '' }, 5))
      /*       setTimeout(() => {
              setErrorMessage(null)
            }, 5000) */
    }
  }

  return (
    <>
      <h2>blogs</h2>
      {/* <Notification errorMessage={errorMessage} successMessage={successMessage} /> */}
      <Notification />
      {user === null ?
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword} />
        :
        <div>
          <div>{user.name} logged in <button onClick={handleLogout}>logout</button></div>
          <Togglable buttonLabel="new blog">
            <h1>create new</h1>
            <AddBlogForm addBlog={addBlog} />
            {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
              <Blog key={blog.id} blog={blog} updateLikes={updateLikes} deleteBlog={deleteBlog} user={user} />
            )}
          </Togglable>
        </div>
      }
    </>
  )
}

export default App