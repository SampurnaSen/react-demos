import './App.css';
import { Route, Switch } from 'react-router-dom'
import Nav from './components/nav';
import Home from './pages/home'
import About from './pages/about'
import Footer from './components/footer'
import FourOhFour from './pages/fourohfour';
import ContactUs from './pages/contact-us';

function App() {
  return (
    <div className="App">
      <Nav />
      <main>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/contact">
            <ContactUs />
          </Route>
          <Route path="*">
            <FourOhFour />
          </Route>
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
