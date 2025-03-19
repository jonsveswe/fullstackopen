import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdoteFcn } from '../reducers/anecdoteReducer'
import { setNotificationFcn } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    console.log('state', state)
    return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnecdoteFcn(id))
    const content = anecdotes.find(anecdote => anecdote.id === id).content
    dispatch(setNotificationFcn(`you voted '${content}'`, 5))
  }

  return (
    <div>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList