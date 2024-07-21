"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { releaseNoteDao } from "@/lib/db";
import { ReleaseNote } from "@/lib/types";

export default function ReleaseNotes() {
  const [notes, setNotes] = useState<ReleaseNote[]>([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });

  useEffect(() => {
    fetchReleaseNotes();
  }, []);

  const fetchReleaseNotes = async () => {
    try {
      const fetchedNotes = await releaseNoteDao.readAll();
      setNotes(fetchedNotes);
    } catch (error) {
      console.error("Failed to fetch release notes:", error);
    }
  };

  const addNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const timestamp = new Date();
      const newReleaseNote: Omit<
        ReleaseNote,
        "id" | "created_at" | "updated_at"
      > = {
        title: newNote.title,
        content: newNote.content,
        timestamp,
        year: timestamp.getFullYear(),
        month: timestamp.getMonth() + 1,
        tags: [],
      };
      const createdNote = await releaseNoteDao.create(newReleaseNote);
      if (createdNote) {
        setNotes([createdNote, ...notes]);
        setNewNote({ title: "", content: "" });
      }
    } catch (error) {
      console.error("Failed to add release note:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Release Notes</h1>
        <form onSubmit={addNote} className="mb-4">
          <input
            type="text"
            placeholder="Version/Title"
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            className="border p-2 mr-2"
          />
          <textarea
            placeholder="Release Notes Content"
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
          {notes.map((note) => (
            <li key={note.id} className="mb-4">
              <h3 className="text-xl font-semibold">{note.title}</h3>
              <p className="text-gray-500">
                {new Date(note.timestamp).toLocaleDateString()}
              </p>
              <p>{note.content}</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
