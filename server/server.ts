import "./db";
// import "./models/User";
// import "./models/Comment";
import express from "express";
import { config } from "./config/config";
// import globalRouter from "./router/globalRouter";
// import userRouter from "./router/userRouter";

const app = express();

// app.use("/", globalRouter);
// app.use("/user", userRouter);

const handleListening = () =>
  console.log(
    `✅ Server listenting on port http://localhost:${config.server.prot}`
  );

app.listen(config.server.prot, handleListening);
