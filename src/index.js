import React from "react";
import * as ReactDOM from 'react-dom';
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./store/theme-context";
import "./index.css"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
