import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { errorMessage: '', successMessage: '' },
  reducers: {
    setNotification(state, action) {
      const obj = action.payload
      return obj
    },
    clearNotification(state, action) {
      return { errorMessage: '', successMessage: '' }
    }
  }
})

export const setNotificationFcn = (obj, time) => {
  const { errorMessage, successMessage } = obj
  return async dispatch => {
    dispatch(setNotification(obj))
    setTimeout(() => dispatch(clearNotification()), time * 1000)
  }
}

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer