import React from 'react'

const IndiUserView = ({ user }) => {

  console.log('user: ', user)

  return (
    <div>
      <h2>{user.username}</h2>
      <h3>added blogs</h3>
      {user.blogs ?
        <ul>
          {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
        </ul> :
        null
      }
    </div>
  )
}

export default IndiUserView