export default function ByAuthor({author}) {
    return (
        <div className="flex flex-row">
            <div className="avatar avatar-placeholder mr-4">
                <div className="bg-neutral text-neutral-content w-12 rounded-full">
                    <span>AV</span>
                </div>
            </div>
            <div>
                <div className="font-semibold">{author.display_name}</div>
                <a href={`/user/${author.username}`} className="link link-hover">@{author.username}</a>
            </div>
        </div>
    );
}