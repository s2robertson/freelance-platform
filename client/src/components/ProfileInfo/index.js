import { useState } from "react";

import MessageForm from "../MessageForm";
import { loggedIn } from "../../utils/auth";

function ProfileInfo({ user, startEdit = null }) {
    const [showMessageForm, setShowMessageForm] = useState(false);

    let editButton = null;
    let messageButton = null;
    if (startEdit) {
        editButton = (
            <button
                onClick={startEdit}
                className="border-solid border-2 p-1"
            >
                Edit
            </button>
        )
    } else if (loggedIn()) {
        messageButton = (
            <button
                onClick={() => setShowMessageForm(true)}
                className="border-solid border-2 p-1"
            >
                Message this user
            </button>
        )
    }

    return (
        <div className="mb-2">
            <h2 className="text-2xl font-bold">{user.username}</h2>
            {editButton}
            {messageButton}
            <p>{user.profileDescription}</p>
            {user.skills && user.skills.length > 0 ? (
                <>
                    <h3>Skills:</h3>
                    <ul className="list-disc">
                        {user.skills.map(skill => (
                            <li key={skill._id}>{skill.name}</li>
                        ))}
                    </ul>
                </>
            ) : null}
            {showMessageForm ? (
                <MessageForm receiver={user} />
            ) : null}
        </div>
    )
}

export default ProfileInfo;