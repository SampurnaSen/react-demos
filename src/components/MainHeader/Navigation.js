import React, { useContext } from "react";

import AuthContext from "../../store/auth-context";
import BasicButton from "../Button/BasicButton";
import classes from "./Navigation.module.css";
import { Link } from "react-router-dom";

const Navigation = () => {
  const { isLoggedIn, onLogout } = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>
        {isLoggedIn && (
          <>
            <li>
              <Link to="/books">Books</Link>
            </li>
            <li>
              <BasicButton onClick={onLogout} title="Logout" />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
