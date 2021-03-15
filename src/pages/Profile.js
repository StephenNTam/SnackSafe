import React, { useState, useEffect } from 'react'
import fire from '../fire';
import  Allergies from '../variables/allergies'
import '../App.css';

function Profile({handleLogout,userID}) {

  const [userData, setUserData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  const [isEditable, setEditable] = useState(false);
  const [profileUserName, setProfileUserName] = useState("");
  const [profileLocation, setProfileLocation] = useState("");
  const [profileAllergies, setProfileAllergies] = useState([]);

  const allergyMap = {
    "peanuts" : false,
    "egg" : false,
    "crustacean and molluscs" : false,
    "fish" : false,
    "milk" : false,
    "sesame" : false,
    "soy" : false,
    "tree nuts" : false,
    "wheat" : false
  }

  const db = fire.firestore();

  const refreshPage = ()=>{
    window.location.reload();
  }

  const onChange = (e) => {
    console.log(e.target.value)
    const uAllergies = profileAllergies;
    var index;
    if (e.target.checked) {
      uAllergies.push(e.target.value)
    } else {
      index = uAllergies.indexOf(e.target.value)
      uAllergies.splice(index, 1)
    }
    setProfileAllergies(uAllergies);
    console.log(profileAllergies);
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

  async function updateUser(userID,profileUserName,profileLocation,profileAllergies){
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
          userLocation: profileLocation,
          userAllergies: profileAllergies
        },
        {merge: true}
      )
      .catch( error => console.log(error));
      setProfileUserName(profileUserName);
      setProfileLocation(profileLocation);
      setProfileAllergies(profileAllergies);
      refreshPage();
  }

  if(!isLoaded){
    addUser(userID)
    setProfileUserName(userData.userName);
    setProfileLocation(userData.userLocation);
    setProfileAllergies(userData.userAllergies);
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
        {isEditable ? (
          <span key="allergies"><br/>{Allergies.map(allergies => 
            <form>
              {profileAllergies.includes(allergies) ? 
              (
                <input type="checkbox" id={allergies} name={allergies} value={allergies} checked onChange={(e) => onChange(e)}/>
              )
              :
              (
                <input type="checkbox" id={allergies} name={allergies} value={allergies} onChange={(e) => onChange(e)}/>
              )}
              <label htmlFor={allergies}>
                {allergies}
              </label>
            </form>
            )}
          </span>
          ):(
            <div>
              {console.log(userData.userAllergies)}
              {userData.userAllergies ? (
                <span key="allergies">
                  {userData.userAllergies.map(allergies => {
                    return (
                      <li key={allergies}>
                        {allergies}
                      </li>
                    );
                })}
                </span>
              ) : (
                <span>
                  Loading ...
                </span>
              )}
            </div>
        )}
        <br />
        <br />
        <br />
        {isEditable ? (
            <button
              onClick={() => 
                {
                  updateUser(userID,profileUserName,profileLocation,profileAllergies)
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
                  setProfileAllergies(userData.userAllergies);
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
