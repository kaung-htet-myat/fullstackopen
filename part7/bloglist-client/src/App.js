/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link, Switch, Route, useRouteMatch, useHistory } from 'react-router-dom'

import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/logins'
import NewBlog from './components/NewBlog'
import LoginForm from './components/LoginForm'
import ErrorMessage from './components/ErrorMessage'
import Menu from './components/Menu'
import UserListView from './components/UserListView'
import IndiUserView from './components/IndiUserView'
import IndiBlogView from './components/IndiBlogView'

import { setNoti } from './reducers/notificationReducer'
import { initBlogs, createBlog, updateBlog, removeBlog } from './reducers/blogReducer'
import { setUser, removeUser } from './reducers/userReducer'
import { initUsers } from './reducers/userListReducer'

const App = (props) => {

  const newBlogRef = useRef()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    props.initBlogs()
    props.initUsers()
  }, [])

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const currentUser = JSON.parse(loggedInUser)
      props.setUser(currentUser)
      blogService.setToken(currentUser.token)
    }
  }, [])

  const loginHandler = (event) => {
    event.preventDefault()
    loginService
      .login({ username, password })
      .then(returnedUser => {
        localStorage.setItem('loggedInUser', JSON.stringify(returnedUser))
        blogService.setToken(returnedUser.token)
        props.setUser(returnedUser)
        setUsername('')
        setPassword('')
        props.setNoti('CLEAR', 0)
      })
      .catch(error => {
        props.setNoti('FAILED-LOGIN', 5000)
      })
  }

  const usernameChangeHandler = (event) => {
    setUsername(event.target.value)
  }

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value)
  }

  const logoutHandler = (event) => {
    localStorage.removeItem('loggedInUser')
    props.removeUser()
  }

  const createBlog = (blogObject) => {
    props.createBlog(blogObject)
    newBlogRef.current.toggleVisible()
  }

  const likeHandler = (event, blog) => {
    props.updateBlog(blog)
  }

  const removeBlogHandler = (event, blog) => {
    if (window.confirm(`Remove ${blog.title} from phonebook?`)) {
      try {
        props.removeBlog(blog)
      }
      catch (error) {
        props.setNoti('INVALID-DELETE', 5000)
      }
    }
  }

  const blogForm = () => {

    const errorToShow = props.noti ?
      <ErrorMessage message={props.noti} /> :
      null

    const blogMatch = useRouteMatch('/:id')
    const indiBlog = blogMatch
      ? props.blogs.find(blog => Number(blog.id) === Number(blogMatch.params.id))
      : null

    const userMatch = useRouteMatch('/users/:id')
    const indiUser = userMatch
      ? props.users.find(user => Number(user.id) === Number(userMatch.params.id))
      : null

    return (
      <div>
        <Menu />
        <h2>User: {props.user.username} <button id='logout-button' onClick={(e) => logoutHandler(e)}>Log out</button></h2>
        <Switch>
          <Route path='/users/:id'>
            <IndiUserView user={indiUser}/>
          </Route>
          <Route path='/users'>
            <UserListView users={props.users}/>
          </Route>
          <Route path='/:id'>
            <IndiBlogView blog={indiBlog} />
          </Route>
          <Route path='/'>
            <div>
              <h2>blogs</h2>
              {errorToShow}
              {props.blogs.map(blog =>
                <Blog
                  key={blog.id}
                  blog={blog}
                  likeHandler={(e) => likeHandler(e, blog)}
                  removeBlogHandler={(e) => removeBlogHandler(e, blog)}
                />
              )}

              <NewBlog
                createBlog={createBlog}
                refProp={newBlogRef}
              />
            </div>
          </Route>
        </Switch>
      </div>
    )
  }

  return (
    <div>
      <h1>Blog Lists</h1>
      {
        props.user === null ?
          <LoginForm
            alertBox={props.noti}
            username={username}
            password={password}
            loginHandler={loginHandler}
            usernameChangeHandler={(e) => usernameChangeHandler(e)}
            passwordChangeHandler={(e) => passwordChangeHandler(e)}
          /> :
          blogForm()
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  const users = state.users.map(user => {
    return (
      {
        ...user,
        numBlogs: user.blogs.length
      }
    )
  }
  )
  return (
    {
      user: state.user,
      blogs: state.blogs.sort((a, b) => b.likes > a.likes ? 1 : -1),
      noti: state.noti,
      users
    }
  )
}

const mapDispatchToProps = {
  initBlogs,
  setNoti,
  createBlog,
  updateBlog,
  removeBlog,
  setUser,
  removeUser,
  initUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(App)