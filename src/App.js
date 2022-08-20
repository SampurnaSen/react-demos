import { Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import MainHeader from "./components/MainHeader/MainHeader"

function App() {
  return (
    <div className="app">
      <MainHeader />
      <main>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/products" exact>
            <Products />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
