import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import InputChat from "./InputChat";
import "../styles/Chat.css";

export default function Chat() {

  const url = `${ import.meta.env.VITE_API_URL }/api`;

  let socket = useRef(null);
  let user = useRef(null);

  const bottomRef = useRef(null);

  // Estados del chat
  let [usersConnected, setUsersConnected] = useState([]);
  let [messages, setMessages] = useState([]);

  useEffect(() => {

      // Conección de Sockets
      const conectarSocket = async() => {
        socket.current = io(`${import.meta.env.VITE_API_URL}`, {
            'extraHeaders': {
                'x-token': localStorage.getItem('token')
            }
        });

        socket.current.on('connect', () =>{
            console.log('Sockets online');
        });

        socket.current.on("usuarios-activos", (activeUsers) => {
          setUsersConnected(activeUsers);
        })
        socket.current.on("recibir-mensajes", (messages) => {
          setMessages(messages);
        })
        
        socket.current.on('disconnect', () =>{
          console.log('Sockets offline');
        });
      }
      
      // Validar el token del localstorage
      const validarJWT = async() => {

        const token = localStorage.getItem('token') || '';

        const resp = await fetch( url + "/auth", {
            headers: { 'x-token': token }
        });

        const { user: userDB, token: tokenDB } = await resp.json();
        localStorage.setItem('token', tokenDB );
        user.current = userDB;

        await conectarSocket();
      }

      validarJWT();
  }, [socket, url])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages])

  return (
    <main id="chat">
      <h1 className="chat-title">General Chat</h1>
      <article className="chat-users">
        <h3>Users</h3>
        <ul>
          {
            (usersConnected.length != 0)
              ? usersConnected.map((user, index) => {
                return (
                  <li key={ index }>
                    <div>
                      <img src={ user.img ? `${ user.img }` : "./no-image.avif"} />
                    </div>
                    <span>{ user.name }</span>
                  </li>
                )
              })
              : <li>No Hay Usuarios</li>
          }
        </ul>
      </article>
      <hr/>
      <article className="chat-messages" ref={bottomRef}>
        <ul className="messages-box">
          {
            (messages.length != 0)
              ? messages.map((message, index) => {
                return (
                  <li key={ index }>
                    <div className="message-name">
                      {message.name}
                    </div>
                    <div className="message-text">
                      { message.message }
                    </div>
                  </li>
                )
              })
              : <li>No Hay mensajes</li>
          }
        </ul>
      </article>
      <InputChat socket={ socket.current } user={ user.current } token={ localStorage.getItem("token") } />
    </main>
  )
}
