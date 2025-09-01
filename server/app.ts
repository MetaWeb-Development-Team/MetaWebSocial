import express, { Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import filesRoute from "./routes/fileRoute";
import cors from "cors";
import { connectDB } from "./config/db";

dotenv.config();
const app = express();

//middleware for parsing request body
app.use(express.json());

//Middleware to handle CORS policy
app.use(cors());

connectDB();

//basic load page with content
app.get("/", (req: Request, res: Response) => {
   console.log(req);
   return res.status(234).send("Hello World!");
});

app.use("/files", filesRoute);

//export the const app name by default, if export const app = express(); then import { app } from './app';
export default app;
