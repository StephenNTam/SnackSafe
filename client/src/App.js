import React from 'react';
import './App.css';
import Nav from './pages/Nav';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import LoginForm from './pages/LoginForm';
import Register from './pages/RegisterForm';
import ErrorPage from './pages/404Page';
import Result from './pages/Result';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect }
from 'react-router-dom';

//Main App
function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/about" component={About}/>
          <Route path="/contact" component={Contact}/>
          <Route path="/login" component={LoginForm}/>
          <Route path="/register" component={Register}/>
          <Route path="/result" component={Result}/>

          <Route path='*' exact={true} component={ErrorPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
