/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { loggedIn } from '../../utils/auth';
import { Link } from 'react-router-dom';

function Nav() {
  const [isActive, setActive] = useState({
    profile: false,
    dashboard: false,
    projects: false,
  })

  function showNav() {
    return (
      <header class="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-gray-200 text-sm py-4">
        <nav class="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
          <div class="flex items-center justify-between">
            <a class="flex-none text-2xl font-bold text-gray-700" href="#">Freelance Platform</a>
          </div>
          <div id="navbar-dark" class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block">

            <div class="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:pl-5">
              <ul class="flex flex-wrap -mb-px">
                <li class="mr-2">
                  <a
                    href="#"
                    class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300">Profile</a>
                </li>
                <li class="mr-2">
                  <a href="#" class="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg" aria-current="page">Dashboard</a>
                </li>
                <li class="mr-2">
                  <a href="#" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300">Projects</a>
                </li>

                {/* depending on whether the user is logged in or not, render 'login' or 'logout' in the nav bar */}
                {loggedIn ? (
                  <li class="mr-2">
                    <a href="#" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300">Logout</a>
                  </li>
                ) : (
                  <li class="mr-2">
                    <a
                      href="#"
                      // onclick, clear the logout token (logout)
                      class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300">Login</a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header >
    )
  }

  return (
    showNav()
  )
}

export default Nav;