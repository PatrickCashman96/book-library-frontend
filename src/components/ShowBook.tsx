import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import bookService from "../services/book.service";
import { AuthContext } from "../context/auth.context";
import AddNote from "../components/AddNote";

interface ShowBookProps {
  id: number;
  title: string;
  author: string;
  genre?: string;
  year?: number;
  userId: number;
  refreshBooks: () => void;
}

function ShowBook({ id, title, author, genre, year, userId, refreshBooks }: ShowBookProps) {
  const { user } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [showNoteForm, setShowNoteForm] = useState(false);

  const handleDelete = async () => {
    try {
      await bookService.deleteBook(id);
      refreshBooks();
    } catch (error: any) {
      setError(error.response?.data?.error || "Deletion failed");
    }
  };

  return (
    <div className="card">
      <h2>{title}</h2>
      <p>Author: {author}</p>
      <p>Genre: {genre || "Unknown Genre"}</p>
      <p>Year: {year || "Unknown Year"}</p>

      {user && user._id === String(userId) && (
        <div>
          <Link to={`/books/edit/${id}`}>Edit</Link>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={() => setShowNoteForm(prev => !prev)}>
            {showNoteForm ? "Cancel" : "Add Note"}
          </button>
        </div>
      )}

      {showNoteForm && <AddNote bookId={id} onNoteAdded={refreshBooks} />}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default ShowBook;