import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom';

import ProjectDetails from './ProjectDetails';
import ProjectForm from './ProjectForm';
import { QUERY_PROJECT } from '../../utils/queries';
import { UPDATE_PROJECT } from '../../utils/mutations';
import { getCurrentUser } from '../../utils/auth';

function Projects() {
  const { projectId } = useParams();
  // console.log('projectId: ', projectId)
  const { data, loading, error } = useQuery(QUERY_PROJECT, { variables: { projectId } });
  // const [updateProject] = useMutation(UPDATE_PROJECT);

  // const [editing, setEditing] = useState(false);

  if (loading) {
    return <div>Loading...</div>
  } else if (error) {
    console.error(error);
    return <div>Error fetching project.</div>
  }

  return <ProjectDetails project={data.project} />

  // return (
  //   <>
  //     {editing ? (
  //       <ProjectForm project={project} />
  //     ) : null}
  //   </>
  // )
}

export default Projects;