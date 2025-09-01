import express, { Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import filesRoute from "./routes/fileRoute.js";
import cors from "cors";

dotenv.config();
const app = express();

//middleware for parsing request body
app.use(express.json());

//Middleware to handle CORS policy
app.use(cors());

//basic load page with content
app.get("/", (req: Request, res: Response) => {
  console.log(req);
  return res.status(234).send("Hello World!");
});

app.use("/files", filesRoute);

//connect to the db
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("Connection to DB established");

    //start the server on the port provided in .env file
    app.listen(process.env.PORT, () => {
      console.log(`App is listening to port: ${process.env.PORT}`);
    });
  })
  .catch((err: Error) => {
    console.log(err);
  });

/*
Cross Origin Resource Sharing
Server can check origins, methods, and headers.
*/
