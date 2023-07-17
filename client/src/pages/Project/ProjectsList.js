import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import { QUERY_ALL_PROJECTS } from "../../utils/queries";

const ProjectsList = () => {
  // Using useQuery to fetch the project data
  const { loading, data, error } = useQuery(QUERY_ALL_PROJECTS);

  if (loading) {
    // Loading message while the data is being fetched
    return <div>Loading...</div>;
  } else if (error || !data.projects) {
    // If project data is not available, display a message indicating the project was not found
    console.log('Error fetching projects: ', error, data?.projects);
    return <div>Error fetching projects.</div>;
  }

  return (
    data.projects.length === 0 ? (
      <p>You currently have no projects</p>
    ) : (
      <ul className="border-2 divide-y-2 mt-1">
        {data.projects.map(project => (
          <li key={project._id} className="p-1">
            <h3><Link to={`/project/${project._id}`}>{project.name}</Link></h3>
            <p>{project.description}</p>
            <p>Services needed: {project.servicesNeeded.map(service => service.name).join(', ')}</p>
          </li>
        ))}
      </ul>
  ));
};

export default ProjectsList;

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


// };