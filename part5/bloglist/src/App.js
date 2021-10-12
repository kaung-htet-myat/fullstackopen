import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/logins'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
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
        alert("Wrong username or password")
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
      })
  }

  const loginForm = () => (
    <form onSubmit={loginHandler}>
      <h2>Login to the application</h2>
      <div>
        username: <input type='text' value={username} name='username' onChange={(e) => usernameChangeHandler(e)} />
      </div>
      <div>
        password: <input type='password' value={password} name='password' onChange={(e) => passwordChangeHandler(e)} />
      </div>
      <button type='submit'>Submit</button>
    </form>
  )

  const blogForm = () => (
    <div>
      <h2>User: {user.username} <button onClick={(e) => logoutHandler(e)}>Log out</button></h2>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <form onSubmit={createBlogHandler}>
        <h3>Create new blog</h3>
        title: <input type='input' name='title' value={title} onChange={(e) => titleChangeHandler(e)} />
        author: <input type='input' name='author' value={author} onChange={(e) => authorChangeHandler(e)} />
        url: <input type='input' name='url' value={url} onChange={(e) => urlChangeHandler(e)} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )

  return (
    <div>
      <h1>Blog Lists</h1>
      {
        user === null ?
        loginForm() :
        blogForm()
      }
    </div>
  )
}

export default App