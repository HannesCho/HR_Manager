import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/User";
import bcrypt from "bcrypt";
import signJWT from "../functions/signJWT";

export const userList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allUser = await User.find();
    return res.status(200).json(allUser);
  } catch (error) {
    return res.status(400).json({
      errorMessage: error,
    });
  }
};

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
    role,
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
    const createdUser = await User.create({
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
      role,
    });
    res.status(200).json({ createdUser });
  } catch (error) {
    return res.status(400).json({
      errorMessage: error,
    });
  }
};

export const postLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({
      errorMessage: "An account with this username does not exists.",
    });
  }
  try {
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(400).json({
        errorMessage: "Wrong password",
      });
    } else {
      signJWT(user, (error, token) => {
        if (error) {
          return res.status(500).json({
            message: error.message,
            error: error,
          });
        } else if (token) {
          res.locals.token = token;
          return res.status(200).json({
            message: "Auth successful",
            token: token,
            user: user,
          });
        }
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        error,
      });
    } else {
      console.log("Unexpected error", error);
    }
  }
};

export const editUser = (req: Request, res: Response) => {};
export const deleteUser = (req: Request, res: Response) =>
  res.send("Delete User");

export const userProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({
      errorMessage: error,
    });
  }
};
