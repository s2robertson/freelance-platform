import { useLazyQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { useState } from 'react';

import { QUERY_PROJECTS_BY_SERVICE } from "../../utils/queries";

function ProjectSearch({ user }) {
  const [loadSearch, { data, previousData, error }] = useLazyQuery(QUERY_PROJECTS_BY_SERVICE);
  const [showProjects, setShowProjects] = useState(false)

  let projectsByService = data?.projectsByService;
  if (!projectsByService && previousData?.projectsByService) {
    projectsByService = previousData.projectsByService;
  }

  const toggleProjects = () => {
    setShowProjects(true);
  }

  return (
    <>
      <div className="max-w-4xl text-center">
        <h3>Search for projects needing my skills:</h3>
        <button
          onClick={() => {
            loadSearch({
              variables: {
                services: user.skills.map(skill => skill._id)
              }
            });
            toggleProjects();
          }
          }
          className="border-solid border-gray-800 border rounded-md py-2 px-4 mt-2 text-white bg-gray-600 hover:bg-gray-700"
        >
          Run Search
        </button>

      </div>
      <div className={`block ml-16 max-w-4xl justify-center p-8 my-10 bg-gray-100 border border-gray-300 rounded-lg shadow-xl ${showProjects ? 'visible' : 'hidden'}`}>
        <p>{error ? JSON.stringify(error.message).replace(/["]+/g, '') : null}</p>
        {projectsByService ? (
          projectsByService.length === 0 ? (
            <p>No projects found</p>
          ) : (
            <ul className="my-5 -ml-1 border rounded-md divide-y-2 p-5 bg-white">
              {projectsByService.map(project =>
                <li key={project._id}>
                  <h4 className="border-solid w-20 text-center border-gray-200 border rounded-md py-1 px-3 m-3 text-black bg-gray-200 hover:bg-gray-300"><Link to={`/project/${project._id}`}>{project.name}</Link></h4>
                  <hr className="mb-4"></hr>
                  <div className="mb-5">
                    <h4 className="bg-gray-100 font-bold">Project Description</h4>
                    <hr className="mb-2"></hr>
                    <p className="italic ml-1 bg-gray-50">{project.description}</p>
                  </div>

                  <h4 className="bg-gray-100 font-bold">Required Skills</h4>
                  <hr className="mb-2"></hr>
                  <li className="italic ml-1 bg-gray-50">{project.servicesNeeded.map(skill => skill.name).join(', ')}</li>
                </li>
              )}
            </ul>
          )
        ) : null}
      </div>
    </>
  );
}

export default ProjectSearch;