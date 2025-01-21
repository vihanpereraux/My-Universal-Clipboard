import React from "react";
import { useLocation } from "react-router-dom";

// props
import { AuthPageProps } from "../interfaces/props";

// components
import Login from "../components/Login";
import Register from "../components/Register";

const Auth: React.FC = () => {
    const location = useLocation();
    const { action } = location.state as AuthPageProps

    return (
        <>
            {/*  */}
            {action === 'login' ?
                <Login action={action} />
                :
                // 
                action === 'register' ?
                    <Register action={action} />
                    :
                    // handle error
                    null
            }
        </>
    )
}

export default Auth