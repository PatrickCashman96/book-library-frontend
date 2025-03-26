import { useState, useContext, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authService from "../services/auth.service";

function LoginPage(){
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  const { storeToken, authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleLoginSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requestBody = {email, password};

    try{
      const response = await authService.login(requestBody);
      storeToken(response.data.token);
      await authenticateUser();
      navigate("/books");
    }catch(error:any){
      console.error("Login error", error);
      const errorDescription = error.response?.data?.message || "Login failed";
      setErrorMessage(errorDescription);
    }
  };

  return (
    <div className="LoginPage">
      <h1>Login</h1>

      <form onSubmit={handleLoginSubmit}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
          required
        />

        <button type="submit">Login</button>
      </form>

      {errorMessage && <p className="errorMessage">{errorMessage}</p>}

      <p>Don't have an account?</p>
      <Link to="/signup"> Signup</Link>
    </div>
  );
}

export default LoginPage;