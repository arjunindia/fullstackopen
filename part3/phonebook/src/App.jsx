import { useEffect, useState } from "react";
import axios from "axios";

const Notification = ({ type, message }) => {
  if (message === null) {
    return null;
  }

  return <div className={type}>{message}</div>;
};

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
  notify,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already in the phonebook! Do you want to update the contact with the new number?`,
        )
      ) {
        const id = persons.filter((person) => person.name === newName)[0].id;
        axios
          .put(`/api/persons/${id}`, {
            name: newName,
            number: newPhone,
            id: id,
          })
          .then((res) => {
            notify("info", `Updated ${newName}`);
            setPersons((persons) => {
              persons.find((person) => person.id === res.data.id).number =
                res.data.number;
              setNewName("");
              setNewPhone("");
              return [...persons];
            });
          })
          .catch((e) => {
            if (e.response)
              notify(
                "err",
                `Error: could not update contact` + e.response.data.error,
              );
            else notify("err", `Error: could not update contact`);
          });
      }
      return;
    }
    const newPerson = {
      name: newName,
      number: newPhone,
    };
    axios
      .post("/api/persons", newPerson)
      .then((res) => {
        notify("info", `Added ${newName}`);
        setPersons((persons) => [...persons, res.data]);
        setNewName("");
        setNewPhone("");
      })
      .catch((e) => {
        if (e.response) notify("err", `Error: ` + e.response.data.error);
        else notify("err", `Error: could not add contact`);
      });
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

const Persons = ({ persons, setPersons, notify }) => {
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
                      .delete(`/api/persons/${person.id}`)
                      .then((res) => {
                        notify("info", `Deleted ${person.name}`);
                        setPersons((persons) =>
                          persons.filter((person) => person.id !== res.data.id),
                        );
                      })
                      .catch(() =>
                        notify(
                          "err",
                          `Unable to delete! ${person.name} likely deleted already.`,
                        ),
                      );
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

  const [message, setMessage] = useState(null);
  const [type, setType] = useState("err");
  const filteredPersons = persons.filter((person) =>
    person.name.includes(search),
  );
  const notify = (type, message) => {
    setMessage(message);
    setType(type);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };
  useEffect(() => {
    axios
      .get("/api/persons")
      .then((res) => {
        setPersons(res.data);
      })
      .catch(() => notify("err", `Cannot get to server!`));
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} type={type} />
      <Filter search={search} setSearch={setSearch} />
      <h2>Add new</h2>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newPhone={newPhone}
        setNewPhone={setNewPhone}
        notify={notify}
      />
      <h2>Numbers</h2>
      <Persons
        persons={filteredPersons}
        setPersons={setPersons}
        notify={notify}
      />
    </div>
  );
};

export default App;
