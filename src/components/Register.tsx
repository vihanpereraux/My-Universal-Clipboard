import React from "react";

const Register: React.FC = () => {
    return (
        <>
            <input
                placeholder="Enter Device Name"
                type="text"
                name=""
                id="device_name" />

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

            <button>Register</button>

        </>
    )
}

export default Register