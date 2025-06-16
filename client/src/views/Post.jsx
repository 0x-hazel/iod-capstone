import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router";
import MarkdownView from "../components/markdownView";

export default function Post() {
    const {user, post} = useParams();
    const contentQuery = useQuery({
        queryKey: ['post'],
        queryFn: () => {
            return axios.get(`/api/post/get-post/${user}/${post}`);
        }
    });
    if (contentQuery.isLoading) {
        return <p>Loading...</p>;
    }
    const data = contentQuery.data.data;
    return (
        <div className="flex items-center justify-center w-screen flex-col">
            <div className="p-4 w-full md:w-11/17">
                <div className="mb-4 md:mb-8">
                    <h1 className="text-lg my-2 md:my-4 mx-8">{data.title}</h1>
                    <MarkdownView contents={data.contents} />
                </div>
            </div>
        </div>
    )
}