import axios from 'axios'

const BASE_URL = "http://localhost:3001/anecdotes"

const getAll = async () => {
    const response = await axios.get(BASE_URL)
    return response.data
}

const createAnec = async(anec) => {
    const newAnec = {
        content: anec,
        votes: 0
    }

    const response = await axios.post(BASE_URL, newAnec)
    return response.data
}

const updateVote = async(anecdote) => {
    const newAnec = {
        ...anecdote,
        votes: anecdote.votes + 1
    }

    const response = await axios.put(`${BASE_URL}/${anecdote.id}`, newAnec)
    return response.data
}

export default { getAll, createAnec, updateVote }