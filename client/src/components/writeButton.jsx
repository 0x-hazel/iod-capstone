import { Link } from "react-router";

export default function WriteButton() {
    return (
        <div className="toast toast-end">
            <Link to={"/write"}>
                <button className="btn btn-soft btn-primary p-6 fill-primary hover:fill-base-100">
                    <svg className="w-8 h-8">
                        <use href="/quill-icon.svg#Capa_1" />
                    </svg>
                    <div className="hidden md:block ml-1">Write</div>
                </button>
            </Link>
        </div>
    );
}