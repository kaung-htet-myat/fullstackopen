import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import NewForm from './components/NewForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { initAnecdotes } from './reducers/anecdoteReducer'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initAnecdotes())
  }, [dispatch])

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