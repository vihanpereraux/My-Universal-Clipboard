import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true)

    const navigate = useNavigate();

    return (
        <>
            {/* heading */}
            <h3>Main Menu</h3>

            {/* selections */}
            <button onClick={() => {
                navigate('/auth',
                    { state: { action: "register" } })
            }}>Add Device</button>

            <button onClick={() => {
                navigate('/auth',
                    { state: { action: "login" } })
            }}>Login</button>

            {isAuthenticated ?
                <button
                    onClick={() => {
                        navigate('/chat-room')
                    }}>Public Chat Room</button>
                :
                null
            }
        </>
    )
}

export default Home;