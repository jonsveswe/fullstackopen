import { createSlice, current } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

// the action.payload in the function contains the argument provided by calling the action creator
const loggedInUserSlice = createSlice({
  name: 'loggedInUser',
  initialState: null,
  reducers: {
    setLoggedInUser(state, action) {
      return action.payload
    },
    clearLoggedInUser(state, action) {
      window.localStorage.removeItem('loggedInBlogAppUser')
      blogService.setToken(null)
      return null
    }
  }
})

export const { setLoggedInUser, clearLoggedInUser } = loggedInUserSlice.actions
export default loggedInUserSlice.reducer