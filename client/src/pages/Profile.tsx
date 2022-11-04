import { SyntheticEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { IUser } from "../types/user.type";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import authHeader from "../services/authHeader";
import { IComment } from "../types/comment.type";

const Profile = () => {
  const userContext = useContext(UserContext);

  const { id } = useParams();
  const navigation = useNavigate();
  const API_URL = "http://localhost:4000/";
  const [profileUser, setProfileUser] = useState<IUser | null>();

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<IComment[] | null | undefined>([]);
  useEffect(() => {
    setComments(profileUser?.comments);
  }, [setComments, profileUser]);

  useEffect(() => {
    axios
      .get(API_URL + `user/${id}`, { headers: authHeader() })
      .then((res) => {
        setProfileUser(res.data);
      })
      .catch((error) => console.log(error));
  }, [id, setProfileUser]);

  const handleDelete = () => {
    axios
      .delete(API_URL + `user/${id}`, { headers: authHeader() })
      .then((res) => {
        console.log(res.data);
        navigation("/");
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    axios
      .post(API_URL + "comment", {
        headers: authHeader(),
        username: profileUser?.username,
        text: comment,
        author: userContext?.user?.username,
      })
      .then((res) => {
        console.log(res.data);
        navigation(`/`);
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
      <h2>Comment Section</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="comment">Your Comment: </label>
          <textarea
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit">Write Comment</button>
        </form>
      </div>
      <div style={{ height: "100px" }}>
        <ul>
          {comments ? (
            comments.map((comment, i) => {
              return (
                <li key={i}>
                  <p>{comment.author}</p>
                  <p>{comment.text}</p>
                  <p>{comment.createdAt}</p>
                </li>
              );
            })
          ) : (
            <div></div>
          )}
        </ul>
      </div>
    </>
  );
};

export default Profile;
