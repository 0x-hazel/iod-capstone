import bodyParser from "body-parser";
import express from "express";
import cookieParser from "cookie-parser";
import Post from "../models/post.js";
import { validateToken } from "../util/auth.js";
import Account from "../models/account.js";

const controller = express();
controller.use(bodyParser.urlencoded({ extended: true }));
controller.use(cookieParser());

export function createSlug(title) {
    return title.toLowerCase().replace(/[^\w ]+/g, "").replace(/ +/g, "-");
}

controller.post("/create-post", async (req, res) => {
    const token = req.cookies.session;
    const {_, user} = (await validateToken(token));
    const title = req.body.title;
    const content = req.body.content;
    if (!title) {
        return res.status(400).json({ status: "failed", message: "Post must have a title" });
    }
    if (!content) {
        return res.status(400).json({ status: "failed", message: "Post can't be empty"});
    }
    const baseSlug = createSlug(title);
    let retry = 0;
    let created = false;
    while (!created) {
        let slug = retry === 0 ? baseSlug : `${baseSlug}-${retry}`
        const existingPost = await Post.findOne({ slug: slug, author: user.id });
        if (!existingPost) {
            try {
                await Post.create({
                    slug: slug,
                    title: title,
                    author: user._id,
                    content: content
                });
                return res.json({ status: "success", message: `/user/${user.username}/post/${slug}` });
            } catch (err) {
                return res.status(500).json({ status: "failed", message: err.message });
            }
        } else {
            retry += 1;
        }
    }
});

controller.get("/get-post/:user/:post", async (req, res) => {
    const token = req.cookies.session;
    const {_, user} = (await validateToken(token));
    // mongoose doesn't have quite as good joining mechanisms as SQL so this will have to do
    const author = await Account.findOne({ username: req.params.user });
    const post = await Post.findOne({ slug: req.params.post, author: author?._id });
    if (post) {
        return res.json({
            title: post.title,
            contents: post.content,
            created: post.created,
            author: {
                display_name: author.displayName,
                username: author.username,
                avatar: author.avatar
            },
            can_edit: user && (user?._id === author?._id)
        });
    } else {
        return res.status(404).json({ status: "failed", message: "Post not found" });
    }
});

export default controller;