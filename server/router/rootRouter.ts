import express from "express";
import {
  userList,
  postLogin,
  postSignup,
  loggedin,
} from "../controllers/userController";
import extractJWT from "../middleware/extractJWT";

const rootRouter = express.Router();

rootRouter.get("/", userList);
rootRouter.post("/signup", postSignup);
rootRouter.post("/login", postLogin);
rootRouter.get("/loggedin", extractJWT, loggedin);

export default rootRouter;
