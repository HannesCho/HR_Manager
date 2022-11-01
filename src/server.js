import "./db";
import express from "express";
import globalRouter from "./router/globalRouter";
import userRouter from "./router/userRouter";

const PORT = 4000;

const app = express();

app.use("/", globalRouter);
app.use("/user", userRouter);

const handleListening = () =>
  console.log(`Server listenting on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);
