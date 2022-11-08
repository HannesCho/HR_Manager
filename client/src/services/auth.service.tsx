import axios from "axios";
import authHeader from "./authHeader";
import { API_URL } from "../config/config";
import { IUser } from "../types/user.type";
import { CreateUserDTO, EmployeeDTO, LoginResponse } from "../types/dtos.type";
import { IEmployee } from "../types/employee.type";

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
      const errorMessage = error.response?.data.errorMessage;
      console.log("error: ", error.message);
      return errorMessage;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};

export const createEmployee = async function (dto: EmployeeDTO) {
  try {
    const { data } = await axios.post<IEmployee>(
      API_URL + "employee",
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
      const errorMessage = error.response?.data.errorMessage;
      console.log("error: ", error.message);
      return errorMessage;
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
      localStorage.setItem("accessToken", data.token);
    }
    return data.user;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data.errorMessage;
      console.log("error: ", error.message);
      return errorMessage;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};

export const logout = async () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
};

export const getCurrentUser = async () => {
  const userStr = await axios.get(API_URL + "user", {
    headers: authHeader(),
  });
  if (userStr) return userStr;

  return null;
};
