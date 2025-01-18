import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

// props
import { AuthPageProps } from "../interfaces/props";

// components
import Login from "../components/Login";
import Register from "../components/Register";

const Auth: React.FC = () => {
    const location = useLocation();
    const { action } = location.state as AuthPageProps

    useEffect(() => {
        console.log(action)
    }, [])

    return (
        <>
            {/*  */}
            {action === 'login' ?
                <Login />
                :
                // 
                action === 'register' ?
                    <Register />
                    :
                    ""
            }
        </>
    )
}

export default Auth