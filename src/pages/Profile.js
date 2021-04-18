import React, { useState } from 'react';
import Modal from 'react-modal';
import fire from '../fire';
import  Allergies from '../variables/allergies';
import { useHistory } from 'react-router-dom';
import '../App.css';


function Profile({handleLogout,userID}) {
  const history = useHistory();

  const [userData, setUserData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const [isEditable, setEditable] = useState(false);
  const [profileUserName, setProfileUserName] = useState("");
  const [profileLocation, setProfileLocation] = useState("");
  const [profileAllergies, setProfileAllergies] = useState([]);

  const db = fire.firestore();

  const refreshPage = () =>{
    window.location.reload();
  }

  const onChange = (e) => {
    const uAllergies = profileAllergies;
    var index;
    if (e.target.checked) {
      uAllergies.push(e.target.value)
    } else {
      index = uAllergies.indexOf(e.target.value)
      uAllergies.splice(index, 1)
    }
    setProfileAllergies(uAllergies);
  }

  async function addUser(userID){
    const UD = db.collection("users").doc(userID);
    await UD.get().then(doc => {
      if(doc.exists){
        setUserData(doc.data());
        setProfileUserName(userData.userName);
        setProfileLocation(userData.userLocation);
        setProfileAllergies(userData.userAllergies);
      }
      else {
        UD.set({
          userName: "Anonymous",
          userLocation: "Somewhere",
          userAllergies: []
        })
        addUser(userID);
      }
    });
  }

  async function deleteUser(uid){
    const user = fire.auth().currentUser
    user.delete();
    db.collection("users")
      .doc(uid)
      .delete();
      history.push({
        pathname: "/login"
      });
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
    addUser(userID);
    setIsLoaded(true);
  }


  return (
    <div className="profile">
      {userData ? 
      (
      <div>
        <Modal isOpen={isDelete}>
          <div>
            <h2>
              You are about to Delete your profile, do you want to proceed?
            </h2>
          </div>
          <br/>
          <div>
            <button onClick={() => {deleteUser(userID)}}>Yes</button>
            <button style={{marginLeft:"1em"}} onClick={() => setIsDelete(false)}>No</button>
          </div>
        </Modal>
        <div className="profile-content">
          <br />
          <h1>Profile</h1>
          <span>Logged in as, {userID}</span><br /><br />
          <span style={{fontWeight:'bold'}}>Display Name: </span><br/>
          {isEditable ? (<input type="text" defaultValue={profileUserName} onChange={(evt) => 
            {setProfileUserName(evt.target.value)}}></input>
            ):(
            <span>{userData.userName}</span>)}
          <br /><br />
          <span style={{fontWeight:'bold'}}>Location: </span><br/>
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
                  <input type="checkbox" id={allergies} name={allergies} value={allergies} defaultChecked={true} onChange={(e) => onChange(e)}/>
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
              <div>
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
                </button>
                <br/>
                <br/>
                <button
                  onClick={() => {
                    setIsDelete(!isDelete)
                  }}>
                  Delete Profile
                </button>
              </div>
              )
          }
        </div>
      </div>
      )
      :
      (
        <div>Loading...</div>
      )}
      <div className="btnContainer">
          <button onClick={handleLogout}>Logout</button>
        </div>
    </div>
  );
}

export default Profile;