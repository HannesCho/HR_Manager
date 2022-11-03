import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function HomePage() {
  const userContext = useContext(UserContext);
  return (
    <div className="home-container">
      <div className="first-row">
        <div className="first-row-text">
          <h1>HR Manager</h1>
          <h2>{userContext?.user?.username}</h2>
          <Link to="/list">
            <button className="main-btn">Employee List</button>
          </Link>
        </div>
      </div>
      <div className="second-row">
        <div className="second-left"></div>
        <div className="second-middle"></div>
        <div className="second-right"></div>
      </div>
    </div>
  );
}
