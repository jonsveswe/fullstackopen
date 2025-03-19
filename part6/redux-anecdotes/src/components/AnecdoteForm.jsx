import { useDispatch } from 'react-redux'
import { createAnecdote, createAnecdoteFcn } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const create = async (event) => {
    event.preventDefault()
    const anecdoteAsText = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdoteFcn(anecdoteAsText))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm