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

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
  case 'VOTE':
    console.log('ids', state[0].id, action.payload.id)
    return state.map(anecdote =>
      anecdote.id !== action.payload.id
        ? anecdote
        : { ...anecdote, votes: anecdote.votes + 1 }
    )
  case 'CREATE':
    return [...state, asObject(action.payload.anecdoteAsText)]
  default: break
  }
  return state
}

// These two functions are called Action Creators
export const createAnecdote = (anecdoteAsText) => {
  return {
    type: 'CREATE',
    payload: { anecdoteAsText: anecdoteAsText }
  }
}
export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    payload: { id: id }
  }
}

export default reducer