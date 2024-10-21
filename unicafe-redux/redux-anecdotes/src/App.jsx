import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {  setAnecdotes, initializeAnecdotes } from './reducers/anecdoteReducer'
import AnecdoteList from './components/AnecdoteList'
import anecdotes from '../services/anecdotes'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from '././components/Notification'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdotes
      //.getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
      dispatch(initializeAnecdotes)
  }, [])

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
