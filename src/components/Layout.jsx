import React, { useContext } from "react";
import Navbar from "./Navbar/Navbar";
import PropTypes from "prop-types";
import Footer from "./Footer/Footer";

import { ThemeContext } from "../contexts/themeContext/ThemeContext";

const Layout = ({ children }) => {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] grid-cols-1">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Layout;
