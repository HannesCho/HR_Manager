import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:4000/";

export const getUserList = async () => {
  try {
    const userList = await axios.get(API_URL);
    return userList;
  } catch (error) {
    console.log(error);
  }
};

export const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

export const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

export const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};
