import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { Response } from "express";

const connectDb = require("./config/database");
const userRouter = require("./routes/userRoute");
const todoRouter = require("./routes/todoRoute");
const cookie = require("cookie-parser");
const cors = require("cors");
const app = express();

dotenv.config({ path: "./config/config.env" });

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("common"));
app.use(cookie());
app.use(
  cors({
    origin: process.env.FRONTEND_RULE,
    credentials: true,
  })
);

//Routes
app.get("/", (_, res: Response) => {
  res.send("Hello World!");
});

app.use("/api/v1", userRouter);
app.use("/api/v1", todoRouter);

connectDb();

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
