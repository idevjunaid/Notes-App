import * as dotenv from "dotenv";
import mongoose from "mongoose";
import express, { json, response } from "express";
import cors from 'cors';
import chalk from 'chalk'
import userRoute from "./Routes/userRoute.js";
import noteRoute from "./Routes/noteRoute.js";
import { addUserToRequest } from "./Middleware/auth.js";
import userModel from "./Models/userModel.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(addUserToRequest);
app.use(express.json());
app.use("/user", userRoute);
app.use("/note", noteRoute);

// app.get("/abc", (req, res) => {
//   res.send("Hi");
// });

/////////////////////////////////////////////
app.use((req, res) => {
  res.status(404).send("Not Found"); // send a generic HTTP error code and message to the client
});

app.use((err, req, res, next) => {
  if (err) {
    res.status(500).send("Broken rib");
  }
});


const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("db connected");
    app.listen(process.env.PORT, () => {
      console.log(chalk.black.bgWhite(`server connected on port ${process.env.PORT}${"\n".repeat(10)}`));
    });
  } catch (error) {  
    console.log(error.message);
    process.exit(1);
  }
}; 

start();
