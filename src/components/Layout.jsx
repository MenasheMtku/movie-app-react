import React from "react";
import Navbar from "./Navbar/Navbar";
import PropTypes from "prop-types";
import Footer from "./Footer/Footer";

const Layout = ({ children }) => {
  return (
    <div className="">
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
