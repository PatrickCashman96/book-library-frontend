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
          <Link to="/books">
            <button>Books</button>
          </Link>
          
          <Link to="/notes">
            <button>Notes</button>
          </Link>

          <button onClick={logOutUser}>Logout</button>
          <span>{user && user.username}</span>
          {console.log("username: ", user)}
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