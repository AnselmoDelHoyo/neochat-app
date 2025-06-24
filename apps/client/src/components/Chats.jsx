import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

import { useSocket } from "../context/SocketContext";

export default function Chats() {

    const [ chats, setChats ] = useState([]);

    const socket = useSocket();

    useEffect(() => {

        console.log(socket);
        
        const loadChats = async () => {
            await fetch(`${import.meta.env.VITE_API_URL}/api/chat`)
                .then((res) => res.json())
                .then(({ chats }) => {
                    setChats(chats);
                });
        }

        loadChats();
    }, [socket])

    return (
        <main>
            <h1>Chats</h1>
            <section>
                <ul>
                {
                    chats.map((chat) => {
                        return (
                            <li 
                                key={chat._id} 
                                style={{
                                    border: "1px solid black",
                                    cursor: "pointer",
                                    marginBottom: "20px"
                                }}
                                // onClick={() => {
                                //     navigate(`${chat._id}`)
                                // }}
                            >
                                <p>{ chat.title }</p>
                                <span>{ chat.messages[chat.messages.length - 1].message }</span>
                            </li>
                        )
                    })
                }    
                </ul>
            </section>
            <nav>
                <ul>
                    <li>home</li>
                    <li>users</li>
                    <li>chats</li>
                    <li>config</li>
                </ul>
            </nav>
        </main>
    )
}
