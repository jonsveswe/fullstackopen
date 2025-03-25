import { createSlice, current } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

// the action.payload in the function contains the argument provided by calling the action creator
const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    voteBlog(state, action) {
      console.log('action.payload in voteBlog: ', action.payload)
      console.log('state in voteBlog: ', current(state))
      const id = action.payload
      return state.map(blog => {
        return blog.id !== id
          ? blog
          : { ...blog, votes: blog.votes + 1 }
      })
    },
    createBlog(state, action) {
      const blog = action.payload
      return [...state, blog]
    },
    setBlogs(state, action) {
      return action.payload
    }
  }
})


export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlogFcn = (blogAsText) => {
  return async dispatch => {
    const newBlog = await blogService.create(blogAsText)
    dispatch(createBlog(newBlog))
  }
}

export const voteBlogFcn = (id) => {
  console.log('id in voteBlogFcn: ', id)
  return async (dispatch, getState) => {
    const blog = getState().blogs.find(blog => blog.id === id)
    /*     const blogs = await blogService.getAll()
    const blog = blogs.find(blog => blog.id === id) */
    console.log('blog in voteBlogFcn: ', blog)
    const updatedBlog = { ...blog, votes: blog.votes + 1 }
    await blogService.update(updatedBlog)
    console.log('blog.id in voteBlogFcn: ', blog.id)
    dispatch(voteBlog(blog.id))
  }
}
export const { voteBlog, createBlog, setBlogs } = blogSlice.actions
export default blogSlice.reducer