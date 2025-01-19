import React,
{
    useEffect,
    useState
} from "react";

// firebase
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { getFirebaseConfig } from "../config/FirebaseConfig";
const db = getFirebaseConfig();

// mui
import { Button } from "@mui/material";

// components
import Bubble from "../components/Bubble";

// props
import { MessageProps } from "../interfaces/props";

// stylesheet
import Styles from './ChatRoom.module.css';

const ChatRoom: React.FC = () => {
    const [messages, setMesaages] = useState<MessageProps[]>();

    // 
    const getMessages = async () => {
        const q = query(collection(db, "chat_room"), orderBy("timestamp"));
        const querySnapshot = await getDocs(q);

        // const querySnapshot = await getDocs(collection(db, "chat_room"));
        const items: any[] = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

        const temp: MessageProps[] = []

        items.map((item) => {
            temp.push(
                {
                    sender: item.sender_username,
                    text: item.text
                })
        });

        setMesaages(temp);
    }

    // fetch data
    useEffect(() => {
        getMessages()
    }, [])

    return (
        <>
            {/* Chat Room */}
            <div className={Styles._wrapper}>
                <div className={Styles._heading}>
                    <h3>Public Chat Room</h3>
                </div>
                <div className={Styles._chat_space}>
                    {messages?.map((message, index) => (
                        <div className={Styles._bubble} key={index}>
                            <Bubble sender={message.sender} text={message.text} />
                        </div>
                    ))}
                </div>
                <div className={Styles._message_box}>
                    <input placeholder="Type your message here " />
                    <Button variant="contained">Send</Button>
                </div>
            </div>
        </>
    )
}

export default ChatRoom