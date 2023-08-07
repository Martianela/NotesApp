import React from "react";

const Note = ({ note, toggleImportance }) => {
  const label = note.important ? "make not important" : "make important";
  console.log(note);
  return (
    <li style={{ color: "gray", paddingTop: "5px", fontSize: "15px" }}>
      {note}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  );
};

export default Note;
