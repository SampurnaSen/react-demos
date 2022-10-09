import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./store/theme-context";
import AuthContext from "./store/auth-context"
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import BookPage from "./components/Pages/BookPage";
import MainHeader from "./components/MainHeader/MainHeader";
import "./App.css";
import { Route, Switch } from "react-router-dom";

function App() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.darkMode;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password, name) => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
    setName(name);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const loggedInRoutes = (
    <>
      <Route path="/" exact component={Home} />
      <Route path="/books" exact component={BookPage} />
    </>
  )

  const loggedOutRoutes = (
    <>
      <Route path="/" exact component={Login}/>
    </>
  )


  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        name: name, 
        onLogin: loginHandler,
        onLogout: logoutHandler
      }}
    >
      <MainHeader onLogout={logoutHandler} />
      <main>
        <Switch>
          {!isLoggedIn && loggedOutRoutes}
          {isLoggedIn && loggedInRoutes}
        </Switch>
      </main>
    </AuthContext.Provider>
  );
}

export default App;
