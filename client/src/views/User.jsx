import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router";
import CompactPostView from "../components/compactPostView";
import NavBar from "../components/navBar";
import WriteButton from "../components/writeButton";

export default function User() {
    const { user } = useParams();
    const contentQuery = useQuery({
        queryKey: ['author'],
        queryFn: () => {
            return axios.get(`/api/user/get-user/${user}`);
        }
    });
    if (contentQuery.isLoading) {
        return <p>Loading...</p>;
    }
    const data = contentQuery.data.data;
    return (
        <>
            <NavBar />
            <div className="flex items-center justify-center w-screen flex-col">
                <div className="p-4 w-full md:w-11/17">
                    <div className="mb-4 md:mb-8">
                        <div className="card card-border border-secondary w-full mb-4 md:mb-8">
                            <div className="card-body">
                                <div className="flex flex-row mb-[1rem]">
                                    <div className="avatar avatar-placeholder">
                                        <div className="bg-neutral text-neutral-content w-24 rounded-full">
                                            <span className="text-3xl">Av</span>
                                        </div>
                                    </div>
                                    <div className="ml-4 md:ml-8 flex flex-col justify-center">
                                        <h1 className="text-2xl font-semibold">{data.author.display_name}</h1>
                                        <h2 className="text-xl">@{data.author.username}</h2>
                                    </div>
                                </div>
                                <hr />
                                <p>{data.author.bio}</p>
                            </div>
                        </div>
                        <div className="overflow-scroll">
                            {data.posts.map(post => <CompactPostView key={post.slug} title={post.title} slug={post.slug} author={data.author} />)}
                        </div>
                    </div>
                </div>
            </div>
            {data.can_edit && <WriteButton />}
        </>
    );
}