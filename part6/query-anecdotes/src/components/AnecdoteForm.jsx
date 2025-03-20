import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {
  console.log('rendering AnecdoteForm')
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      console.log('newAnecdote: ', newAnecdote)
      /*       const anecdotes = queryClient.getQueryData({ queryKey: ['anecdotes'] })
            queryClient.setQueryData({ queryKey: ['anecdotes'] }, anecdotes.concat(newAnecdote)) */
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] }) // Will make a new get request to the server for all anecdotes
      notificationDispatch({
        type: 'SET',
        payload: `You created a new anecdote: ${newAnecdote.content}`
      })
      setTimeout(() => {
        notificationDispatch({
          type: 'CLEAR'
        })
      }, 5000)
    },
    onError: (error) => {
      console.log('error: ', error)
      notificationDispatch({
        type: 'SET',
        payload: error.response.data.error
      })
      setTimeout(() => {
        notificationDispatch({
          type: 'CLEAR'
        })
      }, 5000)
    }
  })
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    // if (content.length < 5) { return }
    newAnecdoteMutation.mutate({ content: content, votes: 0 })
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
