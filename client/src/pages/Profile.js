import React, { useState, useEffect } from 'react'
import fire from '../fire';
import '../App.css';

function Profile({handleLogout,userID}) {

  const [userData, setUserData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  const [isEditable, setEditable] = useState(false);
  const [profileUserName, setProfileUserName] = useState("");
  const [profileLocation, setProfileLocation] = useState("");

  const db = fire.firestore();

  const refreshPage = ()=>{
    window.location.reload();
  }

  async function addUser(userID){
    await db.collection("users").doc(userID).get().then(doc => {setUserData(doc.data())})
    if(userData == undefined){
      await db.collection("users")
          .doc(userID)
          .set()
          .then({
            userName: "Anonymous",
            userLocation: "Somewhere",
            userAllergies: []
          })
          .catch( error => console.log(error))
    }
    await db.collection("users").doc(userID).get().then(doc => {
      setUserData(doc.data())
    })
  }

  async function updateUser(userID,profileUserName,profileLocation){
    if (profileUserName == undefined) {
      profileUserName = "";
    } 
    if (profileLocation == undefined) {
      profileLocation = "";
    }
    await db.collection("users")
      .doc(userID)
      .set(
        {
          userName: profileUserName,
          userLocation: profileLocation
        },
        {merge: true}
      )
      .catch( error => console.log(error));
      setProfileUserName(profileUserName);
      setProfileLocation(profileLocation);
      refreshPage();
  }

  if(!isLoaded){
    addUser(userID)
    setProfileUserName(userData.userName);
    setProfileLocation(userData.userLocation);
    setIsLoaded(true);
  }

  return (
    <div className="profile">
      <div className="profile-content">
        <br />
        <h1>Profile</h1>
        <span>Logged in as, {userID}</span><br /><br />
        <span>Username: </span>
        {isEditable ? (<input type="text" defaultValue={profileUserName} onChange={(evt) => 
          {setProfileUserName(evt.target.value)}}></input>
          ):(
          <span>{userData.userName}</span>)}
        <br /><br />
        <span>Location: </span>
        {isEditable ? (<input type="text" defaultValue={profileLocation} onChange={(evt) => 
          {setProfileLocation(evt.target.value)}}></input>
          ):(
          <span>{userData.userLocation}</span>)}
        <br /><br />
        <span style={{fontWeight:'bold'}}>Your Allergies</span>
        <br />
        <br />
        <br />
        {isEditable ? (
            <button
              onClick={() => 
                {
                  updateUser(userID,profileUserName,profileLocation)
                  setEditable(!isEditable)
                }
              }
            >
              Save
              </button>
            ):(
            <button
              onClick={() => 
                {
                  setProfileUserName(userData.userName);
                  setProfileLocation(userData.userLocation);
                  setEditable(!isEditable);
                }
              }>
              Edit Profile
            </button>)
        }
      </div>
      <div className="btnContainer">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Profile;
