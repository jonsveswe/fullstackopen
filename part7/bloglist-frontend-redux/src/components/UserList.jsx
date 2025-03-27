import React from 'react'
import { useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch
} from 'react-router-dom'

const UserList = () => {
  const users = useSelector(state => state.users)
  return (
    <>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>blogs created</th>
          </tr>
          {users.map(user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name} {user.username}</Link></td>
              <td>{user.blog_ids.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}

export default UserList