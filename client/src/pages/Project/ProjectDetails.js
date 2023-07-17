import { useState } from "react";

import MessageForm from "../../components/MessageForm";
import { loggedIn } from "../../utils/auth";

function ProjectDetails({ project, editCallback }) {
  const [showMessageForm, setShowMessageForm] = useState(false);

  let editButton = null;
  let messageButton = null;
  if (editCallback) {
    editButton = (
      <button
        type="button"
        onClick={editCallback}
        className="border-2 p-1"
      >
        Edit
      </button>
    );
  } else if (loggedIn()) {
    messageButton = (
      <button
        type="button"
        onClick={() => setShowMessageForm(true)}
        className="border-2 p-1"
      >
        Message this project's owner
      </button>
    )
  }

  return (
    <div>
      <h2>Project Details</h2>
      {editButton}
      {messageButton}
      <p>Name: {project.name}</p>
      <p>Description: {project.description}</p>
      <p>Owner: {project.owner.username}</p>
      <p>Freelancers: {project.freelancers.map(user => user.username).join(', ')}</p>
      <p>Due Date: {project.dueDate}</p>
      <p>Budget: ${project.budget}</p>
      <p>Services Needed: {project.servicesNeeded.map(service => service.name).join(', ')}</p>
      {showMessageForm ? (
        <MessageForm receiver={[project.owner]} onFinished={() => setShowMessageForm(false)} />
      ) : null}
    </div>
  );
}

export default ProjectDetails;