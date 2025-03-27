import { useEffect, useState } from "react";
import noteService, { Note } from "../services/note.service";
import ShowNote from "../components/ShowNote";

function NotePage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState("");

  const fetchNotes = async () => {
    try {
      const response = await noteService.getMyNotes();
      setNotes(response.data);
    } catch (error: any) {
      setError(error.response?.data?.error || "Failed to fetch notes");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="NotePage">
      <h1>My Notes</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        <div>
          {notes.map((note) => (
            <ShowNote key={note.id} note={note} refreshNotes={fetchNotes} />
          ))}
        </div>
      )}
    </div>
  );
}

export default NotePage;
