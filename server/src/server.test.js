import request from "supertest";
import { expect, test } from "vitest";
import app from "./server.js";

test("Hello world", async () => {
    const test = await request(app)
        .get("/")
        .send();
    expect(test.statusCode).toEqual(200);
    expect(test.text).toEqual("Hello, world!");
});

test("Get front page posts", async () => {
    const test = await request(app)
        .get("/api/post/recent-posts")
        .send();
    expect(test.statusCode).toEqual(200);
});