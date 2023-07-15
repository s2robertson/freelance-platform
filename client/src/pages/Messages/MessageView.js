import stringifyReceiver from "./stringifyReceiver"

function MessageView({ message, onClose }) {
    return (
        <div>
            <div>
                {/* control buttons */}
                <button onClick={onClose}>
                    Go Back
                </button>
                <button>Reply</button>
            </div>
            <div>
                {/* message header */}
                <p>Sender: {message.sender.username}</p>
                <p>Receiver: {stringifyReceiver(message.receiver)}</p>
            </div>
            <p>{message.text}</p>
        </div>
    )
}

export default MessageView;