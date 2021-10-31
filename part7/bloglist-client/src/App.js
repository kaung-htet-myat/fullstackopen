/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/logins'
import NewBlog from './components/NewBlog'
import LoginForm from './components/LoginForm'
import ErrorMessage from './components/ErrorMessage'

import { setNoti } from './reducers/notificationReducer'

const App = (props) => {

  const newBlogRef = useRef()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll()
      .then(blogs => {
        setBlogs(blogService.sortBlogs(blogs))
      })
  }, [])

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const currentUser = JSON.parse(loggedInUser)
      setUser(currentUser)
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
        setUser(returnedUser)
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
    setUser(null)
  }

  const createBlog = (blogObject) => {
    blogService.create(blogObject)
      .then(newBlog => {
        setBlogs(blogs.concat(newBlog))
        newBlogRef.current.toggleVisible()
      })
  }

  const likeHandler = (event, blog) => {
    blogService
      .likeBlog(blog)
      .then(updatedBlog => {
        setBlogs(blogs.map(b => b.id !== updatedBlog.id ? b : updatedBlog))
      })
  }

  const removeBlogHandler = (event, blog) => {
    if (window.confirm(`Remove ${blog.title} from phonebook?`)) {
      blogService
        .removeBlog(blog)
        .then(status => {
          if (status === 204) {
            setBlogs(blogs.filter(b => b.id !== blog.id))
          }
        })
        .catch(error => {
          props.setNoti('INVALID-DELETE', 5000)
        })
    }
  }

  const blogForm = () => {

    const errorToShow = props.noti ?
      <ErrorMessage message={props.noti} /> :
      null

    return (
      <div>
        <h2>User: {user.username} <button id='logout-button' onClick={(e) => logoutHandler(e)}>Log out</button></h2>
        <h2>blogs</h2>
        {errorToShow}
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            likeHandler={(e) => likeHandler(e, blog)}
            removeBlogHandler={(e) => removeBlogHandler(e, blog)}
          />
        )}

        <NewBlog
          createBlog={createBlog}
          refProp = {newBlogRef}
        />

      </div>
    )
  }

  return (
    <div>
      <h1>Blog Lists</h1>
      {
        user === null ?
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
      noti: state.noti
    }
  )
}

const mapDispatchToProps = {
  setNoti
}

export default connect(mapStateToProps, mapDispatchToProps)(App)