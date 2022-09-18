import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react";
import { useContext } from "react";

import { UserContext } from "../../contexts/user.context";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import "./navigation.styles.scss";

import { signOutUser } from "../../utils/firebase/firebase.utils";

const Navbar = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            Shop
          </Link>
          <Link className="nav-link" to="/contact">
            Contact
          </Link>
          {currentUser ? (
            <span onClick={signOutUser} className="nav-link">
              Sign out
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              Sign in
            </Link>
          )}
          <Link className="nav-link" to="/cart">
            Cart
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navbar;
