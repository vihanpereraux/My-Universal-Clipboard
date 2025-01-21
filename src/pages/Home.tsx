import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// stylesheet
import Styles from './Home.module.css';

const Home: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true)

    useEffect(() => {
        let status;
        JSON.parse(localStorage.getItem('isAuthorized') as string) !== null ?
            status = JSON.parse(localStorage.getItem('isAuthorized') as string)
            :
            localStorage.setItem('isAuthorized', JSON.stringify(false))

        status === true ?
            setIsAuthenticated(true)
            :
            setIsAuthenticated(false)
    }, [])

    const navigate = useNavigate();

    return (
        <>
            <div className={Styles._home_wrapper}>
                <div className={Styles._element}>
                    {/* heading */}
                    <h3>[ Main Menu ]</h3>

                    {isAuthenticated ?
                        (<button
                            onClick={() => {
                                navigate('/chat-room')
                            }}>Public Chat Room</button>)
                        : (
                            <>
                                {/* selection */}

                                <button onClick={() => {
                                    navigate('/auth',
                                        { state: { action: "login" } })
                                }}>Login</button>

                                <button onClick={() => {
                                    navigate('/auth',
                                        { state: { action: "register" } })
                                }}>Add Device</button>
                            </>
                        )

                    }
                </div>
            </div>
        </>
    )
}

export default Home;