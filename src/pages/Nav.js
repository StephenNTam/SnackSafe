import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import logo from '../images/snacksafe.png';

function Nav() {

  const navStyle = {
    color: 'black'
  };

  return (
    <nav className='main-page-nav'>

    <Link to='/'>
      <img src={ logo } alt="SnackSafe-Logo" width="25%" height="auto" />
    </Link>

      <ul className='nav-links'>

        <Link style={ navStyle } to='/' onClick={scrollToTop}>
          <li>Home</li>
        </Link>


        <Link style={ navStyle } to='/about' onClick={scrollToTop}>
          <li>About</li>
        </Link>

        <Link style={ navStyle } to='/contribute' onClick={scrollToTop}>
          <li>Contribute</li>
        </Link>
        
        <Link style={ navStyle } to='/login' onClick={scrollToTop}>
          <li>Profile</li>
        </Link>
      </ul>
    </nav>
  );
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


export default Nav;
