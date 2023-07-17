import { useState } from "react";

import MessageForm from "../../components/MessageForm";

import stringifyReceiver from "./stringifyReceiver"

function MessageView({ message, onClose, currentUser }) {
    const [showMessageForm, setShowMessageForm] = useState(false);

    return (
        <div>
            <div>
                {/* control buttons */}
                <button 
                    onClick={onClose}
                    className="border-2 p-1"
                >
                    Go Back
                </button>
                {currentUser?._id !== message.sender._id ? (
                    <button
                        onClick={() => setShowMessageForm(true)}
                        className='border-2 p-1'
                    >
                        Reply
                    </button>
                ) : null}
            </div>
            <div>
                {/* message header */}
                <p>Sender: {message.sender.username}</p>
                <p>Receiver: {stringifyReceiver(message.receiver)}</p>
            </div>
            <p>Subject: {message.subject}</p>
            <p>{message.text}</p>
            {showMessageForm ? (
                <MessageForm 
                    receiver={[message.sender]}
                    onFinished={() => setShowMessageForm(false)}
                />
            ) : null}
        </div>
    )
}

export default MessageView;