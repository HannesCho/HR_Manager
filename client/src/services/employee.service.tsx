import axios from "axios";
import authHeader from "./authHeader";
import { IEmployee } from "../types/employee.type";

const API_URL = "http://localhost:4000/";

export const getEmployeeList = () => {
  return axios.get<IEmployee[]>(API_URL + "employee", {
    headers: authHeader(),
  });
};
