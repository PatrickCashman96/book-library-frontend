import axios, { AxiosInstance } from "axios";

// Book interface matching your backend route structure (includes optional notes)
export interface Note {
  id: number;
  content: string;
  rating?: number;
  bookId: number;
  userId: number;
  createdAt: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  genre?: string;
  year?: number;
  createdAt: string;
  userId: number;
  notes?: Note[];
}

class BookService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_SERVER_URL || "http://localhost:3000",
    });

    this.api.interceptors.request.use(config => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers.Authorization = `Bearer ${storedToken}`;
      }
      return config;
    });
  }

  // CREATE a new book (no id or createdAt sent)
  createBook(requestBody: Omit<Book, "id" | "createdAt" | "userId" | "notes">) {
    return this.api.post("/api/books", requestBody);
  }

  // READ all books for the logged-in user
  getAllBooks() {
    return this.api.get<Book[]>("/api/books");
  }

  // READ one book by ID
  getBook(id: number) {
    return this.api.get<Book>(`/api/books/${id}`);
  }

  // UPDATE book by ID
  updateBook(id: number, requestBody: Partial<Omit<Book, "id" | "createdAt" | "notes">>) {
    return this.api.put(`/api/books/${id}`, requestBody);
  }

  // DELETE book by ID
  deleteBook(id: number) {
    return this.api.delete(`/api/books/${id}`);
  }
}

const bookService = new BookService();
export default bookService;
