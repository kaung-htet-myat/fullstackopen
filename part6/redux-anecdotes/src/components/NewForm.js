import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const NewForm = () => {
    const dispatch = useDispatch()

    const createAnecdote = (event) => {
        event.preventDefault()
        dispatch(addAnecdote(event.target.anecdote.value))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={(e) => createAnecdote(e)}>
                <div><input name='anecdote' /></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default NewForm