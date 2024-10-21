import { useDispatch } from 'react-redux'
import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit'
import anecdotesService from '../../services/anecdotes'


const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],  // You can set this to the `initialState` if needed
  reducers: {
    vote: (state, action) => {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      if (anecdoteToChange) {
        anecdoteToChange.votes += 1
      }
    },
    addAnecdote: (state, action) => {
      const newAnecdote = action.payload
      state.push(newAnecdote)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})


export const { vote, appendAnecdote, setAnecdotes, addAnecdote } = anecdoteSlice.actions


export const voteForAnecdote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const updatedAnecdote = await anecdotesService.vote(anecdote.id, votedAnecdote)
    dispatch(vote(updatedAnecdote.id));
  };
};

// Thunk for adding an anecdote with a notification
export const createNewAnecdote = (content) => {
  return async (dispatch) => { 
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch(addAnecdote(newAnecdote));
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export default anecdoteSlice.reducer