import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
// import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'


// The Redux thunk middleware is automatically added
const store = configureStore({
  reducer: {
    blogs: blogReducer,
    // filter: filterReducer,
    notification: notificationReducer,
    user: userReducer
  }
})

export default store