import { Header, Footer } from "../../routes/index";
import PropTypes from "prop-types";
import { CustomNavLink } from "./Design"; // Ensure this is correctly defined

export const Layout = ({ children }) => {

  return (
    <div>
      <Header />
      <main >{children}</main>
      <Footer />
    </div>
  );
};
Layout.propTypes = {
  children: PropTypes.any,
};
