import React, { useState } from 'react';
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import { QUERY_USER_BY_ID } from "../../utils/queries";
import { getCurrentUser } from '../../utils/auth';

import ProfileForm from './ProfileForm';
import ProfileDisplay from './ProfileDisplay';

import Nav from '../../components/Nav';
import ProjectList from '../../components/ProjectList';
import SearchBar from '../../components/SearchBar'; // unsure if we need this

// replace with useQuery
/*const user = {
  _id: 'abc',
  username: 'john.doe',
  email: 'john.doe@example.com',
  description: 'No description yet',
  skills: []
};*/

function Profile() {
  const { userId } = useParams();
  console.log(`Searching for userId ${userId}`);
  const { data, loading, error } = useQuery(QUERY_USER_BY_ID, {
    variables: { _id: userId }
  });

  const [editing, setEditing] = useState(false);
  const loggedInAs = getCurrentUser();
  const editCallback = (loggedInAs && data && loggedInAs._id === data.userById._id) ? (() => setEditing(true)) : null;

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>{JSON.stringify(error)}</div>
  }
  console.log(data);

  return (
    <>
      {editing ? (
        <ProfileForm user={data.userById} />
      ) : (
        <ProfileDisplay user={data.userById} startEdit={editCallback} />
      )}
    </>
  )
}

export default Profile;