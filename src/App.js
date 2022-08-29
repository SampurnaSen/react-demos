import React, { useContext, useEffect, useState } from "react"
import { ThemeContext } from './store/theme-context';
import AuthContext from "./store/auth-context";
import MainHeader from './components/MainHeader/MainHeader'
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import './App.css';

function App() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.darkMode;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if(storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true)
    }
  }, [])

  const loginHandler = (email, password) => {
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true)
  }

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{
      isLoggedIn: isLoggedIn
    }}>
       <div className="App">
        <MainHeader onLogout={logoutHandler}/>
          <main>
            {!isLoggedIn && <Login onLogin={loginHandler}/>}
            {isLoggedIn && <Home onLogout={logoutHandler}/>}
          </main>
        </div>
    </AuthContext.Provider>
     
  );
}

export default App;
