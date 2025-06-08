import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import escapeStringRegexp from 'escape-string-regexp';
import qs from "qs";

export default function Register() {
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: (event: Event) => {
            event.preventDefault();
            const formData = new FormData(event.target as HTMLFormElement);
            return axios.post("/api/auth/create-account", qs.stringify(Object.fromEntries(formData.entries())));
        },
        onSuccess: (response) => {
            if (response.status == 200) {
                navigate("/");
            }
        }
    });
    const [password, setPassword] = useState("");
    const passwordPattern = useMemo(() => escapeStringRegexp(password), [password]);
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="card card-border bg-base-100 w-96">
                <div className="card-body items-center text-center">
                    <h2 className="card-title mb-8">Register</h2>
                    <form onSubmit={mutation.mutate} className="w-full">
                        <label className="floating-label w-full h-24">
                            <span>Your Username</span>
                            <input type="text" id="username" name="username" className="input validator" required placeholder="Username"
                                pattern="[A-Za-z][A-Za-z0-9\-]*" minlength="3" maxlength="30" title="Only letters, numbers or dash" />
                            <p className="validator-hint">
                                Must be 3 to 30 characters containing only letters, numbers or dash.
                            </p>
                        </label>
                        <label className="floating-label w-full h-24">
                            <span>Your Password</span>
                            <input type="password" id="password" name="password" className="input validator" required placeholder="Password" minlength="6"
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}"
                                title="Must be at least 6 characters, including number, lowercase letter, uppercase letter"
                                onChange={e => setPassword(e.target.value)} value={password} />
                            <p className="validator-hint">
                                Must be at least 6 characters, including at least one number, at least one lowercase letter, and at least one uppercase letter.
                            </p>
                        </label>
                        <label className="floating-label w-full h-24">
                            <span>Your Password Again</span>
                            <input type="password" id="password2" name="password2" className="input validator" required placeholder="Confirm Password" minlength="6"
                                pattern={passwordPattern}
                                title="Must match the previous password" />
                            <p className="validator-hint">
                                Must match the previous password.
                            </p>
                        </label>
                        <div className="card-actions">
                            <button className="btn btn-primary">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}