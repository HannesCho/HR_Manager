import { Request, Response } from "express";
import User from "../models/User";
import Employee from "../models/Employee";

//** get all employees from db */
export const employeeList = async (req: Request, res: Response) => {
  try {
    const allEmployees = await Employee.find();
    return res.status(200).json(allEmployees);
  } catch (error) {
    return res.status(400).json({
      errorMessage: error,
    });
  }
};

//** create a new Employee */
export const signupEmployee = async (req: Request, res: Response) => {
  const {
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
  // check if there are all required fields
  if (!firstName || !lastName || !email || !role) {
    return res
      .status(403)
      .json({ errorMessage: "Please Check required fields" });
  }
  // check if there is a user with same email
  const existsUser = await User.exists({ email });
  if (existsUser) {
    return res.status(403).json({
      errorMessage: "This email is already taken.",
    });
  }
  // check if there is a user with same email
  const existsEmployee = await Employee.exists({ email });
  if (existsEmployee) {
    return res.status(403).json({
      errorMessage: "This email is already taken.",
    });
  }

  try {
    const createdEmployee = await Employee.create({
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
    res.status(200).json({ createdEmployee });
  } catch (error) {
    return res.status(400).json({
      errorMessage: "Server Error",
    });
  }
};
