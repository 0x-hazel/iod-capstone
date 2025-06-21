import { useCallback, useState } from "react";

const toBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

export default function EditableAvatar({ image, onEdit, updateValue }) {
    const [icon, setIcon] = useState(image);
    const onClick = useCallback(() => {
        let inputElement = document.createElement("input");
        inputElement.type = "file";
        inputElement.accept = "image/*";
        inputElement.addEventListener("change", function () {
            toBase64(this.files[0]).then((value) => {
                onEdit();
                setIcon(value);
                updateValue(value);
            });
        });
        inputElement.dispatchEvent(new MouseEvent("click"));
    }, [setIcon, onEdit, updateValue]);

    return (
        <div className="avatar hover:cursor-pointer hover:brightness-50" onClick={onClick}>
            <div className="w-24 rounded-full relative">
                <img src={icon || "/icon.svg"} />
            </div>
        </div>
    )
}