import React, { useContext, useEffect } from "react";

import { IoMoon } from "react-icons/io5";
import { MdSunny } from "react-icons/md";

import { ThemeContext } from "../../contexts/themeContext/ThemeContext";

const ThemeToggle = () => {
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
    </>
  );
};

export default ThemeToggle;
