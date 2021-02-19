import React from 'react';
import '../App.css';

const img = require("../images/AboutPageInner.jpg");

function About() {
  return (
    <div className="about">
      <div className="about-page">
        <div className="about-content">
          <h1>About Page</h1>
          <br/>
            <p>
              As someone who has been allergic to peanuts my whole life I am very aware of the risks that 
              come with eating at new restaurants and new cuisines. My hope for this 
              website is to help inform people if they are ever unsure about allergic accomodations 
              pertaining to many restaurants across Canada. Food brings us together and I believe 
              food is best when it can be enjoyed safely by everyone. 
            </p>
        </div>
      </div>
    </div>
  );
}

export default About;
