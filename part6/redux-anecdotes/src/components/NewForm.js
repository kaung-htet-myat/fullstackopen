import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNoti } from '../reducers/notificationReducer'

const NewForm = (props) => {

    const createAnecdote = async(event) => {
        event.preventDefault()
        props.addAnecdote(event.target.anecdote.value)
        props.setNoti(event.target.anecdote.value, "CREATE", 5000)
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

const mapDispatchToProps = {
    addAnecdote,
    setNoti
}

export default connect(null, mapDispatchToProps)(NewForm)