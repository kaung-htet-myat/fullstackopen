import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Numbers from './components/Numbers'
import AlertBox from './components/Alert'
import { getPersons, postNewPerson, deletePerson, updatePerson } from './components/Communicate'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personsToShow, setPersonsToShow] = useState(persons)
  const [alertBox, setAlertBox] = useState("")

  useEffect(() => {
    getPersons()
      .then(data => {
        //console.log(response.data);
        setPersons(data)
      })
  }, [])

  useEffect(() => {
    setPersonsToShow(persons)
  }, [persons])

  const onSubmitHandler = (event) => {
    event.preventDefault()
    if (persons.every(person => person.name !== newName)) {
      postNewPerson(newName, newNumber)
        .then(newPersons => {
          setPersons(persons.concat([newPersons]))
          setAlertBox(<AlertBox name={newName} action="add" />)
        })
        .catch(error => {
          console.log(error.response.data)
          setAlertBox(<AlertBox name={error.response.data['error']} action="validationError" />)
        })

    } else {
      if (window.confirm(`${newName} is already in the phonebook. Do you want to replace the number?`)) {
        const targetPerson = persons.find(person => person.name === newName)
        console.log(targetPerson);
        const changedPerson = { ...targetPerson, number: newNumber }
        updatePerson(changedPerson)
          .then(data => {
            setPersons(persons.map(person => person.name !== data.name ? person : data))
            setAlertBox(<AlertBox name={newName} action="update" />)
          })
          .catch(error => {
            setAlertBox(<AlertBox name={newName} action="deleted" />)
          })
      }
    }
  }

  const onPersonDeleteHandler = (event, id, name) => {
    if (window.confirm(`Do you want to delete ${name}?`)) {
      deletePerson(id)
        .then(response => {
          // console.log(response)
          getPersons()
            .then(data => {
              setPersons(data)
              setAlertBox(<AlertBox name={name} action="delete" />)
            })
        })
        .catch(error => {
          setAlertBox(<AlertBox name={newName} action="deleted" />)
        })
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

  console.log(alertBox)
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchHandler={(e) => searchHandler(e)} />
      {alertBox}
      <h2>Add a new </h2>
      <Form
        onSubmitHandler={(e) => onSubmitHandler(e)}
        newName={newName}
        nameChangeHandler={(e) => nameChangeHandler(e)}
        newNumber={newNumber}
        numberChangeHandler={(e) => numberChangeHandler(e)} />
      <h2>Numbers</h2>
      <Numbers personsToShow={personsToShow} onPersonDeleteHandler={onPersonDeleteHandler} />
    </div>
  )
}

export default App