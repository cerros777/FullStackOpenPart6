import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotification } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const { dispatch } = useNotification()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      console.log("onSuccess triggered with:", updatedAnecdote);
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
  
      console.log("Dispatching notification...", updatedAnecdote.content);  // Debugging log
  
      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: `Anecdote "${updatedAnecdote.content}" voted!`
      });
  
      setTimeout(() => {
        console.log("Hiding notification...");
        dispatch({ type: 'HIDE_NOTIFICATION' });
      }, 5000);
    }
  });
  
  
  if(result.isLoading){
    return <div> loading data...</div>
  }

  if(result.isError){
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  const handleVote = (anecdote) => {
    console.log('vote for', anecdote)
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  }


  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
