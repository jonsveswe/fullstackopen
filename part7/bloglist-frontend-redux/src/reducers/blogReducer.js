import { createSlice, current } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

// the action.payload in the function contains the argument provided by calling the action creator
const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    likeBlog(state, action) {
      console.log('action.payload in likeBlog: ', action.payload)
      console.log('state in likeBlog: ', current(state))
      const id = action.payload
      return state.map(blog => {
        return blog.id !== id
          ? blog
          : { ...blog, likes: blog.likes + 1 }
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

export const createBlogFcn = (blogObj) => {
  return async dispatch => {
    const newBlog = await blogService.create(blogObj)
    dispatch(createBlog(newBlog))
  }
}
export const deleteBlogFcn = (blog) => {
  return async (dispatch, getState) => {
    await blogService.remove(blog.id)
    dispatch(setBlogs(getState().blogs.filter(b => b.id !== blog.id)))
  }
}
export const likeBlogFcn = (id) => {
  console.log('id in likeBlogFcn: ', id)
  return async (dispatch, getState) => {
    const blog = getState().blogs.find(blog => blog.id === id)
    /*     const blogs = await blogService.getAll()
    const blog = blogs.find(blog => blog.id === id) */
    console.log('blog in likeBlogFcn: ', blog)
    const updatedBlog = {
      ...blog,
      user_id: blog.user_id.id, // Note that in blog this is an object, but in updatedBlog this is a string that is needed for the PUT.
      likes: blog.likes + 1
    }
    // const updatedBlog = { ...blog, likes: blog.likes + 1 }
    await blogService.update(id, updatedBlog)
    console.log('blog.id in likeBlogFcn: ', blog.id)
    dispatch(likeBlog(blog.id))
  }
}

export const commentBlogFcn = (id, comment) => {
  return async (dispatch) => {
    await blogService.comment(id, comment)
    dispatch(initializeBlogs())
  }
}

export const { likeBlog, createBlog, setBlogs } = blogSlice.actions
export default blogSlice.reducer