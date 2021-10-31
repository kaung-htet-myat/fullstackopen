import axios from 'axios'
const baseUrl = '/api/login'

const login = ({ username, password }) => {
  const user = axios
    .post(baseUrl, { username, password })
    .then(response => response.data)

  return user
}

export default { login }