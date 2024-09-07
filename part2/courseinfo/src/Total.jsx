export default function Total({ parts }) {
  let total = parts.reduce((acc, part) => {
    return part.exercises + acc;
  }, 0);
  return <p>Number of exercises :{total}</p>;
}
