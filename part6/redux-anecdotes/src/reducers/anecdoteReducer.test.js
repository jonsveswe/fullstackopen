import anecdoteReducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'
import { current } from '@reduxjs/toolkit'

describe('anecdoteReducer', () => {
  test('returns new state with action anecdotes/createAnecdote', () => {
    const state = []
    const action = {
      type: 'anecdotes/createAnecdote',
      payload: {
        content: 'the app state is in redux store',
        votes: 0,
        id: 1
      },
    }
    deepFreeze(state)
    const newState = anecdoteReducer(state, action)
    console.log('newState: ', newState)
    // console.log('newState: ', current(newState))
    expect(newState).toHaveLength(1)
    expect(newState.map(s => s.content)).toContainEqual(action.payload.content)
  })

  test('returns new state with action anecdotes/voteAnecdote', () => {
    const state = [
      {
        content: 'the app state is in redux store',
        votes: 0,
        id: 1
      },
      {
        content: 'state changes are made with actions',
        votes: 0,
        id: 2
      }]
    const action = {
      type: 'anecdotes/voteAnecdote',
      payload: 2 // id
    }
    deepFreeze(state)
    const newState = anecdoteReducer(state, action)
    expect(newState).toHaveLength(2)
    expect(newState).toContainEqual(state[0]) // toContainEqual asserts if an item with a specific structure and values is contained in an array.

    // votes should have increased by one.
    expect(newState).toContainEqual({
      content: 'state changes are made with actions',
      votes: 1,
      id: 2
    })
  })

})