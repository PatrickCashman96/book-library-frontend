import axios, { AxiosInstance } from "axios";

export interface Note {
  id: number;
  content: string;
  rating?: number;
  bookId: number;
  userId: number;
  createdAt: string;
  book?: {
    id: number;
    title: string;
    author: string;
    genre?: string;
    year?: number;
  };
}


class NoteService {
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

  // CREATE a note for a book
  createNote(requestBody: { content: string; rating?: number; bookId: number }) {
    return this.api.post(`api/notes/book/${requestBody.bookId}`, requestBody);
  }

  // GET all notes for the logged-in user
  getMyNotes() {
    return this.api.get<Note[]>("/api/notes");
  }

  // UPDATE a note
  updateNote(id: number, requestBody: Partial<Omit<Note, "id" | "createdAt" | "bookId" | "userId">>) {
    return this.api.put(`api/notes/${id}`, requestBody);
  }

  // DELETE a note
  deleteNote(id: number) {
    return this.api.delete(`api/notes/${id}`);
  }
}

const noteService = new NoteService();
export default noteService;
