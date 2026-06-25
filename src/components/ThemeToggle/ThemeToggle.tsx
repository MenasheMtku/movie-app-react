"use client";

import { useContext } from "react";
import { IoMoon } from "react-icons/io5";
import { MdSunny } from "react-icons/md";
import { ThemeContext } from "@/contexts/themeContext/ThemeContext";

const ThemeToggle = () => {
  const { isDark, setIsDark } = useContext(ThemeContext);

  return (
    <button
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setIsDark(!isDark)}
      className="cursor-pointer transition-all duration-100"
    >
      {isDark ? <MdSunny size={25} /> : <IoMoon size={25} />}
    </button>
  );
};

export default ThemeToggle;
