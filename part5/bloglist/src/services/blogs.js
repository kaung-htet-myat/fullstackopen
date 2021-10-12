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

const create = (blog) => {
  const configs = {
    headers: { Authorization: token }
  }

const newBlog = axios
  .post(baseUrl, blog, configs)
  .then(response => response.data)

return newBlog
}

export default { getAll, setToken, create }