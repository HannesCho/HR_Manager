import { SyntheticEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { login } from "../services/auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const userContext = useContext(UserContext);
  const navigation = useNavigate();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const currentUser = await login(username, password);
      userContext?.setUser(currentUser);
      navigation("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="login-container">
        <h3>Log In</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Log In</button>
          {/* {message && <h3 className="message">{message}</h3>} */}
        </form>
      </div>
    </>
  );
};
export default Login;
