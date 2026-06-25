"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
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
    { id: 5, title: "Watchlist", to: "/watchlist" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const navBackground = isScrolled
    ? "bg-bkgDarker text-primary shadow-md"
    : "bg-transparent text-primary";

  return (
    <header
      className={`${navBackground} fixed top-0 w-full z-50 transition duration-200 px-2`}
      ref={ref}
    >
      <div className="max-w-[var(--max-width)] mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-2xl lg:text-3xl font-bold">
          MovieApp
        </Link>
        <nav aria-label="Main navigation" className="hidden md:flex space-x-4 font-semibold">
          {navLinks.map(link => (
            <Link key={link.id} href={link.to} className="hover:text-amber-500">
              {link.title}
            </Link>
          ))}
        </nav>
        <ThemeToggle />
        <button
          className="md:hidden text-2xl"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      {isOpen && (
        <nav aria-label="Mobile navigation" className="md:hidden bg-bkgDarker text-primary p-4">
          {navLinks.map(link => (
            <Link
              key={link.id}
              href={link.to}
              className="block py-2 font-bold hover:text-amber-500"
              onClick={() => setIsOpen(false)}
            >
              {link.title}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
