import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const UsersTitle = styled.p`
  color:darkgray;
  font-size:30px;
  margin-top:30px;
  margin-left:12px;
`

const UserListView = ({ users }) => {

  return (
    <div>
      <UsersTitle>Users</UsersTitle>
      <ul>
        {users.map(user => <li key={user._id}><Link to={`/users/${user._id}`}>{user.username}</Link> {user.numBlogs}</li>)}
      </ul>
    </div>
  )
}

export default UserListView