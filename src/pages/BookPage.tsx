import { useState, useEffect, useContext } from "react"
import AddBook from "../components/AddBook";
import bookService from "../services/book.service";
import { Book } from "../services/book.service";

function BookPage(){
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = async () => {
    try {
      const response = await bookService.getAllBooks();
      setBooks(response.data);
    } catch (error) {
      console.error("Failed to fetch books", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return(
    <div>
      <h1>BOOOKS</h1>
      <AddBook refreshBooks={fetchBooks} />
      <ul>
        {books.map((book: any) => (
          <li key={book.id}>
            <strong>{book.title}</strong> by {book.author} ({book.year || "Unknown Year"})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BookPage;