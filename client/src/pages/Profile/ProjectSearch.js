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
      <div className="ml-20">
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
          className="border-solid border-gray-800 border rounded-md py-2 px-4 mt-2 text-white bg-gray-600"
        >
          Run Search
        </button>

      </div>
      <div className={`block max-w-sm p-8 my-10 ml-16 bg-white border border-gray-200 rounded-lg shadow-xl ${showProjects ? 'visible' : 'hidden'}`}>
        <p>{error ? JSON.stringify(error.message).replace(/["]+/g, '') : null}</p>
        {projectsByService ? (
          projectsByService.length === 0 ? (
            <p>No projects found</p>
          ) : (
            <ul className="border-2 divide-y-2 mt-4">
              {projectsByService.map(project =>
                <li key={project._id}>
                  <p><Link to={`/project/${project._id}`}>{project.name}</Link></p>
                  <p>{project.description}</p>
                  <p>{project.servicesNeeded.map(skill => skill.name).join(', ')}</p>
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