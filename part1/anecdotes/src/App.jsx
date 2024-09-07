import { useState } from "react";

const RandomizeButton = ({ setSelected, length }) => {
  return (
    <button
      onClick={() => {
        setSelected(Math.floor(Math.random() * length));
      }}
    >
      next anecdote
    </button>
  );
};
const VoteButton = ({ setVotes, selected }) => {
  return (
    <button
      onClick={() => {
        setVotes((votes) => votes.map((v, i) => (i === selected ? v + 1 : v)));
      }}
    >
      vote
    </button>
  );
};
const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const [selected, setSelected] = useState(0);

  let largestIdx = 0;
  for (let i = 0; i < votes.length; i++) {
    if (votes[i] > votes[largestIdx]) {
      largestIdx = i;
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <VoteButton setVotes={setVotes} selected={selected} />
      <RandomizeButton setSelected={setSelected} length={anecdotes.length} />
      <h2>Anecdote with the most number of votes</h2>
      <p>{anecdotes[largestIdx]}</p>
      <p>has {votes[largestIdx]} votes</p>
    </div>
  );
};

export default App;
