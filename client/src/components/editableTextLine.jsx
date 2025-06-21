import { useState } from "react";

export default function EditableTextLine({ defaultContent, className, placeholder, onEdit, updateValue }) {
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState(defaultContent);
    if (!isEditing) {
        return (
            <h1 className={"cursor-pointer" + " " + (className ?? "")} onClick={() => setIsEditing(true)}>{content}</h1>
        );
    } else {
        return (
            <div className={"join" + " " + (className ?? "")}>
                <input className="input join-item" placeholder={placeholder} value={content} onChange={(e) => {
                    onEdit();
                    setContent(e.target.value);
                    updateValue(e.target.value);
                }} />
                <button className="btn join-item" onClick={() => setIsEditing(false)}>Done</button>
            </div>
        );
    }
}