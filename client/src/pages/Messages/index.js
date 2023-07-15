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
        return <p>Loading...</p>
    } else if (!currentUser) {
        return <p>Not logged in</p>
    } else if (error) {
        return <p>Error fetching messages</p>
    }

    if (data.messages && data.messages.length > 0) {
        if (currentMessage) {
            return (
                <MessageView 
                    message={currentMessage}
                    onClose={() => setCurrentMessage(null)}
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
        return <h2>You currently have no messages</h2>;
    }
}

export default MessagesPage;