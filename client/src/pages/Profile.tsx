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
      .post(
        API_URL + "comment",
        {
          username: profileUser?.username,
          text: comment,
          author: userContext?.user?.username,
        },
        { headers: authHeader() }
      )
      .then((res) => {
        console.log(res.data);
        axios
          .get(API_URL + `user/${id}`, { headers: authHeader() })
          .then((res) => {
            setProfileUser(res.data);
          })
          .catch((error) => console.log(error));
        setProfileUser(profileUser);
        setComment("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="p-10 h-auto w-screen flex flex-col items-center bg-gray-200">
      <h3 className="text-3xl font-bold mb-5">
        Profile of {profileUser?.firstName} {profileUser?.lastName}
      </h3>
      <div className="mx-auto w-full max-w-[550px] h-auto rounded-xl bg-white shadow-lg">
        <div className="flex flex-col">
          <div className="flex p-5">
            <div className="grid grid-rows-6 mr-5 w-auto">
              <div className="text-sm font-bold ">User Name</div>
              <div className="text-sm font-bold">Full Name</div>
              <div className="text-sm font-bold">Email</div>
              <div className="text-sm font-bold row-span-2">Address</div>
              <div className="text-sm font-bold">Role</div>
            </div>
            <div className="grid grid-rows-6">
              <div>{profileUser?.username}</div>
              <div>
                {profileUser?.firstName} {profileUser?.lastName}
              </div>
              <div>{profileUser?.email}</div>
              <div>
                {profileUser?.housenumber}, {profileUser?.street}
              </div>
              <div>
                {profileUser?.zipcode}, {profileUser?.city},{" "}
                {profileUser?.country}
              </div>
              <div>{profileUser?.role}</div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center">
            <button className="mx-5 rounded-md bg-blue-500 hover:bg-blue-400 max-w-sm w-full py-3 px-5 mb-5 text-sm font-semibold text-white outline-none">
              <Link to={`/edit/${id}`}>Edit</Link>
            </button>
            <button
              className="mx-5 rounded-md bg-red-500 hover:bg-red-400 max-w-sm w-full py-3 px-5 mb-5 text-sm font-semibold text-white outline-none"
              onClick={() => {
                handleDelete();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-[550px] h-auto rounded-xl bg-white shadow-lg mt-10 p-5">
        <h3 className="text-xs font-semibold uppercase text-gray-400 mb-1">
          Comments
        </h3>
        <div className="divide-y divide-gray-200">
          {comments ? (
            comments.map((comment, i) => {
              return (
                <div key={i} className="flex items-center justify-around p-5">
                  <div className="text-2xl">{comment.text}</div>
                  <div className="flex flex-col">
                    <div className="text-base font-semibold">
                      {comment.author}
                    </div>
                    <div className="text-sm text-gray-500">
                      {comment.createdAt.split("T")[0]}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div></div>
          )}
        </div>
        <div>
          <hr className="bg-gray-700 my-5" />
          <form onSubmit={handleSubmit}>
            <label
              className="mb-3 block text-base font-medium text-[#07074D]"
              htmlFor="comment"
            >
              New Comment{" "}
            </label>
            <textarea
              className="w-full mb-5 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#60a5fa] focus:shadow-md"
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className="hover:shadow-form rounded-md bg-blue-500 hover:bg-blue-400 py-3 px-8 text-base font-semibold text-white outline-none"
              type="submit"
            >
              Write Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
