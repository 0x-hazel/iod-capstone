import bodyParser from "body-parser";
import express from "express";
import Account from "../models/account.js";
import argon2 from 'argon2';
import { getSessionToken, invalidateSession, validateToken } from "../util/auth.js";
import cookieParser from "cookie-parser";

const controller = express();
controller.use(bodyParser.urlencoded({ extended: true }));
controller.use(cookieParser());

controller.post("/create-account", async (req, res) => {
    const username = req.body?.username;
    const password = req.body?.password;
    const password2 = req.body?.password2;
    if (!username || !password || !password2) {
        return res.status(400).json({ status: "failed", message: "Missing fields" });
    }
    if (password !== password2) {
        return res.status(400).json({ status: "failed", message: "Passwords do not match" });
    }
    if ((await Account.findOne({ username: username })) !== null) {
        return res.status(409).json({ status: "failed", message: "Username is already in use" });
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
        const [session, token] = await getSessionToken(account._id);
        res.cookie('session', token, { expires: session.expiresAt, httpOnly: true });
        return res.json({ status: "success", token: token });
    } catch (err) {
        return res.status(500).json({ status: "failed", message: err.message });
    }
});

controller.post("/login", async (req, res) => {
    const username = req.body?.username;
    const password = req.body?.password;
    if (!username || !password) {
        return res.status(400).json({ status: "failed", message: "Missing fields" });
    }
    try {
        const account = await Account.findOne({ username: username });
        if (account) {
            if (await argon2.verify(account.passwordHash, password)) {
                const [session, token] = await getSessionToken(account._id);
                res.cookie('session', token, { expires: session.expiresAt, httpOnly: true });
                return res.json({ status: "success", token: token });
            } else {
                return res.status(401).json({ status: "failed", message: "Incorrect username or password" });
            }
        } else {
            return res.status(401).json({ status: "failed", message: "Incorrect username or password" });
        }
    } catch (err) {
        return res.status(500).json({ status: "failed", message: err.message });
    }
});

controller.get("/status", async (req, res) => {
    const token = req.cookies.session;
    const session = (await validateToken(token))?.session;
    if (session != null) {
        return res.json({ status: "success" });
    }
    return res.json({ status: "failed" });
});

controller.post("/logout", async (req, res) => {
    const token = req.cookies.session;
    const session = (await validateToken(token))?.session;
    if (session != null) {
        await invalidateSession(session.id);
    }
    return res.json({ status: "success", message: "You have been signed out" });
});

export default controller;