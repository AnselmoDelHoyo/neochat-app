import { useEffect, useState } from "react";

export default function Chats() {

    const [ chats, setChats ] = useState([]);

    useEffect(() => {
        
        const loadChats = async () => {
            await fetch(`${import.meta.env.VITE_API_URL}/api/chat`)
                .then((res) => res.json())
                .then(({ chats }) => {
                    setChats(chats);
                });
        }

        loadChats();
    }, [])

    return (
        <main>
            <h1>Chats</h1>
            <section>
                <ul>
                {
                    chats.map((chat) => {
                        return (
                            <li key={chat._id}> 
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
