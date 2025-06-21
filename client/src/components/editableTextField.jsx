import { useState } from "react";

export default function EditableTextField({ defaultContent, className, placeholder, onEdit, updateValue }) {
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState(defaultContent);
    if (!isEditing) {
        if (content.length === 0) {
            return <p className={"cursor-pointer text-primary/50" + " " + (className ?? "")} onClick={() => setIsEditing(true)}>Click here to edit...</p>
        }
        return (
            <p className={"cursor-pointer" + " " + (className ?? "")} onClick={() => setIsEditing(true)}>{content}</p>
        );
    } else {
        return (
            <div className={"join join-vertical" + " " + (className ?? "")}>
                <textarea className="textarea w-full join-item" placeholder={placeholder} value={content} onChange={(e) => {
                    onEdit();
                    setContent(e.target.value);
                    updateValue(e.target.value);
                }} />
                <button className="btn join-item" onClick={() => setIsEditing(false)}>Done</button>
            </div>
        );
    }
}