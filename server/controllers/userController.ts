import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/User";

export const userList = (req: Request, res: Response) => res.send("User List");
export const signup = (req: Request, res: Response) => res.send("Sign Up");
export const login = (req: Request, res: Response) => res.send("Log In");
export const logout = (req: Request, res: Response) => res.send("Log Out");
export const editUser = (req: Request, res: Response) => res.send("Edit User");
export const deleteUser = (req: Request, res: Response) =>
  res.send("Delete User");
export const userProfile = (req: Request, res: Response) =>
  res.send("User Detail");
