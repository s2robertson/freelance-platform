import React, { useState } from 'react';

import ProjectForm from './ProjectForm';

import Nav from '../../components/Nav';
import ProjectList from '../../components/ProjectList';

// replace with useParams/useQuery
const project = {
  name: 'My project',
  description: 'Enter a description',
  dueDate: '',
  budget: '',
  servicesNeeded: []
}

function Projects() {
  const [editing, setEditing] = useState(true);

  return (
    <>
      {editing ? (
        <ProjectForm project={project} />
      ) : null}
    </>
  )
}

export default Projects;