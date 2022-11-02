import { useState } from "react";
import { createUser } from "../services/auth";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [housenumber, setHousenumber] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    createUser({
      username,
      password,
      password2,
      firstName,
      lastName,
      email,
      street,
      housenumber,
      zipcode,
      city,
      country,
    });
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
          <br></br>
          <label htmlFor="password">Password </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setPassword(e.currentTarget.value)
            }
          />
          <br></br>
          <label htmlFor="password2">Repeat Password </label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setPassword2(e.currentTarget.value)
            }
          />
          <br></br>
          <label htmlFor="email">Email </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setEmail(e.currentTarget.value)
            }
          />
          <br></br>
          <label htmlFor="firstName">First Name </label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setFirstName(e.currentTarget.value)
            }
          />
          <br></br>
          <label htmlFor="lastName">Last Name </label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setLastName(e.currentTarget.value)
            }
          />
          <br></br>
          <label htmlFor="street">Street</label>
          <input
            type="text"
            name="street"
            value={street}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setStreet(e.currentTarget.value)
            }
          />
          <br></br>
          <label htmlFor="housenumber">Nr </label>
          <input
            type="text"
            name="housenumber"
            value={housenumber}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setHousenumber(e.currentTarget.value)
            }
          />
          <br></br>
          <label htmlFor="zipcode">PLZ </label>
          <input
            type="number"
            name="zipcode"
            value={zipcode}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setZipcode(e.currentTarget.value)
            }
          />
          <br></br>
          <label htmlFor="city">Ort </label>
          <input
            type="text"
            name="city"
            value={city}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setCity(e.currentTarget.value)
            }
          />
          <br></br>
          <label htmlFor="country">Land </label>
          <input
            type="text"
            name="country"
            value={country}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setCountry(e.currentTarget.value)
            }
          />
          <br></br>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
}
