import React, {useState, useEffect} from 'react';
import fire from "../fire";
import { useHistory } from 'react-router-dom';
import Allergies from '../variables/allergies';

//Contacts Page
function ReviewForm() {
  const history = useHistory();

  const [isLoaded, setIsLoaded] = useState(false);

  const [restaurantID, setrestaurantID] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [username, setUserName] = useState("Anonymous");
  const [date, setDate] = useState("");
  const [accommodationComment, setAccommodationComment] = useState("");
  const [accommodationRating, setAccommodationRating] = useState(0);
  const [foodComment, setFoodComment] = useState("");
  const [foodRating, setFoodRating] = useState(0);
  const [safeAllergy, setSafeAllergy] = useState([]);
  const [carefulAllergy, setCarefulAllergy] = useState([]);

  if(!isLoaded){
      setrestaurantID(history.location.state.data.restaurantID);
      setRestaurantName(history.location.state.data.restaurantName);
      setIsLoaded(true);
  }

  const onChangeSafe = (e) => {
    const uAllergies = safeAllergy;
    var index;
    if (e.target.checked) {
      uAllergies.push(e.target.value)
    } else {
      index = uAllergies.indexOf(e.target.value)
      uAllergies.splice(index, 1)
    }
    setSafeAllergy(uAllergies);
    console.log(safeAllergy)
  }

  const onChangeCareful = (e) => {
    const uAllergies = carefulAllergy;
    var index;
    if (e.target.checked) {
      uAllergies.push(e.target.value)
    } else {
      index = uAllergies.indexOf(e.target.value)
      uAllergies.splice(index, 1)
    }
    setCarefulAllergy(uAllergies);
    console.log(carefulAllergy)
  }

  async function handleAddReview() {
    db.collection("reviews").add({
      restaurantID: restaurantID,
      accommodationRating: accommodationRating,
      accommodationComment: accommodationComment,
      carefulAllergy: carefulAllergy,
      creatorID: fire.auth().currentUser.email,
      date: date,
      foodComment: foodComment,
      foodRating: foodRating,
      safeAllergy: safeAllergy,
      username: username
    })
  }

  const db = fire.firestore();

  const handleLogin = () => {
    history.push({
      pathname: "/login"
    });
  }

  return(
    <div className="add-review-form">
        {fire.auth().currentUser ? 
        (
        <div className="add-review-container">
            <h1>Review for {restaurantName}.</h1>
            <p>* required fields</p>
            <br/>
            <form id="review-form">

            <label for="username">Username:</label><> </>
            <input defaultValue="Anonymous" name="username" id="username"
                onChange={(evt) => {
                    var currentUserName = evt.target.value;
                    setUserName(currentUserName)
                }} required />
            <br/>

            <div style={{float:"left",paddingRight:"3em"}}>
                <div>
                    <label for="rating" style={{padding:5}}>*Accomodation Rating:</label>
                    <select name="rating" id="rating" required
                        onChange={(evt) => {
                            var currentRating = parseInt(evt.target.value);
                            setAccommodationRating(currentRating);
                        }}>
                        <option disabled selected value> </option>
                        <option value="1">1 star</option>
                        <option value="2">2 stars</option>
                        <option value="3">3 stars</option>
                        <option value="4">4 stars</option>
                        <option value="5">5 stars</option>
                    </select>
                </div>  
                <textarea id = "myTextArea" rows = "1" cols = "50"
                        onChange={(evt) => {
                            var currentComment = evt.target.value;
                            setAccommodationComment(currentComment)
                        }
                }/> 
            </div>

            <div>
                <div>
                    <label for="rating" style={{padding:5}}>*Food Rating:</label>
                    <select name="rating" id="rating" required
                        onChange={(evt) => {
                            var currentRating = parseInt(evt.target.value);
                            setFoodRating(currentRating);
                        }}>
                        <option disabled selected value>{null}</option>
                        <option value="1">1 star</option>
                        <option value="2">2 stars</option>
                        <option value="3">3 stars</option>
                        <option value="4">4 stars</option>
                        <option value="5">5 stars</option>
                    </select>
                </div>  
                <textarea id = "myTextArea" rows = "1" cols = "50"
                        onChange={(evt) => {
                            var currentComment = evt.target.value;
                            setFoodComment(currentComment)
                        }
                }/> 
            </div>
            <br/>
            <div style={{float:"left",paddingRight:"15em"}}>
                *Safe For:
                <span key="allergies"><br/>{Allergies.map(allergies => 
                    <form>
                        <input required type="checkbox" id={`safe${allergies}`} name={`safe${allergies}`} value={allergies} onChange={(e) => onChangeSafe(e)}/>
                        <label htmlFor={allergies}>
                            {allergies}
                        </label>
                    </form>
                    )}
                </span>
            </div>

            <div>
                Look Out For:
                <span key="allergies"><br/>{Allergies.map(allergies => 
                    <form>
                        <input type="checkbox" id={`care${allergies}`} name={`care${allergies}`} value={allergies} onChange={(e) => onChangeCareful(e)}/>
                        <label htmlFor={allergies}>
                            {allergies}
                        </label>
                    </form>
                    )}
                </span>
            </div>
            <br/>

            <div>
            <label for="date">Date Visited:</label><> </>
            <input defaultValue="MM/DD/YY" name="date" id="date"
                onChange={(evt) => {
                    var currentDate = evt.target.value;
                    setDate(currentDate)
                }}/>
            </div>
            <br/>
                
            <div><button onClick={(evt) => {
                evt.preventDefault();
                const form = document.getElementById("review-form");
                    if (form.checkValidity() === false || foodRating == "" || accommodationRating == "") {
                        console.log("please fill out required fields")
                    return;
                    }
                    handleAddReview();
                    history.goBack();
            }}>Add Review</button></div>
            </form>
        </div>
        )
        :
        (
        <div>
            You must be <a className="add-link" onClick={() => handleLogin()}>logged in</a> to contribute.
        </div>
        )}
    </div>
  );
  
}

export default ReviewForm;
