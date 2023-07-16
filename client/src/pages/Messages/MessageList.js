
import stringifyReceiver from "./stringifyReceiver";

function MessageList({ messages, currentUser, onOpenMessage }) {
    return (
        <>
            <h2>Messages:</h2>
            <ul
                className="border-2 divide-y-2 mt-4"
            >
                {messages.map(message => (
                    <li
                        key={message._id}
                        onClick={() => onOpenMessage(message)}
                        className="p-1"
                    >
                        <p>
                            Sent by: 
                            {message.sender._id === currentUser._id ? 
                                `You (Recipients: ${stringifyReceiver(message.receiver)})` :
                                message.sender.username
                            }
                        </p>
                        <p>{message.subject}</p>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default MessageList;