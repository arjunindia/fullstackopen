export default function Total({ exercises }) {
  let { exercises1, exercises2, exercises3 } = exercises;
  return <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>;
}
