import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { dkeep } from "../../../declarations/dkeep";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      dkeep.createNote(newNote.title, newNote.content)
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {

    dkeep.removeNote(id);

    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  useEffect(() => {
    // console.log("useEffect");
    fetchData();
  }, []);

  async function fetchData(){
    const notesArray = await dkeep.readNotes();
    setNotes(notesArray);
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
