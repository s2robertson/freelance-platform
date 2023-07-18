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

  return (
    <>
      <div className="max-w-4xl text-left ml-16 -mb-3 -mt-3">
        <h3>Search for projects needing my skills:</h3>
        <button
          onClick={() => {
            loadSearch({
              variables: {
                services: user.skills.map(skill => skill._id)
              }
            });
            setShowProjects(!showProjects)
          }
          }
          className="border-solid border-gray-800 border rounded-md py-2 px-4 mt-2 text-white bg-gray-600 hover:bg-gray-700"
        >
          {showProjects ? (<p>Hide projects</p>) : (<p>Run search</p>)}
        </button>

      </div>
      <div className={`block ml-16 max-w-4xl justify-center p-8 my-10 bg-gray-100 border border-gray-300 rounded-lg shadow-xl ${showProjects ? 'visible' : 'hidden'}`}>
        <p>{error ? JSON.stringify(error.message).replace(/["]+/g, '') : null}</p>
        {projectsByService ? (
          projectsByService.length === 0 ? (
            <p>No projects found</p>
          ) : (
            <ul className="my-5 -ml-1 rounded-md divide-y-2 p-">
              <p className="text-lg underline -mt-5 mb-6">Relevant Projects: </p>
              {projectsByService.map((project, i) =>
                <div className="">
                  <p className="-ml-3 font-bold">{i + 1}.</p>
                  <li className="border mb-5 bg-white rounded-md p-3" key={project._id}>
                    <button className="border-solid w-auto text-center border-gray-200 border rounded-md py-1 px-3 m-3 text-black bg-gray-200 hover:bg-gray-300"><Link to={`/project/${project._id}`}>{project.name}</Link></button>
                    <hr className="mb-4"></hr>
                    <div className="mb-5">
                      <h4 className=" font-bold ml-1">Project Description</h4>
                      <hr className="mb-2"></hr>
                      <p className="italic ml-1">{project.description}</p>
                    </div>

                    <h4 className="font-bold ml-1">Required Skills</h4>
                    <hr className="mb-2"></hr>
                    <li className="italic ml-1 bg-gray-50">{project.servicesNeeded.map(skill => skill.name).join(', ')}</li>
                  </li>
                </div>
              )}
            </ul>
          )
        ) : null}
      </div>
    </>
  );
}

export default ProjectSearch;