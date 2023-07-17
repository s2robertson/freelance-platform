import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { ADD_USER, LOGIN } from "../utils/mutations";
import { setToken } from "../utils/auth";

import Nav from "../components/Nav";

function Signup(props) {
  // state variable to be later used for accessing form contents
  const [formState, setFormState] = useState({
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
    isEmployer: false,
  });

  const [addUser, { addUserError, addUserData }] = useMutation(ADD_USER);
  const [login, { loginError, loginData }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // firstly, ensures that the password and the passwordConfirm match up
    if (formState.password === formState.passwordConfirm) {
      try {
        const signupResponse = await addUser({
          variables: {
            username: formState.username,
            email: formState.email,
            password: formState.password,
            isEmployer: formState.isEmployer,
          },
        });

        const loginResponse = await login({
          variables: { email: formState.email, password: formState.password },
        });

        console.log(signupResponse.data.username);

        const token = loginResponse.data.login.token;
        setToken(token);

        alert("Thanks for signing up! Redirecting you to your profile...");
        window.location = "/profile";
      } catch (e) {
        alert("Error signing up...");
        console.log(e);
      }
    } else {
      alert("Error signing up... Passwords do not match!");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // separate input change handler for the isEmployer checkbox
  const handleCheckboxSwitch = () => {
    formState.isEmployer
      ? setFormState({
          ...formState,
          isEmployer: false,
        })
      : setFormState({
          ...formState,
          isEmployer: true,
        });
    //console.log(formState.isEmployer);
  };

  return (
    <>
      {console.log(formState)}
      <div className="p-32 my-20 mx-96 bg-sky-950 text-white border-2 rounded-3xl shadow-xl">
        <div>
          <h1 className="text-3xl mb-10">Sign Up</h1>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div class="mb-6">
            <label
              for="username"
              class="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Your username
            </label>
            <input
              type="text"
              onChange={handleChange}
              name="username"
              id="username"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="username"
              required
            ></input>
          </div>
          <div class="mb-6">
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              onChange={handleChange}
              name="email"
              id="email"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="example@mail.com"
              required
            ></input>
          </div>
          <div className="mb-6">
            <label
              for="password"
              className="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              onChange={handleChange}
              name="password"
              id="password"
              placeholder="********"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            ></input>
          </div>
          <div class="mb-6">
            <label
              for="repeat-password"
              class="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Repeat password
            </label>
            <input
              type="password"
              onChange={handleChange}
              name="passwordConfirm"
              id="repeat-password"
              placeholder="********"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            ></input>
          </div>
          <div class="flex items-start mb-6">
            <div class="ml-3 flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                onChange={handleCheckboxSwitch}
                value=""
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
              ></input>
            </div>

            <label
              for="terms"
              class="ml-2 text-sm font-medium text-white dark:text-gray-300"
            >
              I am an{" "}
              <a href="#" class="text-blue-600 hover:underline">
                employer
              </a>
            </label>
          </div>
          <button
            type="submit"
            class="text-white bg-gray-500 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Register new account
          </button>
          <div className="mt-6 hover:font-bold">
            <Link to="/login">
              Already have an account? Click here to login.
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Signup;
