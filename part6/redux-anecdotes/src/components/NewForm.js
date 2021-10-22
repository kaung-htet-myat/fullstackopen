import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { removeNoti, showNoti } from '../reducers/notificationReducer'
import anecdoteServices from '../services/anecdotes'

const NewForm = () => {
    const dispatch = useDispatch()

    const createAnecdote = async(event) => {
        event.preventDefault()
        const newAnec = await anecdoteServices.createAnec(event.target.anecdote.value)
        dispatch(addAnecdote(newAnec))
        event.target.anecdote.value = ''
        dispatch(showNoti(newAnec.content, "CREATE"))
        setTimeout(() => dispatch(removeNoti()), 5000)
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