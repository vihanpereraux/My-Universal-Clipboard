import React from "react";

const Login: React.FC = () => {
    return (
        <>
            <input
                placeholder="Enter Username"
                type="text"
                name=""
                id="username" />

            <input
                placeholder="Enter Password"
                type="password"
                name=""
                id="password" />

            <button>Login</button>
        </>
    )
}

export default Login