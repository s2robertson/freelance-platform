import { useState } from "react";

import FreelancerSearch from "./FreelancerSearch";
import MessageForm from "../../components/MessageForm";

function ProjectDetails({ project, editCallback, currentUser }) {
  const [showMessageForm, setShowMessageForm] = useState(false);

  let editButton = null;
  let searchComponent = null;
  let messageButton = null;
  if (editCallback) {
    editButton = (
      <button
        type="button"
        onClick={editCallback}
        className="border border-solid border-gray-300 bg-blue-500 py-1 px-3 my-3 text-white hover:bg-blue-600 rounded-md"
      >
        Edit Project
      </button>
    );
    searchComponent = <FreelancerSearch project={project} />
  } else if (currentUser) {
    messageButton = (
      <button
        type="button"
        onClick={() => setShowMessageForm(true)}
        className="border border-solid border-gray-300 bg-green-500 py-1 px-3 my-3 text-white hover:bg-green-600 rounded-md"
      >
        Message this project's owner
      </button>
    )
  }

  return (
    <>
      <div className="block ml-16 max-w-4xl justify-center p-8 my-10 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
        <h2 className="underline font-bold">Project Details</h2>
        {editButton}
        {messageButton}

        <div className="bg-white mb-2 p-2">
          <p>Name: <span className="text-gray-400">{project.name}</span></p>
          <p>Description: <span className="text-gray-400">{project.description}</span></p>
          <p>Owner: <span className="text-gray-400">{project.owner.username}</span></p>
        </div>

        <div className="bg-white mb-2 p-2">
          <p>Freelancers: <span className="text-gray-400">{project.freelancers.map(user => user.username).join(', ')}</span></p>
          <p>Due Date: <span className="text-gray-400">{project.dueDate}</span></p>
          <p>Budget: <span className="text-gray-400">${project.budget}</span></p>
        </div>

        <div className="bg-white mb-2 p-2">
          <p>Services Needed: <span className="text-gray-400">{project.servicesNeeded.map(service => service.name).join(', ')}</span></p>
          <p><span className="font-bold italic">{project.seekingFreelancers ? 'Currently' : 'Not '} seeking freelancers</span></p>
        </div>

      </div>
      <div className=" ml-14 max-w-4xl text-center">
        {searchComponent}
        {showMessageForm ? (
          <MessageForm receiver={[project.owner]} onFinished={() => setShowMessageForm(false)} />
        ) : null}
      </div>
    </>
  );
}

export default ProjectDetails;