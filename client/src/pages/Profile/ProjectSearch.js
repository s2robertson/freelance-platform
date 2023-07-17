import { useLazyQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import { QUERY_PROJECTS_BY_SERVICE } from "../../utils/queries";

function ProjectSearch({ user }) {
    const [loadSearch, { data, previousData, error }] = useLazyQuery(QUERY_PROJECTS_BY_SERVICE);
    let projectsByService = data?.projectsByService;
    if (!projectsByService && previousData?.projectsByService) {
        projectsByService = previousData.projectsByService;
    }
    
    return (
        <>
            <h3>Search for projects needing my skills:</h3>
            <button
                onClick={() => loadSearch({
                    variables: {
                        services: user.skills.map(skill => skill._id)
                    }
                })}
                className="border-2 p-1"
            >
                Run Search
            </button>
            <p>{error ? JSON.stringify(error.message).replace(/["]+/g, '') : null}</p>
            {projectsByService ? (
                projectsByService.length === 0 ? (
                    <p>No projects found</p>
                ) : (
                    <ul className="border-2 divide-y-2 mt-4">
                        {projectsByService.map(project => 
                            <li key={project._id}>
                                <p><Link to={`/project/${project._id}`}>{project.name}</Link></p>
                                <p>{project.servicesNeeded.map(skill => skill.name).join(', ')}</p>
                            </li>
                        )}
                    </ul>
                )
            ) : null}
        </>
    );
}

export default ProjectSearch;