import React,
{
    useEffect,
    useState
} from "react";

// firebase
import { collection, getDocs, query, orderBy, addDoc } from "firebase/firestore";
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

let localMessagesArr: any[] = [];

const ChatRoom: React.FC = () => {
    const [value, setValue] = useState<string>("");
    const [messages, setMesaages] = useState<MessageProps[]>([]);

    // 
    const getMessages = async () => {
        const q = query(collection(db, "chat_room"), orderBy("timestamp"));
        const querySnapshot = await getDocs(q);

        // const querySnapshot = await getDocs(collection(db, "chat_room"));
        const items: any[] = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        // console.log(items)

        localMessagesArr = items;

        const temp: MessageProps[] = []

        items.map((item) => {
            temp.push(
                {
                    sender_username: item.sender_username,
                    text: item.text,
                    timestamp: item.timestamp
                })
        });

        setMesaages(temp);
    }

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(event.target.value)
        setValue(event.target.value);
    }

    const onSumbit = async () => {
        const date = new Date();
        let snapShot = {
            sender_username: JSON.parse(localStorage.getItem('currentUser') as string),
            text: value,
            timestamp: date
        }

        try {
            await addDoc(collection(db, "chat_room"), { ...snapShot });

            console.log(`date.getSeconds() - ${date.getSeconds()}`)

            let snapShot2 = {
                sender_username: JSON.parse(localStorage.getItem('currentUser') as string),
                text: value,
                timestamp: {
                    seconds: date.getTime() / 1000,
                    nanoseconds: 0
                }
            }

            localMessagesArr.push(snapShot2);

            setMesaages(localMessagesArr)
        } catch (error) {
            console.log(`Error - ${error}`)
        }
    }

    // seconds convertion
    const convertion = (seconds: number) => {
        const date = new Date(seconds * 1000)
        let minutes: string;
        if (date.getUTCMinutes() < 10) {
            minutes = "0" + date.getUTCMinutes().toString()
        }
        else {
            minutes = date.getUTCMinutes().toString()
        }
        return (date.getUTCHours().toString() + " : " + minutes);
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

                <div
                    className={Styles._chat_space}
                    ref={(el) => { if (el) el.scrollTop = el.scrollHeight; }}>

                    {messages.map((message, index) => (
                        <div className={Styles._bubble} key={index}>
                            <Bubble
                                timestamp={convertion(message.timestamp.seconds)}
                                sender_username={message.sender_username}
                                text={message.text} />
                        </div>
                    ))}
                </div>
                <div className={Styles._message_box}>
                    <input onChange={handleInput} placeholder="Type your message here " />
                    <Button onClick={onSumbit} variant="contained">Send</Button>
                </div>
            </div>
        </>
    )
}

export default ChatRoom