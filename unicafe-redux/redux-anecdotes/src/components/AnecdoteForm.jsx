import { useDispatch } from 'react-redux'
import {  createNewAnecdote } from '../reducers/anecdoteReducer'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addNewAnecdote =  async(event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = '' // Clear input field
        dispatch(createNewAnecdote(content))
        dispatch(setNotificationWithTimeout(`You added '${content}'`, 5))
    }

    return (
        <form onSubmit={addNewAnecdote}>
            <div>
                <input name="anecdote" />
            </div>
            <button type="submit">create</button>
        </form>
    )
}

export default AnecdoteForm
