import React, {useState} from 'react';
import fire from "../fire";
import { useHistory } from 'react-router-dom';
import Allergies from '../variables/allergies';

//Contacts Page
function ReviewForm() {
  const history = useHistory();

  const [isLoaded, setIsLoaded] = useState(false);

  const db = fire.firestore();

  const [restaurantID, setrestaurantID] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [username, setUserName] = useState("");
  const [date, setDate] = useState("");
  const [accommodationComment, setAccommodationComment] = useState("");
  const [accommodationRating, setAccommodationRating] = useState(0);
  const [foodComment, setFoodComment] = useState("");
  const [foodRating, setFoodRating] = useState(0);
  const [safeAllergy, setSafeAllergy] = useState([]);
  const [carefulAllergy, setCarefulAllergy] = useState([]);
  const [formError, setFormError] = useState(0);

  if(!isLoaded){
      setrestaurantID(history.location.state.data.restaurantID);
      setRestaurantName(history.location.state.data.restaurantName);
      setUsername(fire.auth().currentUser.email);
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
  }

  const dateCheck = (date) =>{
    const regex = new RegExp("^([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{2})","gm");
    return regex.test(date);
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

  async function setUsername(user){
    const UD = db.collection("users").doc(user);
    await UD.get().then(doc => {
        setUserName(doc.data().userName)
    });
  }

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
            <input defaultValue={username} name="username" id="username"
                onChange={(evt) => {
                    var currentUserName = evt.target.value;
                    setUserName(currentUserName)
                }} required />
            <br/>
            <br/>

            <div style={{float:"left",paddingRight:"3em"}}>
                <div>
                    <label for="rating" style={{padding:5}}>*How well did the restaurant<br/>accommodate for your allergies?</label>
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
                <textarea id = "myTextArea" rows = "5" cols = "50" style={{resize:"none"}}
                        onChange={(evt) => {
                            var currentComment = evt.target.value;
                            setAccommodationComment(currentComment)
                        }
                }/> 
            </div>

            <div>
                <div>
                    <label for="rating" style={{padding:5}}>*How was your <br/>overall dining experience? </label>
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
                <textarea id = "myTextArea" rows = "5" cols = "50" style={{resize:"none"}}
                        onChange={(evt) => {
                            var currentComment = evt.target.value;
                            setFoodComment(currentComment)
                        }
                }/> 
            </div>
            <br/>
            <div style={{float:"left",paddingRight:"15em"}}>
                *Accommodates For:
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
                Be Aware Of:
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
            <label for="date">*Date Visited (DD/MM/YY):</label><> </>
            <input defaultValue="" name="date" id="date" required
                onChange={(evt) => {
                    var currentDate = evt.target.value;
                    setDate(currentDate)
                }}/>
            </div>
            <br/>
                
            <div>
                <button onClick={(evt) => {
                evt.preventDefault();
                const form = document.getElementById("review-form");
                    if (form.checkValidity() === false || dateCheck(date) == false || foodRating == 0 || accommodationRating == 0) {
                        setFormError(1)
                        console.log(form.checkValidity())
                        console.log(foodRating)
                        console.log(accommodationRating)
                        return;
                    }
                    handleAddReview();
                    history.goBack();
                }}>Add Review</button>

                <button style={{marginLeft:"1em"}} onClick={() => {
                    history.goBack();
                }}>
                    Cancel
                </button>
            
            </div>
            </form>
            <div>
                {formError ? 
                (
                <div>
                    Please fill out all required fields properly.
                </div>
                )
                :
                (
                <></>
                )}
            </div>
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
