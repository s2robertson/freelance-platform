import { useState } from 'react';
import { useMutation } from '@apollo/client';

import ProjectsList from "./ProjectsList";
import ProjectForm from './ProjectForm';
import { ADD_PROJECT } from '../../utils/mutations';
import { QUERY_ALL_PROJECTS } from '../../utils/queries';

const emptyProject = {
  name: '',
  description: '',
  servicesNeeded: []
}

function ProjectsPage() {
  const [viewingList, setViewingList] = useState(true);
  const [addProject] = useMutation(ADD_PROJECT, {
    update(cache, { data }) {
      const oldData = cache.readQuery({ query: QUERY_ALL_PROJECTS });
      cache.writeQuery({
        query: QUERY_ALL_PROJECTS,
        data: {
          projects: oldData.projects.concat(data.addProject)
        }
      });
    }
  });

  return viewingList ? (
    <>
      <div className='mt-16 ml-16'>
        <h2 className='text-5xl mb-5 font-bold underline'>Your projects:</h2>
        <button
          type='button'
          onClick={() => setViewingList(false)}
          className="border border-solid border-gray-300 bg-blue-500 py-3 px-3 my-3 text-white hover:bg-blue-600 rounded-md"
        >
          Create new project
        </button>
      </div>
      <div className=''>
        <ProjectsList />
      </div>
    </>
  ) : (
    <ProjectForm
      project={emptyProject}
      onSubmit={(values) => addProject({ variables: values })}
      onFinished={() => setViewingList(true)}
    />
  )
}

export default ProjectsPage;