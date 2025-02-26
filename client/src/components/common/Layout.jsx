import { Header, Footer } from "../../routes/index";
import PropTypes from "prop-types";
import { CustomNavLink } from "./Design"; // Ensure this is correctly defined

// Removed incorrect import of `href` from react-router-dom

export const Layout = ({ children }) => {


  return (
    <div>
      <Header />
      <main className="h-[500vh]">{children}</main>
      <Footer />
    </div>
  );
};
Layout.propTypes = {
  children: PropTypes.any,
};
