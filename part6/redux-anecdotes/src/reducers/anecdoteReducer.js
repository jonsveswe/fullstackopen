import { createSlice, current } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdoteAsText) => {
  return {
    content: anecdoteAsText,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

// the action.payload in the function contains the argument provided by calling the action creator
const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      console.log('action.payload in voteAnecdote: ', action.payload)
      console.log('state in voteAnecdote: ', current(state))
      const id = action.payload
      return state.map(anecdote => {
        return anecdote.id !== id
          ? anecdote
          : { ...anecdote, votes: anecdote.votes + 1 }
      })
    },
    createAnecdote(state, action) {
      const anecdote = action.payload
      return [...state, anecdote]
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})


export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdoteFcn = (anecdoteAsText) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdoteAsText)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const voteAnecdoteFcn = (id) => {
  console.log('id in voteAnecdoteFcn: ', id)
  return async (dispatch, getState) => {
    const anecdote = getState().anecdotes.find(anecdote => anecdote.id === id)
    /*     const anecdotes = await anecdoteService.getAll()
    const anecdote = anecdotes.find(anecdote => anecdote.id === id) */
    console.log('anecdote in voteAnecdoteFcn: ', anecdote)
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    await anecdoteService.update(updatedAnecdote)
    console.log('anecdote.id in voteAnecdoteFcn: ', anecdote.id)
    dispatch(voteAnecdote(anecdote.id))
  }
}
export const { voteAnecdote, createAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer