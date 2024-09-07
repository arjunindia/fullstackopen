import { useState } from "react";

const FeedbackButton = ({ name, setCount }) => {
  return (
    <button
      onClick={() => {
        setCount((count) => count + 1);
      }}
    >
      {name}
    </button>
  );
};
const StatisticLine = ({ name, count }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{count}</td>
    </tr>
  );
};
const Statistics = ({ good, neutral, bad }) => {
  let total = good + neutral + bad;
  let positive = (good * 100) / total;
  if (total === 0) return <p>no feedback given</p>;
  return (
    <table>
      <tbody>
        <StatisticLine name="good" count={good} />
        <StatisticLine name="neutral" count={neutral} />
        <StatisticLine name="bad" count={bad} />
        <StatisticLine name="total" count={total} />
        <StatisticLine name="positive" count={positive + "%"} />
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <FeedbackButton name="good" setCount={setGood} />
      <FeedbackButton name="neutral" setCount={setNeutral} />
      <FeedbackButton name="bad" setCount={setBad} />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
