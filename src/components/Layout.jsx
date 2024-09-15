import PropTypes from "prop-types";
import React from "react";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <div
        className={
          "bg-bkg text-content grid grid-rows-[auto_1fr_auto] grid-cols-1 duration-200"
        }
      >
        <Navbar />
        <main className="">{children}</main>
        <Footer />
      </div>
    </>
  );
};
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Layout;
