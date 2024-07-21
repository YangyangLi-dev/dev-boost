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
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | undefined>(
    params.filter?.[0] ? parseInt(params.filter[0]) : undefined
  );
  const [selectedMonth, setSelectedMonth] = useState<number | undefined>(
    params.filter?.[1] ? parseInt(params.filter[1]) : undefined
  );

  useEffect(() => {
    fetchReleaseNotes();
    fetchAvailableYears();
  }, [selectedYear, selectedMonth]);

  const fetchReleaseNotes = async () => {
    try {
      let fetchedNotes;
      if (selectedYear && selectedMonth) {
        fetchedNotes = await releaseNoteDao.readByYearAndMonth(
          selectedYear,
          selectedMonth
        );
      } else if (selectedYear) {
        fetchedNotes = await releaseNoteDao.readByYear(selectedYear);
      } else {
        fetchedNotes = await releaseNoteDao.readAll();
      }
      setNotes(fetchedNotes);
    } catch (error) {
      console.error("Failed to fetch release notes:", error);
    }
  };

  const fetchAvailableYears = async () => {
    try {
      const years = await releaseNoteDao.getAvailableYears();
      setAvailableYears(years);
    } catch (error) {
      console.error("Failed to fetch available years:", error);
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
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Release Notes</h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Filter by Year</h2>
          <div className="flex flex-wrap gap-2">
            {availableYears.map((year) => (
              <Link
                key={year}
                href={`/release-notes/${year}`}
                className={`px-3 py-1 rounded ${
                  selectedYear === year
                    ? "bg-blue-500 text-white"
                    : "bg-white text-blue-500 hover:bg-blue-100"
                }`}
              >
                {year}
              </Link>
            ))}
          </div>
        </div>

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

        <div className="space-y-4">
          {notes.length > 0 ? (
            notes.map((note) => (
              <div key={note.id} className="bg-white p-4 rounded shadow">
                <h3 className="text-xl font-semibold">{note.title}</h3>
                <p className="text-gray-500 text-sm mb-2">
                  {new Date(note.timestamp).toLocaleDateString()}
                </p>
                <p className="text-gray-700">{note.content}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              No release notes for the selected period
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
