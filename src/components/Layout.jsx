import PropTypes from "prop-types";
import React from "react";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div
      className={
        "bg-secondary text-primary grid grid-rows-[auto_1fr_auto] grid-cols-1 duration-200"
      }
    >
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
