import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'Hej',
  reducers: {
    setNotification(state, action) {
      const text = action.payload
      return text
    },
    clearNotification(state, action) {
      return ''
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer