import axios from "axios";
import authHeader from "./authHeader";
import { IUser } from "../types/user.type";
import { CommentDTO, UserDTO } from "../types/dtos.type";

const API_URL = "http://localhost:4000/";

export const getUserList = () => {
  return axios.get<IUser[]>(API_URL, { headers: authHeader() });
};

export const getProfileUser = (id: string | undefined) => {
  return axios.get(API_URL + `user/${id}`, { headers: authHeader() });
};

export const editUser = (userDTO: UserDTO, id: string | undefined) => {
  return axios.put(API_URL + `user/${id}`, userDTO, { headers: authHeader() });
};

export const deletUser = (id: string | undefined) => {
  return axios.delete(API_URL + `user/${id}`, { headers: authHeader() });
};

export const createComment = (commentDTO: CommentDTO) => {
  return axios.post(API_URL + "comment", commentDTO, { headers: authHeader() });
};

export const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};
