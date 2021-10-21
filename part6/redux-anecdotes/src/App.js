import React from 'react'
import NewForm from './components/NewForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {

  return (
    <div>
      <Filter/>
      <Notification/>
      <AnecdoteList/>
      <NewForm />
    </div>
  )
}

export default App