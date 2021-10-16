/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/logins'
import NewBlog from './components/NewBlog'
import LoginForm from './components/LoginForm'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
      })
      .catch(error => {
        alert('Wrong username or password', error)
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

  const titleChangeHandler = (event) => {
    setTitle(event.target.value)
  }

  const authorChangeHandler = (event) => {
    setAuthor(event.target.value)
  }

  const urlChangeHandler = (event) => {
    setUrl(event.target.value)
  }

  const createBlogHandler = (event) => {
    event.preventDefault()
    blogService
      .create({
        title,
        author,
        url
      })
      .then(newBlog => {
        setBlogs(blogs.concat(newBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
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
    }
  }

  const blogForm = () => {

    return (
      <div>
        <h2>User: {user.username} <button onClick={(e) => logoutHandler(e)}>Log out</button></h2>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            likeHandler={(e) => likeHandler(e, blog)}
            removeBlogHandler={(e) => removeBlogHandler(e, blog)}
          />
        )}

        <NewBlog
          createBlogHandler={createBlogHandler}
          title={title}
          url={url}
          author={author}
          titleChangeHandler={(e) => titleChangeHandler(e)}
          authorChangeHandler={(e) => authorChangeHandler(e)}
          urlChangeHandler={(e) => urlChangeHandler(e)}
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

export default App