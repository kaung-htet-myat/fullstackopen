import React from 'react'
import styled from 'styled-components'

const StyledUsersTitle = styled.p`
  color:darkgray;
  font-size:30px;
  margin-top:30px;
  margin-left:12px;
`

const StyledAddedBlogs = styled.p`
  color:darkgray;
  font-size:24px;
  margin-bottom:20px;
  margin-left:12px;
`

const IndiUserView = ({ user }) => {

  console.log('user: ', user)

  return (
    <div>
      <StyledUsersTitle>{user.username}</StyledUsersTitle>
      <StyledAddedBlogs>added blogs</StyledAddedBlogs>
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