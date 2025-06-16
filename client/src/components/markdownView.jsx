import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import remarkImages from 'remark-images';
import emoji from 'remark-emoji';

export default function MarkdownView({contents, height}) {
    return (
        <>
            <div className="card card-border border-secondary w-full" style={height && {height: `${height}px`}}><div className="card-body">
                <Markdown remarkPlugins={[emoji, remarkImages, remarkGfm]}>{contents}</Markdown>
            </div></div>
        </>
    );
}