import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import Index from "./Index";
import Login from "./Login";
import Post from "./Post";
import Register from "./Register";
import User from "./User";
import Write from "./Write";
import TestHarness from "../testUtil";

test("snapshot:Index", () => {
    expect(render(
        <TestHarness>
            <Index />
        </TestHarness>
    ).asFragment()).toMatchSnapshot();
});

test("snapshot:Login", () => {
    expect(render(
        <TestHarness>
            <Login />
        </TestHarness>
    ).asFragment()).toMatchSnapshot();
});

test("snapshot:Post", () => {
    expect(render(
        <TestHarness>
            <Post />
        </TestHarness>
    ).asFragment()).toMatchSnapshot();
});

test("snapshot:Register", () => {
    expect(render(
        <TestHarness>
            <Register />
        </TestHarness>
    ).asFragment()).toMatchSnapshot();
});

test("snapshot:User", () => {
    expect(render(
        <TestHarness>
            <User />
        </TestHarness>
    ).asFragment()).toMatchSnapshot();
});

test("snapshot:Write", () => {
    expect(render(
        <TestHarness>
            <Write />
        </TestHarness>
    ).asFragment()).toMatchSnapshot();
});