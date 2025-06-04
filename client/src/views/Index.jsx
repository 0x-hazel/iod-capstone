import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Index() {
    const status = useQuery({
        queryKey: ['status'],
        queryFn: async () => {
            return axios.get("/api/auth/status");
        }
    });
    const loggedIn = (!status.isPending) && (status.data.data.status != "failed");
    return (
        <>
            <p>Hello, world!</p>
            { loggedIn ? <p>Logged In</p> : <p>Not Logged In</p> }
        </>
    );
}