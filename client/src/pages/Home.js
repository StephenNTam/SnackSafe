import React from 'react';
import '../App.css';

//Main Screen Page
function Home() {
  return (
    <div className="home">
      <div className="home-bg">
        <div className="search-bg">
          <div className="search-content">
            <h1>Browse Resaurants</h1>
            <div className="search-bar-div">
              <input className="home-search-bar"></input>
              <button className="home-search-button">Search</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
