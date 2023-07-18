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
        className="border border-solid border-gray-300 bg-blue-500 py-1 px-3 w-24 text-white hover:bg-blue-600 rounded-md"
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
    <>
      <h1 className='text-5xl ml-16 mt-16'>User Profile</h1>
      <div className="block max-w-4xl p-8 mt-14 rounded-2xl mb-10 ml-16 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
        <div className="bg-white p-5 my-5 -ml-1 rounded-md border">
          {/* USERNAME */}
          <h2 className="text-4xl font-bold mb-4">{user.username}</h2>

          {/* PROFILE DESCRIPTION */}
          <div className="mb-5">
            <h3 className="underline text-xl">Profile Description:</h3>
            <p className="ml-3 mt-4 text-gray-700 italic">{user.profileDescription}</p>
          </div>

          {/* PROFILE SKILLS */}
          <div className="mb-5">
            {user.skills && user.skills.length > 0 ? (
              <>

                <h3 className="underline text-xl">Skills:</h3>
                <ul className="list-disc">
                  <div className="ml-8">
                    {user.skills.map(skill => (
                      <li key={skill._id}>{skill.name}</li>
                    ))}
                  </div>
                </ul>
              </>
            ) : null}
          </div>

          {editButton}
          {messageButton}

          {showMessageForm ? (
            <MessageForm receiver={[user]} onFinished={() => setShowMessageForm(false)} />
          ) : null}
        </div>
      </div>
    </>
  )
}

export default ProfileInfo;