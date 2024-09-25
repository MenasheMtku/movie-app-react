import PropTypes from "prop-types";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={
        "bg-bkg text-content grid grid-rows-[auto_1fr_auto] grid-cols-1 duration-200 mt-[var(--nav-height)]"
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
