import axios from 'axios'

const baseUrl = "https://fathomless-tor-24254.herokuapp.com/api/persons"

const postNewPerson = (name, number) => {
    const person = {
      name: name,
      number: number,
    }
    const request = axios.post(baseUrl, person)
    return request.then(response => response.data)
  }

const getPersons = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response)
}

const updatePerson = (changedPerson) => {
    const request = axios.put(`${baseUrl}/${changedPerson.id}`, changedPerson)
    return request.then(response => response.data)
}

export {getPersons, postNewPerson, deletePerson, updatePerson}