import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Numbers from './components/Numbers'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personsToShow, setPersonsToShow] = useState(persons)

  useEffect(() => {
    axios.get("http://localhost:3001/persons")
    .then(response => {
      //console.log(response.data);
      setPersons(response.data)
    })
  }, [])

  useEffect(() => {
    setPersonsToShow(persons)
  }, [persons])

  const onSubmitHandler = (event) => {
    console.log(newName);
    console.log(newNumber);
    event.preventDefault()
    if (persons.every(person => person.name !== newName)) {
      let newID = Math.max(...persons.map(person => person.id)) + 1
      setPersons(persons.concat(
        {
          name: newName,
          number: newNumber,
          id: newID
        }
      ))
      console.log(persons);
    } else {
      alert(`The name ${newName} is already added!`)
    }
  }

  const searchHandler = (event) => {
    setPersonsToShow(persons.filter(person => person.name.match(new RegExp(event.target.value, "i"))))
  }

  const nameChangeHandler = (event) => {
    setNewName(event.target.value)
  }

  const numberChangeHandler = (event) => {
    setNewNumber(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchHandler={(e) => searchHandler(e)} />
      <h2>Add a new </h2>
      <Form
        onSubmitHandler={(e) => onSubmitHandler(e)}
        newName={newName}
        nameChangeHandler={(e) => nameChangeHandler(e)}
        newNumber={newNumber}
        numberChangeHandler={(e) => numberChangeHandler(e)} />
      <h2>Numbers</h2>
      <Numbers personsToShow={personsToShow} />
    </div>
  )
}

export default App