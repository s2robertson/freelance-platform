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
        <div>
            <h2>Your projects:</h2>
            <button
                type='button'
                onClick={() => setViewingList(false)}
                className='border-2 p-1'
            >
                Create new project
            </button>
            <ProjectsList />
        </div>
    ) : (
        <ProjectForm 
            project={emptyProject}
            onSubmit={(values) => addProject({ variables: values })}
            onFinished={() => setViewingList(true)}
        />
    )
}

export default ProjectsPage;