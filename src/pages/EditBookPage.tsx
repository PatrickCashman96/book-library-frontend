import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import bookService from "../services/book.service";

function EditBookPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    year: ""
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await bookService.getBook(Number(id));
        const { title, author, genre, year } = response.data;
        setForm({
          title,
          author,
          genre: genre || "",
          year: year ? year.toString() : ""
        });
      } catch (error) {
        console.error("Failed to fetch book:", error);
      }
    };

    fetchBook();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requestBody = {
      title: form.title,
      author: form.author,
      genre: form.genre,
      year: form.year ? parseInt(form.year) : undefined,
    };

    try {
      await bookService.updateBook(Number(id), requestBody);
      navigate("/books");
    } catch (error: any) {
      setError(error.response?.data?.error || "Failed to update book");
    }
  };

  return (
    <div className="EditBook">
      <h3>Edit Book</h3>

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" name="title" value={form.title} onChange={handleChange} required />

        <label>Author:</label>
        <input type="text" name="author" value={form.author} onChange={handleChange} required />

        <label>Genre:</label>
        <input type="text" name="genre" value={form.genre} onChange={handleChange} />

        <label>Year:</label>
        <input type="number" name="year" value={form.year} onChange={handleChange} />

        <button type="submit">Update Book</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default EditBookPage;
