import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNoti } from '../reducers/notificationReducer'

const NewForm = () => {
    const dispatch = useDispatch()

    const createAnecdote = async(event) => {
        event.preventDefault()
        dispatch(addAnecdote(event.target.anecdote.value))
        dispatch(setNoti(event.target.anecdote.value, "CREATE", 5000))
        event.target.anecdote.value = ''
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