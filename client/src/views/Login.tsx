import React from "react";

export default function Login() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="card card-border bg-base-100 w-96">
                <div className="card-body items-center text-center">
                    <h2 className="card-title mb-4">Log In</h2>
                    <label className="floating-label mb-8 w-full">
                        <span>Your Username</span>
                        <input type="text" className="input validator" required placeholder="Username" />
                    </label>
                    <label className="floating-label mb-8 w-full">
                        <span>Your Password</span>
                        <input type="password" className="input" required placeholder="Password" minLength={6} />
                    </label>
                    <div className="card-actions">
                        <button className="btn btn-primary">Log In</button>
                    </div>
                </div>
            </div>
        </div>
    )
}