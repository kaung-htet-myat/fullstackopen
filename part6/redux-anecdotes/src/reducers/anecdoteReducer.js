import anecdoteServices from '../services/anecdotes'

/* will only use in manual initializations

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)
*/

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type){
    case 'VOTE': 
      state = state.map(s => s.id === action.data.anecdote.id ? action.data.anecdote : s)
      return state
    case 'ADD':
      state = state.concat(action.data.text)
      return state
    case 'INIT':
      return action.data
    default:
      return state
  }
}

export const incrementVote = (anecdote) => {

  return async dispatch => {
    const newAnec = await anecdoteServices.updateVote(anecdote)
    dispatch({
      type: 'VOTE',
      data: {
        anecdote: newAnec
      }
    })
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const newAnec = await anecdoteServices.createAnec(content)
    dispatch({
      type: 'ADD',
      data: {
        text: newAnec
      }
    })
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecs = await anecdoteServices.getAll()
    dispatch({
      type: 'INIT',
      data: anecs
    })
  }
}

export default reducer