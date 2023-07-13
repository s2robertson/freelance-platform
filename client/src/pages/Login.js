import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import { login } from '../utils/auth';

import Nav from '../components/Nav';

function Login(props) {
  const [formState, setFormState] = useState({
    email: '',
    password: ''
  });

  //const [login, { error }] = useMutation(LOGIN);

  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const mutationResponse = await login({
  //       variables: { email: formState.email, password: formState.password },
  //     });
  //     const token = mutationResponse.data.login.token;
  //     Auth.login(token);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  return (
    <>
      <div className='p-32 m-20 bg-gray-300 rounded-3xl shadow-xl'>
        <div>
          <h1 className="text-3xl mb-10">Login</h1>
        </div>
        <form>
          <div className="mb-6">
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="example@email.com"
              required>
            </input>
          </div>
          <div className="mb-6">
            <label
              for="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your password
            </label>
            <input
              type="password"
              id="password"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required>
            </input>
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Login
          </button>
          <div className='mt-6 hover:font-bold'>
            <Link to='/signup'>Dont have an account? Click here to signup.</Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login;
