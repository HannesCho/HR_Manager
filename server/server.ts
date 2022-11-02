import "./db";
import "./models/User";
import "./models/Comment";
import express from "express";
import morgan from "morgan";
import { config } from "./config/config";
import rootRouter from "./router/rootRouter";
import userRouter from "./router/userRouter";

const app = express();
const logger = morgan("dev");

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", rootRouter);
app.use("/user", userRouter);

const handleListening = () =>
  console.log(
    `✅ Server listenting on port http://localhost:${config.server.prot}`
  );

app.listen(config.server.prot, handleListening);
