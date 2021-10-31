import React from 'react'
import { Link } from 'react-router-dom'

const UserListView = ({ users }) => {

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map(user => <li key={user._id}><Link to={`/users/${user._id}`}>{user.username}</Link> {user.numBlogs}</li>)}
      </ul>
    </div>
  )
}

export default UserListView