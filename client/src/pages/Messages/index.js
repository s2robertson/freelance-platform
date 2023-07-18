import { useState } from "react";
import { useQuery } from "@apollo/client";

import { QUERY_MESSAGES } from "../../utils/queries";
import { getCurrentUser } from "../../utils/auth";

import MessageView from './MessageView';
import MessageList from "./MessageList";

function MessagesPage() {
    const { data, loading, error } = useQuery(QUERY_MESSAGES);
    const [currentMessage, setCurrentMessage] = useState(null);
    const currentUser = getCurrentUser();

    if (loading) {
        return (
      <div className="block max-w-sm p-8 mt-20 mb-10 ml-16 bg-white border border-gray-200 rounded-lg shadow-xl">
        Loading...
      </div>
    )
    } else if (!currentUser) {
        return (
      <div className="block max-w-sm p-8 mt-20 mb-10 ml-16 bg-white border border-gray-200 rounded-lg shadow-xl">
        Not logged in!
      </div>
    )
    } else if (error) {
        return (
      <div className="block max-w-sm p-8 mt-20 mb-10 ml-16 bg-white border border-gray-200 rounded-lg shadow-xl">
        Error fetching messages
      </div>
    )
    }

    if (data.messages && data.messages.length > 0) {
        if (currentMessage) {
            return (
                <MessageView 
                    message={currentMessage}
                    onClose={() => setCurrentMessage(null)}
                    currentUser={currentUser}
                />
            );
        } else {
            return (
                <MessageList 
                    messages={data.messages}
                    onOpenMessage={setCurrentMessage}
                    currentUser={currentUser}
                />
            )
        }
    } else {
        return <div className="block max-w-4xl p-8 mt-14 rounded-2xl mb-10 ml-16 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">You currently have no messages</div>;
    }
}

export default MessagesPage;