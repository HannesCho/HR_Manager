import express from "express";
import { userList, postLogin, postSignup } from "../controllers/userController";
import extractJWT from "../middleware/extractJWT";

const rootRouter = express.Router();

rootRouter.get("/", userList);
rootRouter.post("/signup", postSignup);
rootRouter.post("/login", postLogin);

export default rootRouter;
