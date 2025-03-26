import Blog from './Blog'
import { useSelector } from 'react-redux'
const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  return (
    <>
      {/* sort mutates the array and we are not allowed to mutate the state in react/redux so we have to make a copy */}
      {[...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )
}

export default BlogList