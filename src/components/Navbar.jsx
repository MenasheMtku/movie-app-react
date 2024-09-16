import Hamburger from "hamburger-react";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useClickAway } from "react-use";
// import "./navbar.css";
import ThemeToggle from "./ThemeToggle/ThemeToggle";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);
  useClickAway(ref, () => setOpen(false));

  const navLinks = [
    { id: 1, title: "Home", to: "/" },
    { id: 2, title: "Movies", to: "/movies" },
    { id: 3, title: "Shows", to: "/shows" },
    { id: 4, title: "Search", to: "/search" },
  ];

  return (
    <header
      className="flex px-4 py-2 justify-between items-center w-full h-[var(--nav-height)] fixed top-0 z-[99999] bg-secondary text-primary duration-200 "
      ref={ref}
    >
      <div className="max-w-[1440px] mx-auto flex w-full items-center justify-between ">
        <Link
          to="/"
          className="text-3xl md:text-4xl font-bold text-cyan-500 dark:text-cyan-500"
        >
          TMDB
        </Link>
        <div className="hidden md:flex lg:flex-row lg:items-center ">
          <nav className="mr-10 ">
            <ul className="justify-between font-semibold ">
              {navLinks.map(link => {
                return (
                  <Link
                    key={link.id}
                    className="mr-4 hover:border-b-[2px] border-primary py-4 duration-150"
                    to={link.to}
                  >
                    {link.title}
                  </Link>
                );
              })}
            </ul>
          </nav>
          <ThemeToggle />
        </div>

        <div className="block md:hidden">
          <Hamburger
            toggled={isOpen}
            size={28}
            toggle={setOpen}
            direction="right"
          />
          {isOpen && (
            <div
              className={`bg-secondary text-primary fixed bottom-0 right-0 top-[--nav-height] z-[9999] h-screen w-[300px] dark:border-b-white/20 p-6 ${isOpen ? "translate-x-0" : "translate-x-full"} ease-in-out font-semibold`}
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