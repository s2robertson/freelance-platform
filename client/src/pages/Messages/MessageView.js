import { useState } from "react";

import MessageForm from "../../components/MessageForm";

import stringifyReceiver from "./stringifyReceiver"

function MessageView({ message, onClose, currentUser }) {
  const [showMessageForm, setShowMessageForm] = useState(false);

  return (
    <div className="ml-16 mt-16">
      <div>
        {/* control buttons */}
        <button
          onClick={onClose}
          className="border border-solid border-gray-300 bg-red-500 py-3 px-3 my-3 text-white hover:bg-red-600 rounded-md"
        >
          Go Back
        </button>
        {currentUser?._id !== message.sender._id ? (
          <button
            onClick={() => setShowMessageForm(!showMessageForm)}
            className="border border-solid border-gray-300 bg-blue-500 py-3 px-3 my-3 text-white hover:bg-blue-600 rounded-md"
          >
            Reply
          </button>
        ) : null}
      </div>
      <div className="block max-w-4xl justify-center p-8 my-5 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
        <div className="bg-white p-3">
          <div>
            {/* message header */}
            <p className="italic text-gray-400">Sender: <span className="text-black">{message.sender.username}</span></p>
            <p className="italic text-gray-400">Receiver: <span className="text-black">{stringifyReceiver(message.receiver)}</span></p>
            <hr className="mb-4"></hr>
          </div>
          <p className="font-bold underline">Subject: {message.subject}</p>
          <p>{message.text}</p>
          
        </div>
      </div>
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