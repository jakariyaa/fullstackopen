import { useState } from 'react'

const Anecdote = ({ anecdote, votes }) => {
  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </>
  )
}
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const MostVotes = ({ anecdote, votes }) => {
  return (
    <>
      <h1>Anecdote with most votes</h1>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </>
  )
}

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
  const [allVotes, setAllVotes] = useState(Array(8).fill(0))
  const mostVotes = Math.max(...allVotes)
  console.log("most:", mostVotes)

  const [selected, setSelected] = useState(0)


  const handleNextAnecdote = () => setSelected(Math.floor(Math.random() * 8))
  const handleVote = () => {
    const copy = [...allVotes]
    copy[selected] += 1
    setAllVotes(copy)
  }
  console.log(allVotes)
  console.log(selected)

  return (
    <div>
      <Anecdote text={anecdotes[selected]} votes={allVotes[selected]} />
      <Button onClick={handleVote} text="vote" />
      <Button onClick={handleNextAnecdote} text="next anecdote" />
      <MostVotes anecdote={anecdotes[allVotes.indexOf(mostVotes)]} votes={mostVotes} />
    </div>
  )
}

export default App