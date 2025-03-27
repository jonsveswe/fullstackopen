import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { setNotificationFcn } from '../reducers/notificationReducer'
import { setBlogs, likeBlogFcn, deleteBlogFcn } from '../reducers/blogReducer'
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

const Blog = (props) => {
  const blog = props.blog
  console.log('blog in Blog: ', blog)
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  // const blogs = useSelector(state => state.blogs)
  const loggedInUser = useSelector(state => state.loggedInUser)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const updateLikes = async (blog) => {
    console.log('blog in updateLikes: ', blog)
    /*     const updatedBlog = {
          ...blog,
          user_id: blog.user_id.id, // Note that in blog this is an object, but in updatedBlog this is a string that is needed for the PUT.
          likes: blog.likes + 1
        }
        await blogService.update(updatedBlog.id, updatedBlog)
        dispatch(setBlogs(blogs.map(b => b.id !== blog.id ? b : { ...b, likes: b.likes + 1 }))) */
    dispatch(likeBlogFcn(blog.id))
  }

  const deleteBlog = async (blog) => {
    /*     if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
          return */
    try {
      /*       await blogService.remove(blog.id)
            dispatch(setBlogs(blogs.filter(b => b.id !== blog.id))) */
      dispatch(deleteBlogFcn(blog))
    } catch (exception) {
      dispatch(setNotificationFcn({ errorMessage: `Could not delete blog because: ${exception.response.data.error}`, successMessage: '' }, 5))
    }
  }

  if (!blog) return null
  return (
    <li style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link> <button id='button-view' onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>likes: {blog.likes} <button id='button-likes' onClick={() => updateLikes(blog)}>+</button></div>
          <div>{blog.user_id?.name ? blog.user_id.name : 'no user'}</div>
          {blog.user_id?.name === loggedInUser?.name && <button onClick={() => deleteBlog(blog)}>delete</button>}
          <div>blog.user_id?.name: {blog.user_id?.name}</div>
          <div>loggedInUser?.name: {loggedInUser?.name}</div>
        </div>
      )}
    </li>
  )

}

export default Blog