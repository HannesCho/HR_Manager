import express from "express";
import {
  userList,
  login,
  getSignup,
  postSignup,
} from "../controllers/userController";

const rootRouter = express.Router();

rootRouter.get("/", userList);
rootRouter.route("/signup").get(getSignup).post(postSignup);
rootRouter.get("/login", login);

export default rootRouter;
