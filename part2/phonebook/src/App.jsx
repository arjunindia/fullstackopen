import { useEffect, useState } from "react";
import axios from "axios";
const Filter = ({ search, setSearch }) => {
  return (
    <p>
      filter shown with{" "}
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
    </p>
  );
};

const PersonForm = ({
  persons,
  setPersons,
  newName,
  setNewName,
  newPhone,
  setNewPhone,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already in the phonebook!`);
      return;
    }
    const newPerson = {
      name: newName,
      number: newPhone,
      id: persons.length + 1,
    };
    axios.post("http://localhost:3001/persons", newPerson).then((res) => {
      setPersons((persons) => [...persons, res.data]);
    });
    setNewName("");
    setNewPhone("");
  };
  return (
    <form onSubmit={handleSubmit}>
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
  );
};

const Persons = ({ persons, setPersons }) => {
  return (
    <table>
      {persons.map((person) => (
        <tbody key={person.id}>
          <tr>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td>
              <button
                onClick={() => {
                  if (window.confirm(`Delete ${person.name}?`)) {
                    axios
                      .delete(`http://localhost:3001/persons/${person.id}`)
                      .then((res) => {
                        console.log(res);
                        setPersons((persons) =>
                          persons.filter((person) => person.id !== res.data.id),
                        );
                      });
                  }
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      ))}
    </table>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);

  const [search, setSearch] = useState("");
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const filteredPersons = persons.filter((person) =>
    person.name.includes(search),
  );

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((res) => {
      setPersons(res.data);
    });
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter search={search} setSearch={setSearch} />
      <h2>Add new</h2>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newPhone={newPhone}
        setNewPhone={setNewPhone}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} setPersons={setPersons} />
    </div>
  );
};

export default App;
