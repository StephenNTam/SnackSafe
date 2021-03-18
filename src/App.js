import React from 'react';
import './App.css';
import Nav from './pages/Nav';
import Home from './pages/Home';
import About from './pages/About';
import Contribute from './pages/Contribute';
import LoginForm from './pages/LoginForm';
import ErrorPage from './pages/404Page';
import Result from './pages/Result';
import RestaurantPage from './pages/RestaurantPage';
import ReviewForm from './pages/ReviewForm';

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
          <Route path="/contribute" component={Contribute}/>
          <Route path="/login" component={LoginForm}/>
          <Route path="/result" component={Result}/>
          <Route path="/restaurantpage" component={RestaurantPage}/>
          <Route path="/reviewform" component={ReviewForm}/>

          <Route path='*' exact={true} component={ErrorPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
