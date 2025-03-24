import { useState } from 'react'

const LoginForm = (props) => {
  console.log('props', props)
  const { addBlog } = props
  const [title, setTitle] = useState('')
  const handleAddBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author: 'mesa',
      url: 'www.me.com'
    }
    addBlog(newBlog)
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

export default LoginForm