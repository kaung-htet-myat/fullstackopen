/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux'

import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/logins'
import NewBlog from './components/NewBlog'
import LoginForm from './components/LoginForm'
import ErrorMessage from './components/ErrorMessage'

import { setNoti } from './reducers/notificationReducer'
import { initBlogs, createBlog, updateBlog, removeBlog } from './reducers/blogReducer'
import { setUser, removeUser } from './reducers/userReducer'

const App = (props) => {

  const dispatch = useDispatch()

  const newBlogRef = useRef()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

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

    return (
      <div>
        <h2>User: {props.user.username} <button id='logout-button' onClick={(e) => logoutHandler(e)}>Log out</button></h2>
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
  return (
    {
      user: state.user,
      blogs: state.blogs.sort((a,b) => b.likes > a.likes ? 1 : -1),
      noti: state.noti
    }
  )
}

const mapDispatchToProps = {
  setNoti,
  createBlog,
  updateBlog,
  removeBlog,
  setUser,
  removeUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App)