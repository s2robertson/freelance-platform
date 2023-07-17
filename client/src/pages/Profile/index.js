import React, { useState } from 'react';
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import { QUERY_USER_BY_ID } from "../../utils/queries";
import { getCurrentUser } from '../../utils/auth';

import ProfileForm from './ProfileForm';
import ProfileInfo from '../../components/ProfileInfo';

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
  let { userId } = useParams();
  // console.log(`Searching for userId ${userId}`);
  const loggedInAs = getCurrentUser();
  if (!userId && loggedInAs?._id) {
    userId = loggedInAs._id;
  }
  
  const { data, loading, error } = useQuery(QUERY_USER_BY_ID, {
    variables: { _id: userId }
  });

  const [editing, setEditing] = useState(false);
  const editCallback = (loggedInAs && data?.user && loggedInAs._id === data.user._id) ? (() => setEditing(true)) : null;

  if (loading) {
    return <div>Loading...</div>;
  } else if (error || !data.user) {
    return <div>Error fetching user</div>
  }
  // console.log(data);

  return (
    <>
      {editing ? (
        <ProfileForm user={data.user} onSubmit={(values) => console.log(values)} />
      ) : (
        <ProfileInfo user={data.user} startEdit={editCallback} />
      )}
    </>
  )
}

export default Profile;