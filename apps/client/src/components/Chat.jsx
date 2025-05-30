import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client"
import InputChat from "./InputChat";

export default function Chat() {

  const url = 'http://localhost:8080/api';

  let socket = useRef(null);
  let user = useRef(null);

  // Estados del chat
  let [usersConnected, setUsersConnected] = useState([]);
  let [messages, setMessages] = useState([]);

  useEffect(() => {

      // Conección de Sockets
      const conectarSocket = async() => {
        socket.current = io({
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
  }, [socket])

  return (
    <div>
      <h1>Chat</h1>
      <article>
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
      <article>
        <h3>Messages</h3>
        <ul>
          {
            (messages.length != 0)
              ? messages.map((message, index) => <li key={ index }>{message.name} : { message.message }</li>)
              : <li>No Hay mensajes</li>
          }
        </ul>
      </article>
      <InputChat socket={ socket.current } user={ user.current } token={ localStorage.getItem("token") } />
    </div>
  )
}
