import { useState } from 'react'

const Button = (props) => {
  const { onClick, text } = props;
  return (
    <button onClick={onClick}>{text}</button>
  )
}
const AnecdoteMostVotesDisplay = (props) => {
  const {text, anecdotes, votes} = props;
  return (
    <>
      <h2>{text}</h2>
      <div>{anecdotes[votes.indexOf(Math.max(...votes))]}</div>
    </>
  )
}
/* const AnecdoteOfDayDisplay = (props) => {
  const {text, anecdotes, votes} = props;
  return (
    <>
      <h2>{text}</h2>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes </div>
      <Button onClick={handleOnNextClick} text="next anecdote" />
      <Button onClick={handleOnVoteClick} text="vote" />
    </>
  )
} */

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const handleOnNextClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }
  const handleOnVoteClick = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy)
  }
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes </div>
      <Button onClick={handleOnNextClick} text="next anecdote" />
      <Button onClick={handleOnVoteClick} text="vote" />
      {/* <AnecdoteOfDayDisplay text="Anecdote of the day" anecdotes={anecdotes} votes={votes} selected={selected} sdfg/> */}
      <AnecdoteMostVotesDisplay text="Anecdote with most votes" anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App