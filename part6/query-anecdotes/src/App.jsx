import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { getAnecdotes, updateAnecdote } from './requests'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const App = () => {
  console.log('rendering App')
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      console.log('updatedAnecdote: ', updatedAnecdote)
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] }) // Will make a new get request to the server for all anecdotes
      notificationDispatch({ type: 'SET', payload: `You voted for: ${updatedAnecdote.content}` })
      setTimeout(() => {
        notificationDispatch({
          type: 'CLEAR'
        })
      }, 5000)
    }
  })

  const handleVote = (anecdote) => {
    console.log('vote')
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    // console.log('updatedAnecdote: ', updatedAnecdote)
    updateAnecdoteMutation.mutate(updatedAnecdote)
  }

  /*   const anecdotes = [
      {
        "content": "If it hurts, do it more often",
        "id": "47145",
        "votes": 0
      },
    ] */

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })
  console.log(JSON.parse(JSON.stringify(result)))
  if (result.isLoading) { return <div>loading data...</div> }
  if (result.isError) { return <div>Problem fetching data. Error message: {result.error.message} </div> }
  const anecdotes = result.data

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
