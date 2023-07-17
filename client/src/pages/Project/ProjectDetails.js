function ProjectDetails({ project, editCallback }) {
  const editButton = editCallback ? (
    <button
      type="button"
      onClick={editCallback}
      className="border-2 p-1"
    >
      Edit
    </button>
  ) : null;
  return (
    <div>
      <h2>Project Details</h2>
      {editButton}
      <p>Name: {project.name}</p>
      <p>Description: {project.description}</p>
      <p>Owner: {project.owner.username}</p>
      <p>Freelancers: {project.freelancers.map(user => user.username).join(', ')}</p>
      <p>Due Date: {project.dueDate}</p>
      <p>Budget: ${project.budget}</p>
      <p>Services Needed: {project.servicesNeeded.map(service => service.name).join(', ')}</p>
    </div>
  );
}

export default ProjectDetails;