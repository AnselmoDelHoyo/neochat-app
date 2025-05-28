import { useRef } from "react";
import PropTypes from 'prop-types'

InputChat.propTypes = {
    socket: PropTypes.object,
    user: PropTypes.object,
    token: PropTypes.string
}

export default function InputChat({ socket, user, token }) {

    let message = useRef(null);

    return (
        <form onSubmit={async (e) => {
            e.preventDefault();

            let sendedMessage = message.current.value;

            let body = {
                uid: user.uid,
                name: user.name,
                message: sendedMessage
            }

            await fetch("http://localhost:8080/api/chat/67d98e8e58dabf3d42284ce1", {
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
            <input ref={message} type="text" placeholder="Message"/>
            <button type="submit">Send</button>
        </form>
    )
}
