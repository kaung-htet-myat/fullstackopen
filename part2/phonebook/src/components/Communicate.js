import axios from 'axios'

const postNewPerson = (name, number) => {
    const person = {
      name: name,
      number: number,
    }
    const request = axios.post("http://localhost:3001/persons", person)
    return request.then(response => response.data)
  }

const getPersons = () => {
    const request = axios.get("http://localhost:3001/persons")
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`http://localhost:3001/persons/${id}`)
    return request.then(response => response)
}

const updatePerson = (changedPerson) => {
    const request = axios.put(`http://localhost:3001/persons/${changedPerson.id}`, changedPerson)
    return request.then(response => response.data)
}

export {getPersons, postNewPerson, deletePerson, updatePerson}