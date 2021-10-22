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

export default { getAll, createAnec }