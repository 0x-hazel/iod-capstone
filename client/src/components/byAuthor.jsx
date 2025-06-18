import { Link } from "react-router";

export default function ByAuthor({ author, link }) {
    return (
        <div className="flex flex-row">
            <div className="avatar avatar-placeholder mr-4">
                <div className="bg-neutral text-neutral-content w-12 rounded-full">
                    <span>AV</span>
                </div>
            </div>
            <div className="flex flex-col justify-center">
                <div className="font-semibold">{author.display_name}</div>
                {link ?
                    <Link to={`/user/${author.username}`} className="link link-hover">@{author.username}</Link>
                    :
                    <div>@{author.username}</div>
                }
            </div>
        </div>
    );
}