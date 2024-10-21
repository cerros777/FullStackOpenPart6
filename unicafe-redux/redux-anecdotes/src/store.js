import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer, {  setAnecdotes} from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
import anecdotes from '../services/anecdotes'


const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer,
  }
})

anecdotes.getAll().then(anecdotes => 
  store.dispatch(setAnecdotes(anecdotes))
)

export default store