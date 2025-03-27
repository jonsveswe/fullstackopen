import { useState } from 'react'
import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { setNotificationFcn } from '../reducers/notificationReducer'
import { setBlogs, createBlogFcn, commentBlogFcn } from '../reducers/blogReducer'

const AddCommentForm = (props) => {
  const { blog } = props
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const handleAddComment = async (event) => {
    event.preventDefault()
    console.log('comment in handleAddComment: ', comment)
    console.log('blog in handleAddComment: ', blog)
    try {
      /*       const blog = await blogService.create(newBlog)
            const blogs = await blogService.getAll()
            dispatch(setBlogs(blogs)) */
      dispatch(commentBlogFcn(blog.id, comment))
      // dispatch(setNotificationFcn({ errorMessage: '', successMessage: `a new blog ${newBlog.title} by ${newBlog.author} added` }, 5))
    } catch (exception) {
      dispatch(setNotificationFcn({ errorMessage: `Could not add blog because: ${exception.response.data.error}`, successMessage: '' }, 5))
    }
    setComment('')
  }

  return (
    <form onSubmit={handleAddComment}>
      <div>debug: {comment}</div>
      title:
      <input
        value={comment}
        onChange={(event) => setComment(event.target.value)}
      />
      <button type="submit">add comment</button>
    </form>
  )
}

export default AddCommentForm