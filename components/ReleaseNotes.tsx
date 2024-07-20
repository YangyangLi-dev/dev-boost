"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function ReleaseNotes() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ version: "", content: "" });

  const addNote = (e) => {
    e.preventDefault();
    setNotes([...notes, { ...newNote, date: new Date().toISOString() }]);
    setNewNote({ version: "", content: "" });
  };

  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Release Notes</h1>
        <form onSubmit={addNote} className="mb-4">
          <input
            type="text"
            placeholder="Version"
            value={newNote.version}
            onChange={(e) =>
              setNewNote({ ...newNote, version: e.target.value })
            }
            className="border p-2 mr-2"
          />
          <textarea
            placeholder="Release Notes"
            value={newNote.content}
            onChange={(e) =>
              setNewNote({ ...newNote, content: e.target.value })
            }
            className="border p-2 mr-2"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Add Release Note
          </button>
        </form>
        <ul>
          {notes.map((note, index) => (
            <li key={index} className="mb-4">
              <h3 className="text-xl font-semibold">{note.version}</h3>
              <p className="text-gray-500">
                {new Date(note.date).toLocaleDateString()}
              </p>
              <p>{note.content}</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
