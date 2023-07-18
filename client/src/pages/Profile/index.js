import React, { useState } from 'react';
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import { QUERY_USER_BY_ID } from "../../utils/queries";
import { UPDATE_USER } from '../../utils/mutations';
import { getCurrentUser } from '../../utils/auth';

import ProfileForm from './ProfileForm';
import ProfileInfo from '../../components/ProfileInfo';
import ProjectSearch from './ProjectSearch';

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

  const [updateUser] = useMutation(UPDATE_USER, {
    update(cache, { data }) {
      cache.writeQuery({
        query: QUERY_USER_BY_ID,
        variables: { _id: userId },
        data: { user: data.updateUser }
      });
    }
  })

  const [editing, setEditing] = useState(false);
  const editCallback = (loggedInAs && data?.user && loggedInAs._id === data.user._id) ? (() => setEditing(true)) : null;

  if (loading) {
    return (
      <div className="block max-w-sm p-8 mt-20 mb-10 ml-16 bg-gray-100 border border-gray-200 rounded-lg shadow-xl">
        Loading...
      </div>
    )
  } else if (error || !data.user) {
    return (
      <div className="block max-w-sm p-8 mt-20 mb-10 ml-16 bg-gray-100 border border-gray-200 rounded-lg shadow-xl">
        Not logged in!
      </div>
    )
  }
  // console.log(data);
  let searchComponent = null;
  if (userId === loggedInAs?._id && !editing) {
    searchComponent = <ProjectSearch user={data.user} />;
  }

  return (
    <>
      {editing ? (
        <ProfileForm
          user={data.user}
          onSubmit={(values) => updateUser({
            variables: values
          })}
          onFinished={() => setEditing(false)}
        />
      ) : (
        <>
          <ProfileInfo user={data.user} startEdit={editCallback} />
          {searchComponent}
        </>
      )}
    </>
  )
}

export default Profile;