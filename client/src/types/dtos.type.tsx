import { IEmployee } from "./employee.type";
import { IUser } from "./user.type";

export interface UserDTO {
  username: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  street: string | undefined;
  housenumber: string | undefined;
  zipcode: string | undefined;
  city: string | undefined;
  country: string | undefined;
  role: string | undefined;
}

export interface EmployeeDTO extends IEmployee {}

export interface CommentDTO {
  username: string | undefined;
  text: string | undefined;
  author: string | undefined;
}

export interface CreateUserDTO extends IUser {
  password2: string;
}

export interface LoginResponse {
  user: IUser;
  token: string;
  message: string;
}
