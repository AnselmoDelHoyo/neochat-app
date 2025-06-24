import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import PropTypes from "prop-types";
// import { useAuth } from "./AuthContext";

const SocketContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => useContext(SocketContext);

export function SocketProvider({ children }) {

    // let { user, token } = useAuth();

    const user = useRef(null)

    const url = `${import.meta.env.VITE_API_URL}/api`;

    let socket = useRef(null);

    // Estados del chat
    let [usersConnected, setUsersConnected] = useState([]);
    let [messages, setMessages] = useState([]);

    useEffect(() => {

        // Conección de Sockets
        const conectarSocket = async () => {

            socket.current = io(`${import.meta.env.VITE_API_URL}`, {
                'extraHeaders': {
                    'x-token': localStorage.getItem('token')
                }
            });

            socket.current.on('connect', () => {
                console.log('Sockets online');
            });

            socket.current.on("usuarios-activos", (activeUsers) => {
                setUsersConnected(activeUsers);
            })
            socket.current.on("recibir-mensajes", (messages) => {
                setMessages(messages);
            })

            socket.current.on('disconnect', () => {
                console.log('Sockets offline');
            });
        }

        // Validar el token del localstorage
        const validarJWT = async () => {

            const token = localStorage.getItem('token') || '';

            const resp = await fetch(url + "/auth", {
                headers: { 'x-token': token }
            });

            const { user: userDB, token: tokenDB } = await resp.json();
            localStorage.setItem('token', tokenDB);
            user.current = userDB;

            await conectarSocket();
        }

        validarJWT();
    }, [socket, url, user])

    return (
        <SocketContext.Provider value={{
            socket: socket.current,
            user: user.current,
            usersConnected: usersConnected,
            messages: messages
        }}>
            {children}
        </SocketContext.Provider>
    );
}

SocketProvider.propTypes = {
    children: PropTypes.node,
}