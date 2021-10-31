import React from 'react'

const IndiUserView = ({ blog }) => {

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.url}</p>
      <p>{blog.likes}</p>
      {blog.user ? <p>added by {blog.user.username}</p> : <p>added by anonymous</p>}
    </div>
  )
}

export default IndiUserView