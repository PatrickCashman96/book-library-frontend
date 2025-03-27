import { useState } from "react";
import bookService from "../services/book.service";

function AddBook(props: { refreshBooks: () => void }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    year: ""
  });

  const [error, setError] = useState("");

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
      await bookService.createBook(requestBody);
      props.refreshBooks();
      setForm({ title: "", author: "", genre: "", year: "" });
      setError("");
    } catch (error: any) {
      setError(error.response?.data?.error || "Failed to add book");
    }
  };

  return (
    <div className="AddBook">
      <h1>My Library</h1>
      <h3>Add Book</h3>

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <label>Author:</label>
        <input
          type="text"
          name="author"
          value={form.author}
          onChange={handleChange}
          required
        />

        <label>Genre:</label>
        <input
          type="text"
          name="genre"
          value={form.genre}
          onChange={handleChange}
        />

        <label>Year:</label>
        <input
          type="number"
          name="year"
          value={form.year}
          onChange={handleChange}
        />

        <button type="submit">Add Book</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default AddBook;