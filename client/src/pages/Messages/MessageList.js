
import stringifyReceiver from "./stringifyReceiver";

function MessageList({ messages, currentUser, onOpenMessage }) {
  return (
    <>
      <h2 className='text-5xl mb-5 ml-16 mt-16 font-bold underline'>Messages:</h2>
      <ul
        className="block max-w-4xl p-8 mt-14 mb-10 ml-16 bg-gray-100 border border-gray-300 rounded-lg shadow-xl"
      >
        {messages.map((message, i) => (
          <>
            <p className="-ml-3 font-bold">{i + 1}. </p>
            <hr className="-ml-3 -mr-3 mb-2"></hr>
            <li
              key={message._id}
              onClick={() => onOpenMessage(message)}
              className="pt-3 pl-3 pb-1 mb-4 rounded-md border bg-white message"
            >
              <p className="italic">
                <span className="text-gray-400">Sent by: </span>
                {message.sender._id === currentUser._id ?
                  'You' :
                  message.sender.username
                }
              </p>
              <p className="mb-2 italic"><span className="text-gray-400">Recipients: </span>{stringifyReceiver(message.receiver)}</p>
              <hr></hr>
              <p>{message.subject}</p>
            </li>
          </>
        ))}
      </ul>
    </>
  );
}

export default MessageList;