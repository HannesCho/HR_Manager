import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import bcrypt from "bcrypt";
import signJWT from "../utils/signJWT";
import config from "../config/config";
import Employee from "../models/Employee";
import ValidateEmail from "../utils/emailValidation";

/** get all users from db */
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

/** create a new User */
export const Signup = async (req: Request, res: Response) => {
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
  // check all the required fields
  if (
    !username ||
    !password ||
    !password2 ||
    !firstName ||
    !lastName ||
    !email ||
    !role
  ) {
    return res
      .status(403)
      .json({ errorMessage: "Please Check required fields" });
  }
  // Validate the email
  if (!ValidateEmail(email)) {
    return res.status(403).json({ errorMessage: "Invalid email address." });
  }

  if (password !== password2) {
    return res
      .status(403)
      .json({ errorMessage: "Password confirmation does not match." });
  }
  // check if there is a user with same username
  const usernameExists = await User.exists({ username });
  if (usernameExists) {
    return res.status(403).json({
      errorMessage: "This username is already taken.",
    });
  }
  // check if there is a user with same email
  const emailExists = await User.exists({ email });
  if (emailExists) {
    return res.status(403).json({
      errorMessage: "This email is already taken.",
    });
  }
  // check if there is a employee with same email
  const existsEmployee = await Employee.exists({ email });
  if (existsEmployee) {
    return res.status(403).json({
      errorMessage: "This email is already taken.",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 5);

  try {
    const createdUser = await User.create({
      username,
      password: hashedPassword,
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

/** log in a new User   */
export const Login = async (req: Request, res: Response) => {
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

/** get a User or Employee */
export const userProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      return res.status(200).json(user);
    }
    try {
      const employee = await Employee.findById(req.params.id);
      return res.status(200).json(employee);
    } catch (error) {
      return res.status(400).json({
        errorMessage: error,
      });
    }
  } catch (error) {
    return res.status(400).json({
      errorMessage: error,
    });
  }
};

/** update a User or Empolyee */
export const editUser = async (req: Request, res: Response) => {
  const {
    username,
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

  // Validate the email
  if (!ValidateEmail(email)) {
    return res.status(403).json({ errorMessage: "Invalid email address." });
  }

  // if this is a User, then update a User
  const userExists = await User.exists({ $or: [{ username }, { email }] });
  if (userExists) {
    if (!username || !firstName || !lastName || !email || !role) {
      return res
        .json({ errorMessage: "Please Check required fields" })
        .status(401);
    }
    try {
      const editedUser = await User.findByIdAndUpdate(req.params.id, {
        username,
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
      console.log("editedUser", editedUser);
      return res.status(200).json(editedUser);
    } catch (error) {
      return res.status(400).json({
        errorMessage: error,
      });
    }
  }
  // if this is a Employee, then update a Employee
  const existsEmployee = await Employee.exists({ email });
  if (existsEmployee) {
    if (username) {
      return res
        .json({ errorMessage: "Employee don't have username" })
        .status(401);
    }
    if (!firstName || !lastName || !email || !role) {
      return res
        .json({ errorMessage: "Please Check required fields" })
        .status(401);
    }
    try {
      const editedEmployee = await Employee.findByIdAndUpdate(req.params.id, {
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
      console.log("editedEmployee", editedEmployee);
      return res.status(200).json(editedEmployee);
    } catch (error) {
      return res.status(400).json({
        errorMessage: error,
      });
    }
  }
};

/** delete an User or an Employee */
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      return res.status(200).json(deletedUser);
    }
    try {
      const deletedEmpolyee = await Employee.findByIdAndDelete(req.params.id);
      return res.status(200).json(deletedEmpolyee);
    } catch (error) {
      return res.status(400).json({
        errorMessage: error,
      });
    }
  } catch (error) {
    return res.status(400).json({
      errorMessage: error,
    });
  }
};

interface decodedJWT {
  username: string;
}
/** get a logged in User */
export const loggedInUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, config.server.token.secret);
      const currentUserName = (decoded as decodedJWT).username;
      const currentUser = await User.findOne({ username: currentUserName });
      return res.status(200).json(currentUser);
    } catch (error) {
      return res.status(404).json({
        message: error,
        error,
      });
    }
  } else {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};
