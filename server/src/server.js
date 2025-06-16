import express from "express";
import mongoose from 'mongoose'
import authController from "./controllers/authController.js";
import postController from "./controllers/postController.js";

const app = express();
const database = process.env.MONGO_INITDB_DATABASE;
mongoose.connect(`mongodb://localhost/${database}`)

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

app.use("/api/auth", authController);
app.use("/api/post", postController);

export default app;
