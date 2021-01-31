import React from 'react';
import './App.css';
import Nav from './pages/Nav';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/LoginForm';
import Register from './pages/RegisterForm';

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
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
