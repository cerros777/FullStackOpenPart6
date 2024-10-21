import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useNotification } from "../NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const {dispatch} = useNotification()
  
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess : (newAnecdote) => {
      queryClient.invalidateQueries({queryKey: ['anecdotes']});

      console.log('new anecdote', newAnecdote);

      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: `Anecdote ${newAnecdote.content} created!`
      })

      setTimeout(()=> {
        dispatch({type: 'HIDE_NOTIFICATION'})
      }, 5000)
      
    },
    onError : () => {
      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: `too short anecdote, must have length 5 or more`
      })

      setTimeout(()=> {
        dispatch({type: 'HIDE_NOTIFICATION'})
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0})
    
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
