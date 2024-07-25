import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useClickAway } from "react-use";
import Hamburger from "hamburger-react";
// import { Squash as Hamburger } from "hamburger-react";
import "./navbar.css";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);
  useClickAway(ref, () => setOpen(false));

  return (
    <header className="header z-[1000]  bg-black/60 px-8 py-3 " ref={ref}>
      <div className="container mx-auto flex w-full items-center justify-between">
        <Link to="/" className="text-3xl font-bold text-cyan-300">
          TMDB
        </Link>
        <nav className="hidden lg:block">
          <ul className="justify-between">
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
        <div className="block lg:hidden">
          <Hamburger
            toggled={isOpen}
            size={28}
            toggle={setOpen}
            direction="right"
          />
          {isOpen && (
            <div
              className={`fixed bottom-0 right-0 top-[--nav-height] z-[9999] h-screen w-[300px] border-b-white/20 bg-gray-800 p-6 ${isOpen ? "translate-x-0" : "translate-x-full"} ease-in-out duration-800`}
            >
              <ul
                className="flex h-[50%]  w-full flex-col 
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
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
