import e from "express";
import { SyntheticEvent, useContext } from "react";
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
          <button className="nav-btn signup">Signup</button>
        </Link>
        <Link to="/login">
          <button className="nav-btn login">Login</button>
        </Link>
      </div>
    </nav>
  ) : (
    <nav>
      <div className="nav-left">
        <Link to="/">Home</Link>
      </div>
      <div className="nav-right">
        <Link to="/signup">
          <button className="nav-btn signup">Signup</button>
        </Link>
        <Link to="/logout">
          <button className="nav-btn logout" onClick={() => handelLogout()}>
            Log out
          </button>
        </Link>
      </div>
    </nav>
  );
};
export default Navbar;
