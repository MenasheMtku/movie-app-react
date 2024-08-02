// import "./App.css";
import React, { useContext } from "react";
import Layout from "./components/Layout.jsx";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "../src/contexts/themeContext/ThemeContext.jsx";
import { ThemeContext } from "./contexts/themeContext/ThemeContext";

const App = () => {
  console.log("App");

  return (
    <>
      <ThemeProvider>
        <Layout>
          <Outlet />
        </Layout>
      </ThemeProvider>
    </>
  );
};

export default App;
