import { useState } from "react";
import noteService, { Note } from "../services/note.service";

interface ShowNoteProps {
  note: Note;
  refreshNotes: () => void;
}

function ShowNote({ note, refreshNotes }: ShowNoteProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(note.content);
  const [rating, setRating] = useState<number>(note.rating || 0);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    try {
      await noteService.deleteNote(note.id);
      refreshNotes();
    } catch (error: any) {
      setError(error.response?.data?.error || "Failed to delete note");
    }
  };

  const handleUpdate = async () => {
    try {
      await noteService.updateNote(note.id, { content, rating });
      setIsEditing(false);
      refreshNotes();
    } catch (error: any) {
      setError(error.response?.data?.error || "Failed to update note");
    }
  };

  return (
    <div className="card">
      <h3>{note.book?.title || "Unknown Book"}</h3>
      <p><strong>Author:</strong> {note.book?.author}</p>
      <p><strong>Date:</strong> {new Date(note.createdAt).toLocaleDateString()}</p>

      {isEditing ? (
        <>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
          <input
            type="number"
            min={0}
            max={10}
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <p><strong>Note:</strong> {note.content}</p>
          <p><strong>Rating:</strong> {note.rating ?? "Not rated"}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default ShowNote;
