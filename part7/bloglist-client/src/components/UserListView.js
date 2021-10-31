import React from 'react'

const UserListView = ({ users }) => {

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map(user => <li key={user._id}>{user.username} {user.numBlogs}</li>)}
      </ul>
    </div>

  )
}

export default UserListView