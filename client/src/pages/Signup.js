import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
// import { SIGNUP } from '../utils/mutations';
// import Auth from '../utils/auth';

import Nav from '../components/Nav';

function Signup(props) {
  return (
    <>
      <div className='p-32 my-20 mx-96 bg-blue-100 border-blue-200 border-2 rounded-3xl shadow-xl'>
        <div>
          <h1 className="text-3xl mb-10">Sign Up</h1>
        </div>
        <form>
          <div class="mb-6">
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              type="email"
              id="email"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@flowbite.com"
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
          <div class="mb-6">
            <label
              for="repeat-password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Repeat password
            </label>
            <input
              type="password"
              id="repeat-password"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required>
            </input>
          </div>
          <div class="flex items-start mb-6">
            <div class="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                value=""
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                required>
              </input>
            </div>

            <label
              for="terms"
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              I agree with the <a href="#" class="text-blue-600 hover:underline">terms and conditions</a>
            </label>

            <div class="ml-8 flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                value=""
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                required>
              </input>
            </div>

            <label
              for="terms"
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              I am an <a href="#" class="text-blue-600 hover:underline">employer</a>
            </label>
          </div>
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Register new account
          </button>
          <div className='mt-6 hover:font-bold'>
            <Link to='/login'>Already have an account? Click here to login.</Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default Signup;
