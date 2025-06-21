import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import CompactPostView from "../components/compactPostView";
import NavBar from "../components/navBar";
import WriteButton from "../components/writeButton";
import EditableAvatar from "../components/editableAvatar";
import EditableTextLine from "../components/editableTextLine";
import EditableTextField from "../components/editableTextField";
import { useCallback, useState } from "react";
import { useAlert } from "../hooks/alerts";

export default function User() {
    const navigate = useNavigate();
    const { user } = useParams();
    const alert = useAlert();
    const contentQuery = useQuery({
        queryKey: ['author'],
        queryFn: () => {
            return axios.get(`/api/user/get-user/${user}`);
        }
    });
    const [isEdited, setIsEdited] = useState(false);
    const mutateData = useMutation({
        mutationFn: (event) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            return axios.post(`/api/user/update-user/${user}`, formData);
        },
        onSuccess: () => {
            setIsEdited(false);
            navigate(0);
        },
        onError: (result) => {
            alert({ status: "error", message: `Error ${result.status}: ${result.response.data.message}` });
        }
    })
    const [avatar, setAvatar] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [bio, setBio] = useState("");
    const setEdited = useCallback(() => setIsEdited(true), [setIsEdited]);
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
                                    {data.can_edit ?
                                        <EditableAvatar image={data.author.avatar} onEdit={setEdited} updateValue={setAvatar} /> :
                                        <div className="avatar">
                                            <div className="w-24 rounded-full">
                                                <img src={data.author.avatar || "/icon.svg"} />
                                            </div>
                                        </div>
                                    }
                                    <div className="ml-4 md:ml-8 flex flex-col justify-center">
                                        {data.can_edit ?
                                            <EditableTextLine
                                                defaultContent={data.author.display_name}
                                                className="text-2xl font-semibold"
                                                placeholder="Display Name"
                                                onEdit={setEdited}
                                                updateValue={setDisplayName} /> :
                                            <h1 className="text-2xl font-semibold">{data.author.display_name}</h1>
                                        }
                                        <h2 className="text-xl">@{data.author.username}</h2>
                                    </div>
                                </div>
                                <hr />
                                {data.can_edit ?
                                    <>
                                        <EditableTextField defaultContent={data.author.bio} placeholder="Bio" onEdit={setEdited} updateValue={setBio} />
                                        {isEdited &&
                                            <form onSubmit={mutateData.mutate}>
                                                <input type="hidden" name="avatar" value={avatar} />
                                                <input type="hidden" name="display_name" value={displayName} />
                                                <input type="hidden" name="bio" value={bio} />
                                                <input type="submit" value="Save" className="btn btn-primary"></input>
                                            </form>}
                                    </> :
                                    <p>{data.author.bio}</p>
                                }
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