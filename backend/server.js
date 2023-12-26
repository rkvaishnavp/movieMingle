import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import connectDB from "./connectDB.js";
import userRoutes from "./routes/userRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";

dotenv.config();
connectDB(); //Connecting to DataBase

const app = express();
app.use(cors());

//Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use("/api/users", userRoutes);
app.use("/api/movie", movieRoutes);

//PORT initialization
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);
