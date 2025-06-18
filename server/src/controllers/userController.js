import bodyParser from "body-parser";
import express from "express";
import cookieParser from "cookie-parser";
import Post from "../models/post.js";
import { validateToken } from "../util/auth.js";
import Account from "../models/account.js";

const controller = express();
controller.use(bodyParser.urlencoded({ extended: true }));
controller.use(cookieParser());

controller.get("/get-user/:user", async (req, res) => {
        try {
            const token = req.cookies.session;
            const {_, user} = (await validateToken(token));
            const account = await Account.findOne({ username: req.params.user });
            const posts = await Post.find({ author: account._id }).sort({created: "desc"});
            return res.json({
                author: {
                    display_name: account.displayName,
                    username: account.username,
                    avatar: account.avatar,
                    bio: account.bio
                },
                posts: posts,
                can_edit: user && user?._id.equals(account?._id)
            })
        } catch (err) {
            return res.status(500).json({ status: "failed", message: err.message });
        }
});

export default controller;