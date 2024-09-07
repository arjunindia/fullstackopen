import Part from "./Part";

export default function Content({ parts }) {
  let [part1, part2, part3] = parts;
  return (
    <div>
      {parts.map((part) => {
        return (
          <Part key={part.id} part={part.name} exercises={part.exercises} />
        );
      })}
    </div>
  );
}
