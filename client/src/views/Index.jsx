import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAlert } from "../components/alertSection";

export default function Index() {
    const navigate = useNavigate();
    const alert = useAlert();
    const status = useQuery({
        queryKey: ['status'],
        queryFn: async () => {
            return axios.get("/api/auth/status");
        }
    });
    const logOut = useMutation({
        mutationFn: async () => {
            return axios.post("/api/auth/logout");
        },
        onSuccess: () => {
            navigate(0);
        }
    })
    const loggedIn = (!status.isPending) && (status.data.data.status != "failed");
    return (
        <>
            <p>Hello, world!</p>
            { loggedIn ? <><p>Logged In</p><button className="btn" onClick={logOut.mutate}>Log Out</button></> : <p>Not Logged In</p> }
            <button className="btn" onClick={() => alert({ status: "error", message: "Hell yeah" })}>Alert</button>
        </>
    );
}