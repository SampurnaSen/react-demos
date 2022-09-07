import React, { useState, useEffect, useReducer, useContext } from "react";

import Card from "../Card/Card";
import classes from "./Login.module.css";
import Button from "../Button/BasicButton";
import { ThemeContext } from "../../store/theme-context";
import AuthContext from "../../store/auth-context";

const nameReducer = (state, action) => {
  if(action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.length > 1 }
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: state.value, isValid: state.value.length > 1
    }
  }
  return { value: "", isValid: false}
}

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = () => {
  const [formIsValid, setFormIsValid] = useState(false);

  const theme = useContext(ThemeContext);
  const { onLogin } = useContext(AuthContext);

  const [nameState, dispatchName] = useReducer(nameReducer, {
    value: "",
    isValid: null
  })

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: nameIsValid } = nameState;
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(nameIsValid && emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [nameIsValid, emailIsValid, passwordIsValid]);

  const nameChangeHandler = (event) => {
    dispatchName({ type: "USER_INPUT", val: event.target.value })
  }

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  };

  const validateNameHandler = () => {
    dispatchName({ type: "INPUT_BLUR"});
  }

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    onLogin(emailState.value, passwordState.value, nameState.value);
  };

  return (
    <Card
      className={`${classes.login} ${theme.darkMode ? "bg-dark" : "bg-light"}`}
    >
      <form onSubmit={submitHandler}>
      <div
          className={`${classes.control} ${
            nameState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label
            className={`${theme.darkMode ? "para-dark" : "para-light"}`}
            htmlFor="text"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={nameState.value}
            onChange={nameChangeHandler}
            onBlur={validateNameHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label
            className={`${theme.darkMode ? "para-dark" : "para-light"}`}
            htmlFor="email"
          >
            E-Mail
          </label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label
            className={`${theme.darkMode ? "para-dark" : "para-light"}`}
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.btn}
            disabled={!formIsValid}
            title={"Login"}
          />
        </div>
      </form>
    </Card>
  );
};

export default Login;
