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
  origin:[process.env.FRONTEND_URL, 'https://atp-24-eg-104-e28.vercel.app', 'http://localhost:5173', 'http://localhost:5174','https://atp-24-eg-104-e28-ez01o8r5s-shivashankar089s-projects.vercel.app'],
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

//connect to db with validation and retry
const connectDB = async () => {
  const rawUrl = process.env.DB_URL;
  if (!rawUrl) {
    console.error("DB_URL is not set. Please add DB_URL to your .env file.");
    process.exit(1);
  }

  // Ensure a database name is present in the URL; if not, append a default
  let dbUrl = rawUrl;
  const firstPart = rawUrl.split("?")[0];
  const hasDbName = /\/[^\/\?]+$/.test(firstPart) && !firstPart.endsWith("/");
  if (!hasDbName) {
    const dbName = process.env.DB_NAME || "blogdb";
    if (rawUrl.includes("?")) {
      dbUrl = rawUrl.replace(/\/?(\?.*)$/, `/${dbName}$1`);
    } else if (rawUrl.endsWith("/")) {
      dbUrl = rawUrl + dbName;
    } else {
      dbUrl = rawUrl + "/" + dbName;
    }
    console.warn(`DB_URL did not include a database name; using '${dbName}'.`);
  }

  const maxRetries = 5;
  let attempt = 0;

  const tryConnect = async () => {
    attempt += 1;
    try {
      await connect(dbUrl, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4,
      });
      console.log("Database connected successfully");
      const port = process.env.PORT || 4000;
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    } catch (err) {
      console.error(`Database connection attempt ${attempt} failed:`, err.message ?? err);
      if (attempt < maxRetries) {
        const delay = Math.min(30000, 1000 * Math.pow(2, attempt));
        console.log(`Retrying connection in ${delay / 1000}s...`);
        setTimeout(tryConnect, delay);
      } else {
        console.error("All database connection attempts failed.");
        console.error("Common causes: incorrect DB_URL, missing DB user/password, or Atlas IP whitelist blocking this machine.");
        console.error("Check your .env and Atlas network access, then restart the server.");
        process.exit(1);
      }
    }
  };

  tryConnect();
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
