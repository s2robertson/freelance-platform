import { useLazyQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { useState } from 'react'

import { QUERY_USERS_BY_SKILL } from "../../utils/queries";
import { QUERY_USERS } from "../../utils/queries";

function FreelancerSearch({ project }) {
  const [loadSearch, { data, error }] = useLazyQuery(QUERY_USERS_BY_SKILL);
  const [searchVisible, setSearchVisible] = useState(false);

  if (error) {
    console.error(error);
  }
  const usersBySkill = data?.usersBySkill;

  const handleSearchEvent = () => {
    setSearchVisible(true);
  }

  return (
    <>
      <h3>Search for users with the skills you need:</h3>
      <button
        type="button"
        onClick={() => {
          loadSearch({
            variables: {
              skills: project.servicesNeeded.map(skill => skill._id)
            }
          });
          handleSearchEvent();
        }}
        className="border-solid border-gray-800 border rounded-md py-2 px-4 mt-2 text-white bg-gray-600 hover:bg-gray-700"
      >
        Run Search
      </button>
      <div className={`block max-w-4xl justify-center p-8 my-10 text-left bg-gray-100 border border-gray-300 rounded-lg shadow-xl ${searchVisible ? 'visible' : 'hidden'}`}>
        {usersBySkill ? (
          usersBySkill.length === 0 ? (
            <p>No users found</p>
          ) : (
            <ul className="border divide-y-2 mt-4 bg-white p-2 rounded-md">
              {usersBySkill.map(user =>
                <li key={user._id}>
                  <button className="border-solid border-gray-200 border rounded-md py-1 px-3 m-3 text-white bg-gray-200 hover:bg-gray-300">
                    <p><Link to={`/profile/${user._id}`}><span className="text-black">{user.username}</span></Link></p>
                  </button>
                  <hr></hr>
                  <p><span className="font-bold">Skills:</span> <span className="text-gray-400 italic">{user.skills.map(skill => skill.name).join(', ')}</span></p>
                </li>
              )}
            </ul>
          )
        ) : <p className="bg-white">No users found</p>}
      </div>
    </>
  )
}

export default FreelancerSearch;