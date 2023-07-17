import { useLazyQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import { QUERY_USERS_BY_SKILL } from "../../utils/queries";

function FreelancerSearch({ project }) {
    const [loadSearch, { data, error }] = useLazyQuery(QUERY_USERS_BY_SKILL);
    if (error) {
        console.error(error);
    }
    const usersBySkill = data?.usersBySkill;

    return (
        <>
            <h3>Search for users with the skills you need:</h3>
            <button
                type="button"
                onClick={() => loadSearch({
                    variables: {
                        skills: project.servicesNeeded.map(skill => skill._id)
                    }
                })}
                className="border-2 p-1"
            >
                Run Search
            </button>
            {usersBySkill ? (
                usersBySkill.length === 0 ? (
                    <p>No users found</p>
                ) : (
                    <ul className="border-2 divide-y-2 mt-4">
                        {usersBySkill.map(user => 
                            <li key={user._id}>
                                <p><Link to={`/profile/${user._id}`}>{user.username}</Link></p>
                                <p>{user.skills.map(skill => skill.name).join(', ')}</p>
                            </li>
                        )}
                    </ul>
                )
            ) : null}
        </>
    )
}

export default FreelancerSearch;