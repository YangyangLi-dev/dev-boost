"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { releaseNoteDao } from "@/lib/db";
import { ReleaseNote } from "@/lib/types";
import Link from "next/link";

export default function ReleaseNotes({
  params,
}: {
  params: { filter: string[] };
}) {
  const [notes, setNotes] = useState<ReleaseNote[]>([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });

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
    <div className="bg-gray-100 min-h-screen">
      <main className="container mx-auto p-4">
        
        <form onSubmit={addNote} className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Add New Release Note</h2>
          <input
            type="text"
            placeholder="Version/Title"
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            className="w-full border p-2 mb-2 rounded"
          />
          <textarea
            placeholder="Release Notes Content"
            value={newNote.content}
            onChange={(e) =>
              setNewNote({ ...newNote, content: e.target.value })
            }
            className="w-full border p-2 mb-2 rounded h-24"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add Release Note
          </button>
        </form>
      </main>
    </div>
  );
}
