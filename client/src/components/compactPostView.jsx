import { Link } from "react-router";
import ByAuthor from "./byAuthor";

export default function CompactPostView({title, slug, author}) {
    return (
        <Link to={`/user/${author.username}/post/${slug}`}>
            <div className="card w-full bg-base-100 card-sm shadow-sm mb-4 md:mb-8">
                <div className="card-body">
                    <h2 className="card-title">{title}</h2>
                    <ByAuthor author={author} />
                </div>
            </div>
        </Link>
    );
}