import exp from "express";
import { config } from "dotenv";
import { connect } from "mongoose";
import { userApp } from "./APIs/UserAPI.js";
import { authorApp } from "./APIs/AuthorAPI.js";
import { adminApp } from "./APIs/AdminAPI.js";
import { commonApp } from "./APIs/CommonAPI.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
config();

//create express app
const app = exp();
//enable cors
app.use(cors({
  origin:[process.env.FRONTEND_URL, 'https://atp-24-eg-104-e28.vercel.app', 'http://localhost:5173', 'http://localhost:5174'],
  credentials:true
}))
//add cookie parser middeleware
app.use(cookieParser())
//body parser middleware
app.use(exp.json());
//path level middlewares
app.use("/user-api", userApp);
app.use("/author-api", authorApp);
app.use("/admin-api", adminApp);
app.use("/auth", commonApp);

//connect to db
const connectDB = async () => {
  try {
    await connect(process.env.DB_URL);
    console.log("Database connected successfully");
    //assign port
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("Database connection failed:", err);
  }
};

connectDB();

app.get("/", (req, res) => {
    res.send("Backend is running");
});
//to handle invalid path
app.use((req, res, next) => {

  res.status(404).json({ message: `path ${req.url} is invalid` });
});

//Error handling middleware
app.use((err, req, res, next) => {

  //ValidationError
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: "error occurred", error: err.message });
  }
  //CastError
  if (err.name === "CastError") {
    return res.status(400).json({ message: "error occurred", error: err.message });
  }
  const errCode = err.code ?? err.cause?.code ?? err.errorResponse?.code;
  const keyValue = err.keyValue ?? err.cause?.keyValue ?? err.errorResponse?.keyValue;

  if (errCode === 11000) {
    const field = keyValue ? Object.keys(keyValue)[0] : "field";
    const value = keyValue ? keyValue[field] : "unknown";
    return res.status(409).json({
      message: "error occurred",
      error: `${field} "${value}" already exists`,
    });
  }

  //send server side error
  res.status(500).json({ message: "error occurred", error: "Server side error" });
});
