import React from "react";

// props
import { BubbleProps } from "../interfaces/props";

// styles
import Styles from '../pages/ChatRoom.module.css'

const Bubble: React.FC<BubbleProps> = ({ sender_username, text, timestamp }) => {
    return (
        <>
            <table>
                <tbody>
                    <tr>
                        <td>
                            {sender_username === 'computer_001' ? (
                                <img src="/gifs/gif_1.gif" alt="" />
                            ) : null}

                            {sender_username === 'computer_002' ? (
                                <img src="/gifs/gif_2.gif" alt="" />
                            ) : null}

                            {sender_username === 'computer_003' ? (
                                <img src="/gifs/gif_3.gif" alt="" />
                            ) : null}
                        </td>
                        <td>
                            <span className={Styles._sender}>{sender_username}</span>
                            <span style={{
                                opacity: .5,
                                fontSize: 15,
                                marginLeft: 10
                            }}>{timestamp}</span>
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