const initState = {
  username: '',
  password: ''
}

const reducer = (state = initState, action) => {
  switch(action.type) {
  case 'TEST':
    return state
  default:
    return state
  }
}

export default reducer