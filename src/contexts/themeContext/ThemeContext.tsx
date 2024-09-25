// src/ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

type ThemeContextProps = {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
};

export const ThemeContext = createContext<ThemeContextProps>({
  isDark: false,
  setIsDark: () => {},
});

export const ThemeProvider = ({ children }: any) => {
  const [isDark, setIsDark] = useState(false);
  // Track when the theme is loaded
  const [themeLoaded, setThemeLoaded] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDark(prefersDark);
    }
    // Theme is now loaded
    setThemeLoaded(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    if (themeLoaded) {
      // Remove 'invisible' class once theme is set
      document.body.classList.remove("invisible");
    }
  }, [themeLoaded]);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for using the ThemeContext
export const useTheme = () => {
  return useContext(ThemeContext);
};
