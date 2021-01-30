import React from 'react';

//Main Screen Page
function Home() {
  return (
    <div>
      <div className="home-bg">
        <div className="search-bg">
          <div className="search-content">
            <h1>Browse Resaurants</h1>
            <div className="search-bar-div">
              <input className="home-search-bar"></input>
            </div>
            <div className="search-bar-div">
              <button className="home-search-button">Search</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
