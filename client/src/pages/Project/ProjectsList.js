import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import { QUERY_ALL_PROJECTS } from "../../utils/queries";

const ProjectsList = () => {
  // Using useQuery to fetch the project data
  const { loading, data, error } = useQuery(QUERY_ALL_PROJECTS);

  if (loading) {
    // Loading message while the data is being fetched
    return <div className="block ml-16 max-w-4xl justify-center p-8 my-5 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">Loading...</div>;
  } else if (error || !data.projects) {
    // If project data is not available, display a message indicating the project was not found
    console.log('Error fetching projects: ', error, data?.projects);
    return <div className="block ml-16 max-w-4xl justify-center p-8 my-5 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">Error fetching projects.</div>;
  }

  return (
    data.projects.length === 0 ? (
      <p className="block ml-16 max-w-4xl justify-center p-8 my-5 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">You currently have no projects</p>
    ) : (
      <ul className="block ml-16 max-w-4xl justify-center p-8 my-5 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
        <div className="bg-white rounded-md p-2">
          {data.projects.map(project => (
            <>
              <li key={project._id} className="p-1 mb-7">
                <button className="border-solid w-auto text-center border-gray-200 border rounded-md py-1 px-3 mb-3 mt-1 text-black bg-gray-200 hover:bg-gray-300"><Link to={`/project/${project._id}`}>{project.name}</Link></button>
                <hr></hr>
                <p><span className="font-bold">Description: </span>{project.description}</p>
                {project.servicesNeeded.length ? (<p><span className="font-bold">Services needed: </span>{project.servicesNeeded.map(service => service.name).join(', ')}</p>) : (<p><span className="font-bold">Services needed: </span>None!</p>)}
              </li>
              <hr></hr>
            </>
          ))}
        </div>
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
