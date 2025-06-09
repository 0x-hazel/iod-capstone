import { useCallback, useState } from "react";
import useEditView from "../components/editView";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import remarkImages from 'remark-images';
import emoji from 'remark-emoji';

export default function Write() {
    const [contents, setContents] = useState("");
    const [view, checked] = useEditView();
    const [height, setHeight] = useState(64);
    const updateText = useCallback((event) => {
        setContents(event.target.value);
        setHeight(event.target.scrollHeight);
    }, [setContents, setHeight]);
    return (
        <div className="flex items-center justify-center w-screen flex-col">
            <div className="p-4 w-full md:w-11/17">
                {view}
                <div className="mb-8">
                    {!checked ?
                        <textarea className="textarea textarea-secondary w-full" style={{height: `${height}px`}} value={contents} onChange={updateText}></textarea>
                        :
                        <div className="card card-border border-secondary w-full" style={{height: `${height}px`}}><div className="card-body">
                            <Markdown remarkPlugins={[emoji, remarkImages, remarkGfm]}>{contents}</Markdown>
                        </div></div>
                    }
                </div>
                <div className="flex flex-row gap-4">
                    <div className="flex-1"></div>
                    <button className="btn">Cancel</button>
                    <button className="btn btn-primary">Save</button>
                </div>
            </div>

        </div>
    );
}