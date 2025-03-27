import { useState, useEffect } from "react";
import AddBook from "../components/AddBook";
import ShowBook from "../components/ShowBook";
import bookService, { Book } from "../services/book.service";

function BookPage() {
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

  return (
    <div>
      <h1>BOOKS</h1>
      <AddBook refreshBooks={fetchBooks} />
      <div className="book-list">
        {books.map((book) => (
          <ShowBook
            key={book.id}
            id={book.id}
            title={book.title}
            author={book.author}
            genre={book.genre}
            year={book.year}
            userId={book.userId}
            refreshBooks={fetchBooks}
          />
        ))}
      </div>
    </div>
  );
}

export default BookPage;
