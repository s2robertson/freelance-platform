import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_PROJECTS } from "../../utils/queries";

const ProjectView = () => {
  // Getting the projectId
  const { projectId } = useParams();

  // Creating state to hold the project data
  const [project, setProject] = useState(null);

  // Using useQuery to fetch the project data
  const { loading, data } = useQuery(QUERY_ALL_PROJECTS, {
    variables: { projectId },
  });

  // Setting the project data once it is fetched
  useEffect(() => {
    if (data) {
      setProject(data.project);
    }
  }, [data]);

  if (loading) {
    // Loading message while the data is being fetched
    return <div>Loading...</div>;
  }

  if (!project) {
    // If project data is not available, display a message indicating the project was not found
    return <div>Project not found.</div>;
  }

  return (
    // Rendering all the properties
    <div>
      <h2>{project.name}</h2>
      <p>{project.description}</p>
      <p>Owner: {project.owner.name}</p>
      <p>Freelancers:</p>
      {/* <ul>
        {project.freelancers.map((freelancer) => (
          <li key={freelancer._id}>{freelancer.name}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default ProjectView;

// import React from 'react';

// const ViewProject = () => {
//   const project = {
//     _id: '1',
//     name: 'Sample Project',
//     description: 'This is a sample project ',
//     owner: 'owner1',
//     freelancers: ['Freelancer 1', 'Freelancer 2', 'Freelancer 3'],
//     dueDate: '2023-07-31',
//     budget: 5000,
//     servicesNeeded: ['Service 1', 'Service 2', 'Service 3'],
//   };

//   return (
//     <div>
//       <h2>Project Details</h2>
//       <p>Name: {project.name}</p>
//       <p>Description: {project.description}</p>
//       <p>Owner: {project.owner}</p>
//       <p>Freelancers: {project.freelancers.join(', ')}</p>
//       <p>Due Date: {project.dueDate}</p>
//       <p>Budget: ${project.budget}</p>
//       <p>Services Needed: {project.servicesNeeded.join(', ')}</p>
//     </div>
//   );
// };
