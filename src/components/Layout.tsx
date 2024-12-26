import Footer from "./Footer/Footer";
import Navbar from "./Navbar";

import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-bkg text-content grid grid-rows-[auto_1fr_auto] grid-cols-1 duration-200">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
