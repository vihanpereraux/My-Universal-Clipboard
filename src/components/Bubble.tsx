import React from "react";

// props
import { MessageProps } from "../interfaces/props";

// styles
import Styles from '../pages/ChatRoom.module.css'

const Bubble: React.FC<MessageProps> = ({ sender, text }) => {
    return (
        <>
            <table>
                <tbody>
                    <tr>
                        <td>
                            {sender === "computer_001" ? (
                                <img src="/gifs/gif_1.gif" alt="" />
                            ) : null}

                            {sender === "computer_002" ? (
                                <img src="/gifs/gif_2.gif" alt="" />
                            ) : null}
                        </td>
                        <td>
                            <span className={Styles._sender}>{sender}</span>
                            <div className={Styles._text}>{text}</div>
                            <button>copy</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default Bubble