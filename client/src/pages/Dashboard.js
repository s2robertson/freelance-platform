import React, { useState } from 'react';

import ProjectList from '../components/ProjectList';

function Dashboard() {
  const [toggleModal, setToggleModal] = useState(true);

  const showModal = () => {
    setToggleModal(!toggleModal);
  }

  return (
    <>

    </>
  )
}

export default Dashboard;