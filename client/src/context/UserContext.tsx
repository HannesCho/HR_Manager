import { createContext } from "react";
import { IUser } from "../types/user.type";

export interface UserContextInterface {
  user: IUser | null;
  setUser: React.SetStateAction<any>;
}
export const UserContext = createContext<UserContextInterface | null>(null);
