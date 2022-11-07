import axios from "axios";
import { API_URL } from "../config/config";
import authHeader from "./authHeader";
import { IEmployee } from "../types/employee.type";

export const getEmployeeList = () => {
  return axios.get<IEmployee[]>(API_URL + "employee", {
    headers: authHeader(),
  });
};
