import Hamburger from "hamburger-react";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useClickAway } from "react-use";
import ThemeToggle from "./ThemeToggle/ThemeToggle";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  useClickAway(ref, () => setIsOpen(false));

  const navLinks = [
    { id: 1, title: "Home", to: "/" },
    { id: 2, title: "Movies", to: "/movies" },
    { id: 3, title: "Shows", to: "/shows" },
    { id: 4, title: "Search", to: "/search" },
  ];

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    }
    if (window.scrollY === 0) {
      setIsScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  let navBackground = isScrolled
    ? "bg-bkgDarker text-primary duration-200"
    : "bg-gradient-to-r from-bkg/20 to-content/5 text-primary duration-200";
  return (
    <header
      className={`${navBackground} flex justify-between  items-center w-full h-[var(--nav-height)] fixed top-0 z-50 font-semibold`}
      ref={ref}
    >
      <div className="max-w-[var(--max-width)] p-8 mx-auto flex w-full items-center justify-between ">
        <Link to="/" className="text-3xl md:text-4xl font-bold text-primary">
          TMDB
        </Link>
        <div className="hidden md:flex lg:flex-row lg:items-center">
          <nav className="mr-10 ">
            <ul className="justify-between">
              {navLinks.map(link => {
                return (
                  <Link
                    key={link.id}
                    className="mr-4 hover:border-b-[3px] border-primary py-4 duration-150"
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
            size={24}
            toggle={setIsOpen}
            direction="left"
          />
          {isOpen && (
            <div
              className={`fixed right-0 left-0 top-[var(--nav-height)] h-[25vh] z-50 p-6 bg-bkgDarker/95 text-contentDarker transition-transform duration-300 ease-linear ${
                isOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <ul className="flex h-[auto] w-full place-items-center justify-center gap-4 ">
                {navLinks.map(link => {
                  return (
                    <Link
                      key={link.id}
                      className="block px-3 py-2 rounded-md text-base font-semibold bg-content text-bkg"
                      to={link.to}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.title}
                    </Link>
                  );
                })}

                <ThemeToggle />
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
