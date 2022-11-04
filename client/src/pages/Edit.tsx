import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import authHeader from "../services/authHeader";
import { IUser } from "../types/user.type";

const Edit = () => {
  const [thisUser, setThisUser] = useState<IUser | null | undefined>();
  const [username, setUsername] = useState(thisUser?.username);
  const [email, setEmail] = useState(thisUser?.email);
  const [firstName, setFirstName] = useState(thisUser?.firstName);
  const [lastName, setLastName] = useState(thisUser?.lastName);
  const [street, setStreet] = useState(thisUser?.street);
  const [housenumber, setHousenumber] = useState(thisUser?.housenumber);
  const [zipcode, setZipcode] = useState(thisUser?.zipcode);
  const [city, setCity] = useState(thisUser?.city);
  const [country, setCountry] = useState(thisUser?.country);
  const [role, setRole] = useState(thisUser?.role);
  const navigate = useNavigate();
  const { id } = useParams();

  const API_URL = "http://localhost:4000/user/";

  useEffect(() => {
    setUsername(thisUser?.username);
    setEmail(thisUser?.email);
    setFirstName(thisUser?.firstName);
    setLastName(thisUser?.lastName);
    setStreet(thisUser?.street);
    setHousenumber(thisUser?.housenumber);
    setZipcode(thisUser?.zipcode);
    setCity(thisUser?.city);
    setCountry(thisUser?.country);
    setRole(thisUser?.role);
  }, [thisUser]);
  useEffect(() => {
    axios
      .get(API_URL + `${id}`, { headers: authHeader() })
      .then((res) => {
        setThisUser(res.data);
      })
      .catch((error) => console.log(error));
  }, [id, setThisUser]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await axios.put(API_URL + `edit/${id}`, {
      headers: authHeader(),
      username,
      firstName,
      lastName,
      email,
      street,
      housenumber,
      zipcode,
      city,
      country,
      role,
    });
    navigate(`/${id}`);
  };

  return (
    <>
      <div className="Edit-container">
        <h3>Edit Employee</h3>
        <p>{thisUser?.username}</p>
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
          <label htmlFor="role">Role </label>
          <input
            type="text"
            name="role"
            value={role}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setRole(e.currentTarget.value)
            }
          />
          <br></br>
          <button type="submit">Edit this Employee</button>
        </form>
      </div>
    </>
  );
};

export default Edit;
