import { expect, test } from "vitest";
import { createSlug } from "./postController";

test("Slugify", () => {
    expect(createSlug("Hello, world!")).toEqual("hello-world");
    expect(createSlug("But, soft! what light through yonder window breaks?")).toEqual("but-soft-what-light-through-yonder-window-breaks");
    expect(createSlug("this - is \"a\" *test* - ")).toEqual("this-is-a-test-");
});