import React, { useState } from 'react'
import fire from '../fire';
import '../App.css';

function Profile({handleLogout,userID}) {

  const [userData, setUserData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  const db = fire.firestore();

  if(!isLoaded){
    const check = db.collection("users")
    .doc("F1wgfycGI8R0vlpUgAsp")
    .get()
    .then(doc => {
        if(doc.data() == undefined){
          console.log("User does not exist")
        } else {
          setIsLoaded(true);
          setUserData(doc.data());
        }
    })
  }

  return (
    <div className="profile">
      <div className="profile-content">
        <h1>Profile</h1>
        <text>Logged in as, {userData.userEmail}</text>
        <br />
        <br />
        <br />
      </div>
      <div className="btnContainer">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Profile;
