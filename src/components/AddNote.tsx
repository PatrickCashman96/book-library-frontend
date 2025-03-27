import { useState } from "react";
import noteService from "../services/note.service";

interface AddNoteProps {
  bookId: number;
  onNoteAdded: () => void;
}

function AddNote({ bookId, onNoteAdded }: AddNoteProps) {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await noteService.createNote({ content, rating, bookId }); // ✅ no userId needed
      setContent("");
      setRating(0);
      onNoteAdded();
    } catch (error: any) {
      setError(error.response?.data?.error || "Failed to add note");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="AddNote">
      <label>Note:</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <label>Rating:</label>
      <input
        type="number"
        min={0}
        max={10}
        value={rating}
        onChange={(e) => setRating(parseInt(e.target.value))}
      />

      <button type="submit">Add Note</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default AddNote;
