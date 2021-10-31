import userServices from '../services/users'

const reducer = (state=[], action) => {
  switch(action.type) {
  case 'INIT-USERS':
    return action.data.users
  default:
    return state
  }
}

export const initUsers = () => {
  return async dispatch => {
    const users = await userServices.getAll()
    dispatch({
      type: 'INIT-USERS',
      data: {
        users
      }
    })
  }
}

export default reducer