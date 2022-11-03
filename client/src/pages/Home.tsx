import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IUser } from "../types/user.type";

export default function HomePage() {
  const [users, setUsers] = useState<Array<IUser>>([]);

  const API_URL = "http://localhost:4000/";
  const getAllUsers = useCallback(() => {
    axios
      .get(API_URL)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  return (
    <div className="home-container">
      <div className="first-row">
        <div className="first-row-text">
          <h1>HR Manager</h1>
          <Link to="/list">
            <button className="main-btn">Employee List</button>
          </Link>
          <ul>
            {users.map((user) => {
              return <li>{user.username}</li>;
            })}
          </ul>
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
