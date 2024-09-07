import Part from "./Part";

export default function Content({ parts, exercises }) {
  return (
    <div>
      <Part part={parts.part1} exercises={exercises.exercises1} />
      <Part part={parts.part2} exercises={exercises.exercises2} />
      <Part part={parts.part3} exercises={exercises.exercises3} />
    </div>
  );
}
