import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import NavBar from "../components/navBar";
import CompactPostView from "../components/compactPostView";
import WriteButton from "../components/writeButton";
import { useSession } from "../hooks/session";

export default function Index() {
    const { isLoggedIn } = useSession();
    const posts = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            return axios.get("/api/post/recent-posts");
        }
    });
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
            {isLoggedIn() && <WriteButton />}
            <p>Hello, world!</p>
        </>
    );
}