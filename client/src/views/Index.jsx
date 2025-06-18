import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAlert } from "../hooks/alerts";
import NavBar from "../components/navBar";
import CompactPostView from "../components/compactPostView";
import { Link } from "react-router";

export default function Index() {
    const posts = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            return axios.get("/api/post/recent-posts");
        }
    });
    const alert = useAlert();
    const isLoading = posts.isLoading
    const postData = posts?.data?.data?.posts ?? []
    return (
        <>
            <NavBar />
            <div className="flex items-center justify-center w-screen flex-col">
                <div className="p-4 w-full md:w-11/17">
                {isLoading ? <span className="loading loading-ring loading-xl"></span> :
                    <>
                        {postData.map(post =>
                            <CompactPostView key={`${post.author.username}/${post.slug}`} title={post.title} slug={post.slug} author={post.author} />
                        )}
                    </>
                }
                </div>
            </div>
            <div className="toast toast-end">
                <Link to={"/write"}>
                    <button className="btn btn-soft btn-primary p-4 md:p-8 fill-primary hover:fill-base-100">
                        <svg className="w-8 h-8">
                            <use href="/quill-icon.svg#Capa_1" />
                        </svg>
                        Write
                    </button>
                </Link>
            </div>
            <p>Hello, world!</p>
            <button className="btn" onClick={() => alert({ status: "error", message: "Hell yeah" })}>Alert</button>
        </>
    );
}