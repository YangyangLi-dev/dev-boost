import { ReleaseNote } from "@/lib/types";

export default function ReleaseNoteList({ notes }: { notes: ReleaseNote[] }) {
  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          <h2>{note.title}</h2>
          <p>{new Date(note.timestamp).toLocaleDateString()}</p>
          <p>{note.content}</p>
        </li>
      ))}
    </ul>
  );
}
