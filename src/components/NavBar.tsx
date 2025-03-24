import { Link } from "react-router-dom";

function NavBar(){
  return(
    <nav>
      <Link to="/">
      <button>Home</button>
      </Link>

    </nav>
  )
}

export default NavBar;