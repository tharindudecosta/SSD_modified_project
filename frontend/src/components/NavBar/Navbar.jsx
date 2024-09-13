import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import {
  doesSessionExist,
  signOut,
} from "supertokens-auth-react/recipe/session";
import { useGlobalState } from "../../utils";

const Navbar = () => {
  const [isDarkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState(false);
  const [user, getUser] = useGlobalState("user");

  const loggedIn = async () => {
    const isLoggedIn = await doesSessionExist();
    setIsUser(isLoggedIn);
  };

  useEffect(() => {
    loggedIn();
  }, []);

  const darkModeToggle = () => {
    if (
      localStorage.getItem("color-theme") === "dark" ||
      (!("color-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      localStorage.setItem("color-theme", "light");
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    } else {
      localStorage.removeItem("color-theme");
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  };

  const onLogout = async () => {
    await signOut();
    window.location.href = "/";
  };

  return (
    <>
      <nav
        className={`overflow-x-hidden font-primary w-screen bg-[#1F2937] border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-navbar-background-dark ${
          !location.pathname.startsWith("/") && "z-10 top-0 left-0 fixed"
        }`}
      >
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <Link to="/" className="flex">
          <span className="self-center text-white text-xl font-semibold whitespace-nowrap dark:text-white">
            Industry
          </span>
          </Link>

          <div className="flex gap-4 items-center md:order-2">
            {isUser && (
              <button
                onClick={() => {
                  navigate("/user");
                }}
                type="button"
                className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full object-cover"
                  src="https://i.postimg.cc/nh8Ypfnf/christopher-campbell-r-DEOVt-E7v-Os-unsplash.jpg"
                  alt="Application User"
                />
              </button>
            )}

            {user !== null && (
              <h3
                className="text-white"
                onClick={() => {
                  navigate("/");
                }}
              >
                Logout
              </h3>
            )}

            <DarkModeSwitch
              checked={isDarkMode}
              onChange={darkModeToggle}
              size={20}
            />

            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
