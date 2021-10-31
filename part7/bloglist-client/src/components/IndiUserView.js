import React from 'react'
import users from '../services/users'

const IndiUserView = ({ user }) => {

  return (
    <div>
      <h2>{users.username}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

export default IndiUserView