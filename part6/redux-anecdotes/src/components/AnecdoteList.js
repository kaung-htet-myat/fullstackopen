import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'
import { setNoti } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        const filteredAnecs = state.anecdotes.filter(anec => anec.content.match(new RegExp(state.filter, "i")))
        return filteredAnecs.sort((a, b) => b.votes > a.votes ? 1 : -1)
    })
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(incrementVote(anecdote))
        dispatch(setNoti(anecdote.content, "VOTING", 5000))
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList