const reducer = (state = null, action) => {
  switch (action.type) {
  case 'SET-USER':
    return action.data.user
  case 'REMOVE-USER':
    return null
  default:
    return state
  }
}

export const setUser = (user) => {
  return async dispatch => {
    dispatch({
      type: 'SET-USER',
      data: {
        user
      }
    })
  }
}

export const removeUser = () => {
  return async dispatch => {
    dispatch({
      type: 'REMOVE-USER'
    })
  }
}

export default reducer