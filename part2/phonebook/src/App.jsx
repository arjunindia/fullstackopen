import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [search, setSearch] = useState("");
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const filteredPersons = persons.filter((person) =>
    person.name.includes(search),
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <p>
        filter shown with{" "}
        <input value={search} onChange={(e) => setSearch(e.target.value)} />
      </p>
      <h2>Add new</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (persons.some((person) => person.name === newName)) {
            alert(`${newName} is already in the phonebook!`);
            return;
          }
          setPersons((persons) => [
            ...persons,
            { name: newName, phone: newPhone, id: persons.length },
          ]);
          setNewName("");
          setNewPhone("");
        }}
      >
        <div>
          name:{" "}
          <input
            value={newName}
            onChange={(e) => {
              setNewName(e.target.value);
            }}
          />
        </div>
        <div>
          phone:{" "}
          <input
            value={newPhone}
            onChange={(e) => {
              setNewPhone(e.target.value);
            }}
          />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <table>
        {filteredPersons.map((person) => (
          <tbody key={person.name}>
            <tr>
              <td>{person.name}</td>
              <td>{person.phone}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default App;
