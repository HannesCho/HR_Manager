import { useState } from "react";
import { createUser } from "../services/auth";

export default function Signup() {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    createUser();
  };

  return (
    <>
      <div className="signup-container">
        <h3>Create Account</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setUsername(e.currentTarget.value)
            }
          />

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
}
