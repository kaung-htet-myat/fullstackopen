import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const sortBlogs = (blogs) => {
  const newBlogs = blogs.sort((a,b) => b.likes > a.likes ? 1 : -1)
  return newBlogs
}

const create = (blog) => {
  const configs = {
    headers: { Authorization: token }
  }

  const newBlog = axios
    .post(baseUrl, blog, configs)
    .then(response => response.data)

  return newBlog
}

const likeBlog = (blog) => {

  const newBlog = {
    ...blog,
    likes: blog.likes+1
  }

  const updatedBlog = axios
    .put(`${baseUrl}/${blog.id}`, newBlog)
    .then(response => response.data)

  return updatedBlog
}

const removeBlog = (blog) => {

  const configs = {
    headers: { Authorization: token }
  }

  const status = axios
    .delete(`${baseUrl}/${blog.id}`, configs)
    .then(response => response.status)

  return status
}

export default { getAll, setToken, create, likeBlog, sortBlogs, removeBlog }