import express from "express";
import { userList, login, signup } from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get("/", userList);
globalRouter.get("/signup", signup);
globalRouter.get("/login", login);

export default globalRouter;
