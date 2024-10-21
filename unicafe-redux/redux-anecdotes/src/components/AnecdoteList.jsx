import { useDispatch, useSelector } from "react-redux";
import { voteForAnecdote } from "../reducers/anecdoteReducer";
import FilterSearch from "./filterSearch";
import { setNotificationWithTimeout } from "../reducers/notificationReducer";

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)

    const handleVote = (anecdote) => {
        dispatch(voteForAnecdote(anecdote))
        dispatch(setNotificationWithTimeout(`you voted for '${anecdote.content}`), 10)
    }

    const filteredAnecdotes = anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
    );

    const sortedAnecdotes = [...filteredAnecdotes].sort((a, b) => b.votes - a.votes)

    return (
        <div>
            <h2>Anecdotes</h2>
            <FilterSearch />
            {sortedAnecdotes.map(anecdote => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AnecdoteList
