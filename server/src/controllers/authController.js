import bodyParser from "body-parser";
import express from "express";
import Account from "../models/account.js";
import argon2 from 'argon2';
import { getSessionToken, invalidateSession, validateToken } from "../util/auth.js";

const controller = express();
controller.use(bodyParser.urlencoded({ extended: true }));

controller.post("/create-account", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;
    if (password !== password2) {
        res.json({ status: "failed", message: "Passwords do not match" });
    }
    if ((await Account.findOne({ username: username })) !== null) {
        res.json({ status: "failed", message: "Username is already in use" });
    }
    try {
        const hash = await argon2.hash(password);
        const account = new Account({
            username: username,
            passwordHash: hash,
            displayName: username,
            bio: "",
            avatar: ""
        });
        await account.save();
        const [, token] = getSessionToken(account._id);
        res.json({ status: "success", token: token });
    } catch (err) {
        res.json({ status: "failed", message: err.message });
    }
});

controller.get("/logout", async (req, res) => {
    const token = "test";
    const session = validateToken(token).session;
    if (session !== null) {
        invalidateSession(session.id);
    }
});

export default controller;