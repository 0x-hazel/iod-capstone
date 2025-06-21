import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import ByAuthor from "./byAuthor";
import CompactPostView from "./compactPostView";
import EditableAvatar from "./editableAvatar";
import EditableTextField from "./editableTextField";
import EditableTextLine from "./editableTextLine";
import MarkdownView from "./markdownView";
import TestHarness from "../testUtil";
import NavBar from "./navBar";
import WriteButton from "./writeButton";

test("snapshot:ByAuthor", () => {
    expect(render(
        <TestHarness>
            <ByAuthor author={{ avatar: null, display_name: "Author", username: "author" }} />
        </TestHarness>
    ).asFragment()).toMatchSnapshot();
});

test("snapshot:CompactPostView", () => {
    expect(render(
        <TestHarness>
            <CompactPostView title="Compact Post View" slug="compact-post-view" author={{ avatar: null, display_name: "Author", username: "author" }} />
        </TestHarness>
    ).asFragment()).toMatchSnapshot();
});

test("snapshot:EditableAvatar", () => {
    expect(render(
        <TestHarness>
            <EditableAvatar />
        </TestHarness>
    ).asFragment()).toMatchSnapshot();
});

test("snapshot:EditableTextField", () => {
    expect(render(
        <TestHarness>
            <EditableTextField defaultContent="Editable text" />
        </TestHarness>
    ).asFragment()).toMatchSnapshot();
});

test("snapshot:EditableTextLine", () => {
    expect(render(
        <TestHarness>
            <EditableTextLine />
        </TestHarness>
    ).asFragment()).toMatchSnapshot();
});

test("snapshot:MarkdownView", () => {
    expect(render(
        <TestHarness>
            <MarkdownView />
        </TestHarness>
    ).asFragment()).toMatchSnapshot();
});

test("snapshot:NavBar", () => {
    expect(render(
        <TestHarness>
            <NavBar />
        </TestHarness>
    ).asFragment()).toMatchSnapshot();
});

test("snapshot:WriteButton", () => {
    expect(render(
        <TestHarness>
            <WriteButton />
        </TestHarness>
    ).asFragment()).toMatchSnapshot();
});
