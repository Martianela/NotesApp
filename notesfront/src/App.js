import { useEffect, useState } from "react";
import Notification from "./components/Notification";
import Note from "./components/Note";
import { getAll, update } from "./services";

const Footer = () => {
  const footerStyle = {
    color: "green",
    fontStyle: "italic",
    fontSize: 16,
  };
  return (
    <div style={footerStyle}>
      <br />
      <em>
        Note app, Department of Computer Science, University of Helsinki 2022
      </em>
    </div>
  );
};

function App() {
  const [notes, setNotes] = useState([]);
  //const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const toggleImportance = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };
  useEffect(() => {
    getAll()
      .then((data) => {
        setNotes(data.data);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  }, []);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
        {showAll ? (
          <ul>
            {notes.map((note) => (
              <Note
                note={note.content}
                toggleImportance={() => toggleImportance(note.id)}
              />
            ))}
          </ul>
        ) : (
          <ul>
            {notes
              .filter((note) => note.important === true)
              .map((note) => (
                <Note
                  note={note.content}
                  toggleImportance={() => toggleImportance(note.id)}
                />
              ))}
          </ul>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
