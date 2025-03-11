import { useState } from 'react'
const Blog = (props) => {
  const { blog, updateLikes, deleteBlog, user } = props
  console.log('props: ', props)
  const [visible, setVisible] = useState(false)
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
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>likes: {blog.likes} <button onClick={() => updateLikes(blog)}>+</button></div>
          <div>{blog.user_id?.name ? blog.user_id.name : 'no user'}</div>
          {blog.user_id?.name === user?.name && <button onClick={() => deleteBlog(blog)}>delete</button>}
          <div>blog.user_id?.name: {blog.user_id?.name}</div>
          <div>user?.name: {user?.name}</div>
        </div>
      )}
    </div>
  )

}

export default Blog