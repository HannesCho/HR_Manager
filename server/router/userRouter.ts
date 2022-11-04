import express from "express";
import {
  editUser,
  deleteUser,
  userProfile,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.patch("/edit", editUser);
userRouter.use("/delete", deleteUser);
userRouter.get("/:id", userProfile);

export default userRouter;
