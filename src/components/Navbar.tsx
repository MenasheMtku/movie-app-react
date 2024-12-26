import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useClickAway } from "react-use";
import { FaBars, FaTimes } from "react-icons/fa";
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
    setIsScrolled(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navBackground = isScrolled
    ? "bg-bkgDarker text-primary shadow-md"
    : "bg-transparent text-primary";

  return (
    <header
      className={`${navBackground} fixed top-0 w-full z-50 transition duration-200 px-2`}
      ref={ref}
    >
      <div className="max-w-[var(--max-width)] mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-2xl lg:text-3xl font-bold">
          MovieApp
        </Link>
        <nav className="hidden md:flex space-x-4 font-semibold">
          {navLinks.map(link => (
            <Link key={link.id} to={link.to} className="hover:text-[#f59e0b]">
              {link.title}
            </Link>
          ))}
        </nav>
        <ThemeToggle />
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      {isOpen && (
        <nav className="md:hidden bg-bkgDarker text-primary p-4">
          {navLinks.map(link => (
            <Link
              key={link.id}
              to={link.to}
              className="block py-2 font-bold hover:text-[#f59e0b]"
              onClick={() => setIsOpen(false)}
            >
              {link.title}
            </Link>
          ))}
          {/* <ThemeToggle /> */}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
