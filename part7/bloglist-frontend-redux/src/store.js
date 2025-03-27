import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
// import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
import loggedInUserReducer from './reducers/loggedInUserReducer'


// The Redux thunk middleware is automatically added
const store = configureStore({
  reducer: {
    blogs: blogReducer,
    users: userReducer,
    // filter: filterReducer,
    notification: notificationReducer,
    loggedInUser: loggedInUserReducer
  }
})

export default store