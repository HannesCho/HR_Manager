import express from "express";
import {
  editUser,
  deleteUser,
  userProfile,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/:id", userProfile);
userRouter.delete("/:id", deleteUser);
userRouter.put("/edit/:id", editUser);

export default userRouter;
