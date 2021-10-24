import React from 'react'
import { connect } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'
import { setNoti } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

    const vote = (anecdote) => {
        props.incrementVote(anecdote)
        props.setNoti(anecdote.content, "VOTING", 5000)
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {props.anecdotes.map(anecdote =>
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

const mapStateToProps = (state) => {
    const filteredAnecs = state.anecdotes.filter(anec => anec.content.match(new RegExp(state.filter, "i")))
    const anecdotes = filteredAnecs.sort((a, b) => b.votes > a.votes ? 1 : -1)

    return(
        {
            anecdotes,
            filter: state.filer
        }
    )
}

const mapDispatchToProps = {
    incrementVote,
    setNoti
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)