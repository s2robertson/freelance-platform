// /* eslint-disable jsx-a11y/anchor-is-valid */
// import React, { useState } from "react";
// import { loggedIn, getToken, setToken, clearToken, isTokenExpired, authMiddleware } from '../../utils/auth';
// import { Link } from 'react-router-dom';
// function Nav() {
//   const [isActive, setActive] = useState({
//     profile: false,
//     dashboard: false,
//     projects: false,
//   })
//   function showNav() {
//     return (
//       <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-gray-200 text-sm py-4">
//         <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
//           <div className="flex items-center justify-between">
//             <a className="flex-none text-2xl font-bold text-gray-700" href="#">Freelance Platform</a>
//           </div>
//           <div id="navbar-dark" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block">
//             <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:pl-5">
//               <ul className="flex flex-wrap -mb-px">
//                 <li className="mr-2">
//                   <Link
//                     to="/profile"
//                     className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300">Profile
//                   </Link>
//                 </li>
//                 <li className="mr-2">
//                   <Link
//                     to="/"
//                     className="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg">Dashboard
//                   </Link>
//                 </li>
//                 <li className="mr-2">
//                   <Link
//                     to="/projects"
//                     className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300">Projects
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to='/messages'
//                     className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300">Messages
//                   </Link>
//                 </li>
//                 {/* depending on whether the user is logged in or not, render 'login' or 'logout' in the nav bar */}
//                 {loggedIn() ? (
//                   <li className="mr-2">
//                     <Link
//                       to="/logout"
//                       className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300">Logout
//                     </Link>
//                   </li>
//                 ) : (
//                   <li className="mr-2">
//                     <Link
//                       to="/login"
//                       className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300">Login
//                     </Link>
//                   </li>
//                 )}
//                 {/* conditional rendering of the 'signup' tab -> only appears if the user is not already logged in */}
//                 <li className="mr-2">
//                   {!loggedIn() ? (<Link
//                     to="/signup"
//                     className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300">Sign Up!
//                   </Link>) : null}
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </nav>
//       </header >
//     )
//   }
//   return (
//     showNav()
//   )
// }
// export default Nav;
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  loggedIn,
  clearToken,
} from "../../utils/auth";
function Nav() {
  const location = useLocation();
  const [isActive, setActive] = useState({
    profile: false,
    // dashboard: false,
    projects: false,
  });
  const handleSetActive = (tab) => {
    setActive({
      ...isActive,
      [tab]: true,
    });
  };

  function showNav() {
    return (
      <>
        <style>
          {`
      .active {
        color: grey;
      }
    `}
        </style>
        <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-sky-950 text-white text-sm py-4">
          <nav
            className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between"
            aria-label="Global"
          >
            <div className="flex items-center justify-between">
              <a
                className="flex-none text-2xl font-bold font-serif text-stone-400"
                href="/profile"
              >
                Freelance Platform
              </a>
            </div>
            <div
              id="navbar-dark"
              className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block"
            >
              <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:pl-5">
                <ul className="flex flex-wrap -mb-px">
                  <li className="mr-2">
                    <Link
                      to="/profile"
                      className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 font-extrabold ${location.pathname === "/profile" ? "active" : ""
                        }`}
                    >
                      Profile
                    </Link>
                  </li>
                  {/* <li className="mr-2">
                    <Link
                      to="/"
                      className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300"
                    >
                      Dashboard
                    </Link>
                  </li> */}
                  <li className="mr-2">
                    <Link
                      to="/projects"
                      className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 ${location.pathname === "/projects" ? "active" : ""
                        }`}
                    >
                      Projects
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/messages"
                      className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 ${location.pathname === "/messages" ? "active" : ""
                        }`}
                    >
                      Messages
                    </Link>
                  </li>
                  {/* depending on whether the user is logged in or not, render 'login' or 'logout' in the nav bar */}
                  {loggedIn() ? (
                    <li className="mr-2">
                      <a
                        href="#"
                        className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 ${location.pathname === "/logout" ? "active" : ""
                          }`}
                        onClick={() => {
                          clearToken();
                          alert('Goodbye!');
                          window.location.replace('/login');
                        }}
                      >
                        Logout
                      </a>
                    </li>
                  ) : (
                    <li className="mr-2">
                      <Link
                        to="/login"
                        className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 ${location.pathname === "/login" ? "active" : ""
                          }`}
                      >
                        Login
                      </Link>
                    </li>
                  )}
                  {/* conditional rendering of the 'signup' tab -> only appears if the user is not already logged in */}
                  <li className="mr-2">
                    {!loggedIn() ? (
                      <Link
                        to="/signup"
                        className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 ${location.pathname === "/signup" ? "active" : ""
                          }`}
                      >
                        Sign Up!
                      </Link>
                    ) : null}
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
      </>
    );
  }
  return showNav();
}
export default Nav;

