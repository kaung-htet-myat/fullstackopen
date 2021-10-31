const reducer = (state = null, action) => {
  switch (action.type) {
  case 'FAILED-LOGIN':
    return 'Wrong username or password'
  case 'INVALID-DELETE':
    return 'You cannot delete this post'
  case 'CLEAR':
    return null
  case 'REMOVE':
    return null
  default:
    return state
  }
}

let removeNoti

export const setNoti = (type, timer) => {
  return async dispatch => {
    dispatch({
      type
    })
    clearTimeout(removeNoti)
    removeNoti = setTimeout(() => dispatch({
      type: 'REMOVE'
    }), timer)
  }
}

export default reducer