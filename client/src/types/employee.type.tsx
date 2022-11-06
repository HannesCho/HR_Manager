import { IComment } from "./comment.type";

export interface IEmployee {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  housenumber: string;
  zipcode: string;
  city: string;
  country: string;
  role: string;
  comments?: Array<IComment>;
}
