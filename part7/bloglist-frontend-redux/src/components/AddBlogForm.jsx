import { useState } from 'react'
import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { setNotificationFcn } from '../reducers/notificationReducer'
import { setBlogs, createBlogFcn } from '../reducers/blogReducer'

const AddBlogForm = () => {
  const [title, setTitle] = useState('')
  const dispatch = useDispatch()

  const handleAddBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author: 'mesa',
      url: 'www.me.com'
    }
    try {
      /*       const blog = await blogService.create(newBlog)
            const blogs = await blogService.getAll()
            dispatch(setBlogs(blogs)) */
      dispatch(createBlogFcn(newBlog))
      dispatch(setNotificationFcn({ errorMessage: '', successMessage: `a new blog ${newBlog.title} by ${newBlog.author} added` }, 5))
    } catch (exception) {
      dispatch(setNotificationFcn({ errorMessage: `Could not add blog because: ${exception.response.data.error}`, successMessage: '' }, 5))
    }
    setTitle('')
  }

  return (
    <form onSubmit={handleAddBlog}>
      <div>debug: {title}</div>
      title:
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <button type="submit">add blog</button>
    </form>
  )
}

export default AddBlogForm