import axios, {AxiosInstance} from "axios"

class AuthService {
  private api: AxiosInstance;


  constructor(){
    this.api = axios.create({
      baseURL: import.meta.env.VITE_SERVICE_URL || "http://localhost:3000"
    });

    this.api.interceptors.request.use(config=>{
      const storedToken = localStorage.getItem("authToken");

      if(storedToken){
        config.headers.Authorization = `Bearer ${storedToken}`;
      }
      
      return config;
    });
  }

  login(requestBody: { email: string; password: string }) {
    return this.api.post("/api/users/login", requestBody);
  }

  signup(requestBody: {email: string; password: string; username: string}){
    return this.api.post("/api/users/register", requestBody)
  }

  verify(){
    return this.api.get("/api/users/verify");
  }
}

const authService = new AuthService();
export default authService;