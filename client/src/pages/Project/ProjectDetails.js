function ProjectDetails({ project }) {
  return (
    <div>
      <h2>Project Details</h2>
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