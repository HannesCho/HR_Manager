import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { logout } from "../services/auth";

const Navbar = () => {
  const userContext = useContext(UserContext);

  const handelLogout = () => {
    try {
      logout();
      userContext?.setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return !userContext?.user ? (
    <nav>
      <div className="nav-left">
        <Link to="/">Home</Link>
      </div>
      <div className="nav-right">
        <Link to="/signup">
          <span>Signup</span>
        </Link>
        <Link to="/login">
          <span>Login</span>
        </Link>
      </div>
    </nav>
  ) : (
    <nav>
      <div className="nav-left">
        <Link to="/">Home</Link>
      </div>
      <div className="nav-right">
        <Link to="/add">
          <span>Add Employee</span>
        </Link>
        <Link to="/">
          <span onClick={() => handelLogout()}>Log out</span>
        </Link>
      </div>
    </nav>
  );
};
export default Navbar;
