import { useEffect, useRef } from "react";
import { io } from "socket.io-client"

export default function Chat() {

  const url = 'http://localhost:8080/api/auth/';

  let socket = useRef(null);
  let user = useRef(null);

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

        socket.current.on('disconnect', () =>{
            console.log('Sockets offline');
        });

        socket.current.on("usuarios-activos", (activeUsers) => {
          console.log(activeUsers);
        })

      }
      
      // Validar el token del localstorage
      const validarJWT = async() => {

        const token = localStorage.getItem('token') || '';

        const resp = await fetch( url, {
            headers: { 'x-token': token }
        });

        const { user: userDB, token: tokenDB } = await resp.json();
        localStorage.setItem('token', tokenDB );
        user.current = userDB;

        await conectarSocket();
      }

      validarJWT();
  },[])

  return (
    <div>
      <h1>Welcome to the Chat</h1>
    </div>
  )
}
