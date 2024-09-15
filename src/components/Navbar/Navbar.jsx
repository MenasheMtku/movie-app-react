import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useClickAway } from "react-use";
import Hamburger from "hamburger-react";
// import { Squash as Hamburger } from "hamburger-react";
import "./navbar.css";
// import { useTheme } from "../../contexts/themeContext/ThemeContext";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
// TODO: make  navbar transparentadd
const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);
  useClickAway(ref, () => setOpen(false));

  const navLinks = [
    { id: 1, title: "Home", to: "/" },
    { id: 2, title: "Movies", to: "/movies" },
    { id: 3, title: "TV Shows", to: "/shows" },
    { id: 4, title: "Search", to: "/search" },
  ];

  return (
    <header className="header bg-bkg text-content duration-200" ref={ref}>
      <div className="max-w-[1440px] mx-auto flex w-full items-center justify-between ">
        <Link
          to="/"
          className="text-3xl md:text-4xl font-bold text-cyan-500 dark:text-cyan-500"
        >
          TMDB
        </Link>
        <div className="hidden lg:flex lg:flex-row lg:items-center ">
          <nav className="mr-10 ">
            <ul className="justify-between font-bold ">
              {navLinks.map(link => {
                return (
                  <Link key={link.id} className="mr-4" to={link.to}>
                    {link.title}
                  </Link>
                );
              })}
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
              className={`fixed bottom-0 right-0 top-[--nav-height] z-[9999] h-screen w-[300px] text-black bg-bkg dark:border-b-white/20 dark:bg-gray-700 dark:text-gray-300 p-6 ${isOpen ? "translate-x-0" : "translate-x-full"} ease-in-out font-semibold`}
            >
              <ul
                className="flex h-[auto]  w-full flex-col 
                             justify-start gap-9 pl-3"
              >
                {navLinks.map(link => {
                  return (
                    <Link
                      key={link.id}
                      className="text-lg"
                      to={link.to}
                      onClick={useClickAway}
                    >
                      {link.title}
                    </Link>
                  );
                })}
              </ul>
              <div className="pl-3 mt-4">
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
