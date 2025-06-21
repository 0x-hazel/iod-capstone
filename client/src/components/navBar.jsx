import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "../hooks/session";
import { useEffect } from "react";
import ByAuthor from "./byAuthor";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";

export default function NavBar() {
    const navigate = useNavigate();
    const { setUser, isLoggedIn, user } = useSession();
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
            navigate("/");
            navigate(0);
        }
    });
    useEffect(() => {
        if (status?.data) {
            setUser(status?.data?.data?.user);
        }
    }, [setUser, status?.data]);
    return (
        <div className="sticky top-0 z-100">
            <div className="navbar bg-base-100 shadow-lg">
                <div className="flex-1">
                    <Link to="/" className="btn btn-ghost text-xl">Libris</Link>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        {isLoggedIn() ?
                            <li>
                                <details>
                                    <summary><ByAuthor author={user} link={true} /></summary>
                                    <ul className="bg-base-100 rounded-t-none p-2 w-full">
                                        <li><a onClick={logOut.mutate}>Log Out</a></li>
                                    </ul>
                                </details>
                            </li>
                            :
                            <>
                                <li><Link to="/login">Log In</Link></li>
                                <li><Link to="/register">Register</Link></li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}