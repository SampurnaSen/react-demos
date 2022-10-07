import React, { useContext } from "react";

import BasicButton from "../Button/BasicButton";
import classes from "./Navigation.module.css";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const Navigation = (props) => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>
        {isLoggedIn && (
          <>
            <li>
              <BasicButton onClick={props.onLogout} title="Logout" />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
