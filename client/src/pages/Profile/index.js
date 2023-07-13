import React, { useState } from 'react';

import ProfileForm from './ProfileForm';

// import Header from '../../components/';
import Nav from '../../components/Nav';
import ProjectList from '../../components/ProjectList';
import SearchBar from '../../components/SearchBar'; // unsure if we need this

// replace with useQuery
const user = {
  _id: 'abc',
  username: 'john.doe',
  email: 'john.doe@example.com',
  description: 'No description yet',
  skills: []
};

function Profile() {
  const [editing, setEditing] = useState(true);
  return (
    <>
      {editing ? (
        <ProfileForm user={user} />
      ) : null}
    </>
  )
}

export default Profile;