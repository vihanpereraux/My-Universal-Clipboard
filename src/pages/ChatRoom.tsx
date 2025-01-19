import React from "react";

// mui
import { Button } from "@mui/material";

// import stylesheet
import Styles from './ChatRoom.module.css';

const ChatRoom: React.FC = () => {
    return (
        <>
            <div className={Styles._wrapper}>
                <div className={Styles._heading}>
                    <h3>Public Chat Room</h3>
                </div>
                <div className={Styles._chat_space}>
                    lolx
                </div>
                <div className={Styles._message_box}>
                    <input placeholder="Type your message here " />      
                    <Button variant="contained">Send</Button>
                </div>
            </div>
            {/* Chat Room */}
        </>
    )
}

export default ChatRoom