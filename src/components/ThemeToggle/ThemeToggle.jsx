import React, { useContext } from "react";
// import "./themeToggle.module.css";
import classes from "./themeToggle.module.css";
import { IoMoon } from "react-icons/io5";
import { MdSunny } from "react-icons/md";
// import { useTheme } from "../../contexts/themeContext/ThemeContext";
import { ThemeProvider } from "../../contexts/themeContext/ThemeContext";

import { ThemeContext } from "../../contexts/themeContext/ThemeContext";

const ThemeToggle = () => {
  // const { darkMode, toggleTheme } = useTheme();
  const { isDark, setIsDark } = useContext(ThemeContext);
  const iconSize = 25;
  return (
    <>
      {isDark ? (
        <MdSunny
          onClick={() => setIsDark(!isDark)}
          size={iconSize}
          className="cursor-pointer transition-all duration-100"
        />
      ) : (
        <IoMoon
          onClick={() => setIsDark(!isDark)}
          size={iconSize}
          className="cursor-pointer transition-all duration-100"
        />
      )}
      {/* <input
        type="checkbox"
        id="darkmode-toggle"
        className={`${classes.input}`}
        // checked={() => setIsDark(!isDark)}
        onChange={() => setIsDark(!isDark)}
      />
      <label htmlFor="darkmode-toggle" className={`${classes.label}`}></label> */}
    </>
  );
};

export default ThemeToggle;
