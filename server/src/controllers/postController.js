import bodyParser from "body-parser";
import express from "express";
import cookieParser from "cookie-parser";

const controller = express();
controller.use(bodyParser.urlencoded({ extended: true }));
controller.use(cookieParser());

controller.post("/create-post", (req, res) => {
    console.log("New Post:", req.body.title);
    console.log(req.body.content);
    res.json({ status: "sure" });
});

export default controller;