import express from "express";
import {
  editUser,
  deleteUser,
  userProfile,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.use("/edit", editUser);
userRouter.use("/delete", deleteUser);
userRouter.use("/:id", userProfile);

export default userRouter;
