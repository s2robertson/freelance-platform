import React, { useState } from 'react';

import ProjectList from '../components/ProjectList';
import SearchBar from '../components/SearchBar';

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