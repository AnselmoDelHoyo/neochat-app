
// import InputChat from "./InputChat";
import "../styles/Chat.css";

export default function Chat() {

  

  return (
    <main id="chat">
      <h1 className="chat-title">General Chat</h1>
      {/* <hr/>
      <article className="chat-messages">
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
      <InputChat socket={ socket.current } user={ user.current } token={ localStorage.getItem("token") } /> */}
    </main>
  )
}
