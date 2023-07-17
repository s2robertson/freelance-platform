import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import { setToken } from '../utils/auth';

import Nav from '../components/Nav';

function Login(props) {
  // state variable to be later used for accessing form contents
  const [formState, setFormState] = useState({
    email: '',
    password: ''
  });

  // mutation for logging a given user in
  const [login, { error, data }] = useMutation(LOGIN);

  // on form submit, call login function with data in the formState object
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      setToken(token);
    } catch (e) {
      console.log(e);
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <>
      <div className='p-32 my-20 mx-96 justify-center bg-blue-100 border-blue-200 border-2 rounded-3xl shadow-xl'>
        <div>
          <h1 className="text-3xl mb-10">Login</h1>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-6">
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
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
              name="password"
              placeholder='********'
              type="password"
              id="password"
              onChange={handleChange}
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
