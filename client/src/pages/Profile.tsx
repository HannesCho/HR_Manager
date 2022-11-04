import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { IUser } from "../types/user.type";
import { Link } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const navigation = useNavigate();
  const API_URL = "http://localhost:4000/user/";
  const [profileUser, setProfileUser] = useState<IUser | null>();

  useEffect(() => {
    axios
      .get(API_URL + `${id}`)
      .then((res) => {
        setProfileUser(res.data);
      })
      .catch((error) => console.log(error));
  }, [id, setProfileUser]);

  const handleDelete = () => {
    axios
      .delete(API_URL + `${id}`)
      .then((res) => {
        console.log(res.data);
        navigation("/");
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <div className="Profile-container">
        <h3>Employee Profile</h3>
        <p>{profileUser?.username}</p>
        <p>{profileUser?.email}</p>
        <p>{profileUser?.firstName}</p>
        <p>{profileUser?.lastName}</p>
        <p>{profileUser?.street}</p>
        <p>{profileUser?.housenumber}</p>
        <p>{profileUser?.zipcode}</p>
        <p>{profileUser?.city}</p>
        <p>{profileUser?.country}</p>
        <p>{profileUser?.role}</p>
      </div>
      <Link to={`/edit/${id}`}>Edit</Link>
      <button
        onClick={() => {
          handleDelete();
        }}
      >
        Delete
      </button>
    </>
  );
};

export default Profile;
