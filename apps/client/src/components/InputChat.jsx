import { useRef } from "react";
import PropTypes from 'prop-types'
import "../styles/InputChat.css";

InputChat.propTypes = {
    socket: PropTypes.object,
    user: PropTypes.object,
    token: PropTypes.string
}

export default function InputChat({ socket, user, token }) {

    let message = useRef(null);

    return (
        <form id="input-chat" onSubmit={async (e) => {
            e.preventDefault();

            let sendedMessage = message.current.value;

            let body = {
                uid: user.uid,
                name: user.name,
                message: sendedMessage
            }

            await fetch(`${import.meta.env.VITE_API_URL}/api/chat/67d98e8e58dabf3d42284ce1`, {
                method: "PATCH",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                },
                Authorization: token
            }).then((res) => res.json())
                .then((response) => {
                    socket.emit('enviar-mensaje', { message: response.message });
                    message.current.value = "";
                })
        }}>
            <input ref={message} type="text" placeholder="Message" maxLength="200"/>
            <button type="submit">Send</button>
        </form>
    )
}
