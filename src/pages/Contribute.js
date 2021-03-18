import React, {useState, useEffect} from 'react';
import fire from "../fire";
import { useHistory } from 'react-router-dom';
import Popup from 'react-popup';

//Contacts Page
function Contribute() {
  const history = useHistory();

  const [isLoaded, setIsLoaded] = useState(false);
  const [restaurantData, setRestaurantData] = useState();

  const [restaurantAddress, setRestaurantAddress] = useState("");
  const [restaurantType, setRestaurantType] = useState("");
  const [restaurantHours, setRestaurantHours] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantPhone, setRestaurantPhone] = useState("");
  const [restaurantWWW, setRestaurantWWW] = useState("");

  const [issue, setissue] = useState(0);
  const [fields, setFields] = useState(0);
  const [added, setAdded] = useState(0);

  const db = fire.firestore();

  async function getRestaurants(){
    const rd = await db.collection("restaurants").get();
    setRestaurantData(rd.docs.map(doc => doc.data()))
  }

  if(!isLoaded){
    getRestaurants()
    setIsLoaded(true)
  }

  const duplicateCheck = () => {
    restaurantData.map(temp => {
      if(temp.restaurantName == restaurantName && temp.restaurantAddress == restaurantAddress){
          return true;
      }
    })
    return false;
  }

  const handleLogin = () => {
    history.push({
      pathname: "/login"
    });
  }

  const resetForm = () => {
    document.getElementById("contribution-form").reset();
  }

  async function handleAdd() {
    db.collection("restaurants").add({
      restaurantAddress: restaurantAddress,
      reataurantType: restaurantType,
      restaurantHours: restaurantHours,
      restaurantName: restaurantName,
      restaurantPhone: restaurantPhone,
      restaurantWWW: restaurantWWW
    })
  }

  return(
    <div className="contribute-page">
      {restaurantData ? 
      (
        <div>
        {fire.auth().currentUser ? 
          (
            <div className="contribution-container">
              <h1>Contribute a restaurant.</h1>
              <p>* required fields</p>
              <br/>
              <form id="contribution-form">
                <label for="restName" style={{padding:5,fontWeight:"bolder"}}>*Restaurant Name:</label><br/>
                <input name="restName" id="restName" required size="100"
                    onChange={(evt) => {
                        setRestaurantName(evt.target.value)
                }}></input><br/>

                <label for="restAdd" style={{padding:5,fontWeight:"bolder"}}>*Restaurant Address:</label><br/>
                <input name="restAdd" id="restAdd" required size="100"
                    onChange={(evt) => {
                        setRestaurantAddress(evt.target.value)
                  }}></input><br/>

                <label for="restHours" style={{padding:5,fontWeight:"bolder"}}>*Restaurant Hours:</label><br/>
                <input name="restHours" id="restHours" required size="100"
                    onChange={(evt) => {
                        setRestaurantHours(evt.target.value)
                }}></input><br/>

                <label for="restPhone" style={{padding:5,fontWeight:"bolder"}}>*Restaurant Phone:</label><br/>
                <input name="restPhone" id="restPhone" required size="100"
                    onChange={(evt) => {
                        setRestaurantPhone(evt.target.value)
                }}></input><br/>
                
                <label for="restType" style={{padding:5,fontWeight:"bolder"}}>*Restaurant Type:</label><br/>
                <select name="restType" id="restType" required
                        onChange={(evt) => {
                            var typeValue = evt.target.value;
                            setRestaurantType(typeValue);
                        }}>
                        <option disabled selected value> </option>
                        <option value="American">American</option>
                        <option value="Asian">Asian</option>
                        <option value="Mediterranean">Mediterranean</option>
                        <option value="Other">Other</option>
                    </select><br/>

                <label for="restWeb" style={{padding:5,fontWeight:"bolder"}}>*Restaurant Website:</label><br/>
                <input name="restWeb" id="restWeb" required size="100"
                    onChange={(evt) => {
                        setRestaurantWWW(evt.target.value)
                }}></input><br/><br/>
                  
                <button onClick={(evt) => {
                  evt.preventDefault();
                  const form = document.getElementById("contribution-form");
                      if (form.checkValidity() === false) {
                        setFields(1);
                        setissue(1);
                        return;
                      }
                      else if (duplicateCheck()){
                        setissue(1);
                        return;
                      }
                      handleAdd();
                      resetForm();
                      setAdded(1);
                      setissue(0);
                      setFields(0);
                      return(<div>Restaurant Added!</div>);
                }}>Add Restaurant</button>
              </form>
              {issue ? (
                <div>
                  {fields ? (<div>Please fill out all fields.</div>):(<div>Restaurant Already Exists!</div>)}
                </div>
              )
              :
              (<div>{added ? (<div>Restaurant successfully added!</div>):(<></>)}</div>)}
            </div>
          )
          :
          (
            <div>
              You must be <a className="add-link" onClick={() => handleLogin()}>logged in</a> to contribute.
            </div>
          )}
        </div>
      )
      :
      (
        <div>
          loading ...
        </div>
      )}
    </div>
  );
  
}

export default Contribute;
