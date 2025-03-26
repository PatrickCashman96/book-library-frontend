import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function NavBar(){
  const {isLoggedin, user, logOutUser} = useContext(AuthContext)
  return(
    <nav>

      <Link to="/">
      <button>Home</button>
      </Link>
      
      {isLoggedin && (
        <>
        <Link to="/my-snippets">
            <button>My Snippets</button>
          </Link>
          <button onClick={logOutUser}>Logout</button>
          <span>{user && user.username}</span>
        </>
      )}
      {!isLoggedin && (
        <>
          <Link to="/login">
          <button>Login</button>
          </Link>

          <Link to="/signup">
          <button>Signup</button>
      </Link>

        </>
      )}
      

    </nav>
  )
}

export default NavBar;