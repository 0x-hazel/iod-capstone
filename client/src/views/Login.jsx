import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import qs from "qs";
import React from "react";
import { useNavigate } from "react-router";
import { useAlert } from "../hooks/alerts";
import NavBar from "../components/navBar";

export default function Login() {
    const navigate = useNavigate();
    const alert = useAlert();
    const mutation = useMutation({
        mutationFn: (event) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            return axios.post("/api/auth/login", qs.stringify(Object.fromEntries(formData.entries())));
        },
        onSuccess: (response) => {
            if (response.status == 200) {
                navigate("/");
            }
        },
        onError: (result) => {
            alert({status: "error", message: `Error ${result.status}: ${result.response.data.message}`});
        }
    });
    return (
        <>
            <NavBar />
            <div className="flex items-center justify-center h-screen">
                <div className="card card-border bg-base-100 w-96">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title mb-4">Log In</h2>
                        <form onSubmit={mutation.mutate} className="w-full">
                            <label className="floating-label mb-8 w-full">
                                <span>Your Username</span>
                                <input type="text" name="username" className="input validator" required placeholder="Username" />
                            </label>
                            <label className="floating-label mb-8 w-full">
                                <span>Your Password</span>
                                <input type="password" name="password" className="input" required placeholder="Password" minLength={6} />
                            </label>
                            <div className="card-actions">
                                <button className="btn btn-primary">Log In</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}