import axios from "axios";
import { IUser } from "../types/user.type";

const API_URL = "http://localhost:4000/";

interface CreateUserDTO extends IUser {
  password2: string;
}

interface LoginResponse {
  user: IUser;
  token: string;
  message: string;
}

export const createUser = async function (dto: CreateUserDTO) {
  try {
    const { data } = await axios.post<IUser>(
      API_URL + "signup",
      { ...dto, zipcode: parseInt(dto.zipcode) },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};

export const login = async (username: string, password: string) => {
  try {
    const { data } = await axios.post<LoginResponse>(
      API_URL + "login",
      { username, password },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    if (data) {
      console.log(data);
      localStorage.setItem("accessTocken", data.token);
      // TODO: Remove storing user and replaced with GET /user
      localStorage.setItem("user", JSON.stringify(data.user));
    }
    return data.user;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};

export const logout = async () => {
  localStorage.removeItem("accessTocken");
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  // TODO: Remove storing user and replaced with GET /user
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);

  return null;
};
