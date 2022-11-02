import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/User";

// handle Errors
function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

export const userList = (req: Request, res: Response, next: NextFunction) => {};

export const postSignup = async (req: Request, res: Response) => {
  const {
    username,
    password,
    password2,
    firstName,
    lastName,
    email,
    street,
    housenumber,
    zipcode,
    city,
    country,
  } = req.body;

  if (password !== password2) {
    return res
      .status(403)
      .json({ errorMessage: "Password confirmation does not match." });
  }

  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (exists) {
    return res.status(403).json({
      errorMessage: "This username/email is already taken.",
    });
  }
  try {
    await User.create({
      username,
      password,
      firstName,
      lastName,
      email,
      street,
      housenumber,
      zipcode,
      city,
      country,
    });
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).json({
      errorMessage: error,
    });
  }
};
export const getSignup = (req: Request, res: Response) => res.send("Sign Up");
export const login = (req: Request, res: Response) => res.send("Log In");
export const logout = (req: Request, res: Response) => res.send("Log Out");
export const editUser = (req: Request, res: Response) => res.send("Edit User");
export const deleteUser = (req: Request, res: Response) =>
  res.send("Delete User");
export const userProfile = (req: Request, res: Response) =>
  res.send("User Detail");
