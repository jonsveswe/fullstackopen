import { createSlice, current } from '@reduxjs/toolkit'

// the action.payload in the function contains the argument provided by calling the action creator
const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser(state, action) {
      return null
    }
  }
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer