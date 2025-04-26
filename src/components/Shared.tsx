import React from "react";
import Navbar from "./Navbar";
// import Footer from "./Footer";

interface SharedLayoutProps {
 children: React.ReactNode;
}

const SharedLayout: React.FC<SharedLayoutProps> = ({ children }) => {
 return (
  <div>
   <Navbar />
   <main>{children}</main>
   {/* <Footer /> */}
  </div>
 );
};

export default SharedLayout;
