import { useCallback, useState } from "react";
import useEditView from "../hooks/editView";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import qs from "qs";
import MarkdownView from "../components/markdownView";
import NavBar from "../components/navBar";
import { useAlert } from "../hooks/alerts";

export default function Write() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");
    const [view, checked] = useEditView();
    const [height, setHeight] = useState(64);
    const alert = useAlert()

    const savePost = useMutation({
        mutationFn: (event) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            return axios.post("/api/post/create-post", qs.stringify(Object.fromEntries(formData.entries())));
        },
        onSuccess: (result) => {
            const path = result?.data?.message;
            if (!path) {
                alert({ status: "error", message: "Failed to navigate to created post." })
            } else {
                navigate(path);
            }
        }
    });

    const updateText = useCallback((event) => {
        setContents(event.target.value);
        setHeight(event.target.scrollHeight);
    }, [setContents, setHeight]);
    return (
        <>
            <NavBar />
            <div className="flex items-center justify-center w-screen flex-col">
                <div className="p-4 w-full md:w-11/17">
                    {view}
                    <div className="mb-4 md:mb-8">
                        {!checked ?
                            <>
                                <input type="text" placeholder="Post Title" className="input text-lg w-full mb-2 md:mb-4" value={title} onChange={(e) => setTitle(e.target.value)} />
                                <textarea className="textarea textarea-secondary w-full" style={{ height: `${height}px` }} value={contents} onChange={updateText}></textarea>
                            </>
                            :
                            <>
                                <h1 className="text-lg my-2 md:my-4 mx-8">{title}</h1>
                                <MarkdownView contents={contents} height={height} />
                            </>
                        }
                    </div>
                    <div className="flex flex-row gap-4">
                        <div className="flex-1"></div>
                        <form className="flex gap-4" onSubmit={savePost.mutate}>
                            <input type="hidden" name="title" value={title} />
                            <input type="hidden" name="content" value={contents} />
                            <button className="btn" onClick={(e) => { e.preventDefault(); navigate(-1) }}>Cancel</button>
                            <button className="btn btn-primary">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}