import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useClickAway } from "react-use";
import Hamburger from "hamburger-react";
// import { Squash as Hamburger } from "hamburger-react";
import "./navbar.css";
import { useTheme } from "../../contexts/themeContext/ThemeContext";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
// TODO: make  navbar transparentadd
const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);
  useClickAway(ref, () => setOpen(false));

  // Theme
  // const { darkMode, toggleTheme } = useTheme();

  return (
    <header
      className="header bg-gray-300 text-black dark:bg-gray-800 dark:text-gray-200 px-8 py-3 duration-200"
      ref={ref}
    >
      <div className="max-w-[1440px] mx-auto flex w-full items-center justify-between ">
        <Link
          to="/"
          className="text-3xl md:text-4xl font-bold text-cyan-700 dark:text-cyan-500"
        >
          TMDB
        </Link>
        <div className="hidden lg:flex lg:flex-row lg:items-center">
          <nav className="">
            <ul className="justify-between font-semibold ">
              <Link className="mr-4" to="/">
                Home
              </Link>
              <Link className="mr-4" to="/movies">
                Movies
              </Link>
              <Link className="mr-4" to="/shows">
                TV Shows
              </Link>
              <Link className="mr-4 w-full" to="/search">
                Search
              </Link>
            </ul>
          </nav>
          <ThemeToggle />
        </div>

        <div className="block lg:hidden">
          <Hamburger
            toggled={isOpen}
            size={28}
            toggle={setOpen}
            direction="right"
          />
          {isOpen && (
            <div
              className={`fixed bottom-0 right-0 top-[--nav-height] z-[9999] h-screen w-[300px] text-black bg-gray-100 dark:border-b-white/20 dark:bg-gray-700 dark:text-gray-300 p-6 ${isOpen ? "translate-x-0" : "translate-x-full"} ease-in-out duration-800 font-semibold`}
            >
              <ul
                className="flex h-[auto]  w-full flex-col 
                             justify-start gap-9 pl-3"
              >
                <Link className="text-lg" to="/" onClick={useClickAway}>
                  Home
                </Link>
                <Link className="text-lg" to="/movies" onClick={useClickAway}>
                  Movies
                </Link>
                <Link className="text-lg" to="/shows" onClick={useClickAway}>
                  TV Shows
                </Link>
                <Link className="text-lg" to="/search" onClick={useClickAway}>
                  Search
                </Link>
              </ul>
              <div className="pl-3">
                <ThemeToggle />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

{
  /* <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={darkMode}
                onChange={toggleTheme}
              />
              <div className="block bg-gray-600 w-12 h-6 rounded-full"></div>
              <div
                className={`absolute left-0 top-0 bg-white w-6 h-6 rounded-full transition transform ${darkMode ? "translate-x-full bg-gray-300" : ""}`}
              ></div>
            </div>
            <span className="ml-3 text-sm font-medium">
              {darkMode ? "Dark Mode" : "Light Mode"}
            </span>
          </label> */
}
