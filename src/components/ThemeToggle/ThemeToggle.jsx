import React from "react";
// import "./themeToggle.module.css";
import classes from "./themeToggle.module.css";
import { useTheme } from "../../contexts/themeContext/ThemeContext";
// import ThemeToggle from "../ThemeToggle/ThemeToggle";

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();
  return (
    <>
      <input
        type="checkbox"
        id="darkmode-toggle"
        className={`${classes.input}`}
        checked={darkMode}
        onChange={toggleTheme}
      />
      <label htmlFor="darkmode-toggle" className={`${classes.label}`}></label>
    </>
  );
};

export default ThemeToggle;
