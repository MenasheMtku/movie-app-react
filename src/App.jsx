// import "./App.css";
import React from "react";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "../src/contexts/themeContext/ThemeContext.jsx";
import Layout from "./components/Layout.jsx";

const App = () => {
  return (
    <ThemeProvider>
      <Layout>
        <Outlet />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
