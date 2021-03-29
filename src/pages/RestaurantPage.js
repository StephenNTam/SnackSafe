import React, { useState } from 'react';
import fire from "../fire";
import { useHistory } from 'react-router-dom';

function RestaurantPage() {
    const history = useHistory();
    const restaurantData = history.location.state.data;
    const restaurantID = restaurantData.restaurantName.concat(`~${restaurantData.restaurantAddress}`);

    const db = fire.firestore();

    const [reviewData, setReviewData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    async function getReviews(){
        const rd = await db.collection("reviews").get();
        var placeHolder = [];
        rd.docs.map((doc) => {
            if(doc.data().restaurantID == restaurantID){
                placeHolder.push(doc.data())
            }
        })
        setReviewData(placeHolder);
    }

    const handleLogin = () => {
        history.push({
          pathname: "/login"
        });
    }

    const handleAddReview = () => {
        history.push({
            pathname: "/reviewform",
            search: `?reviewform=${restaurantID}`,
            state: { 
                data: {
                    restaurantID:restaurantID,
                    restaurantName:restaurantData.restaurantName
                 }
            }
        });
    }

    if(!isLoaded){
        getReviews();
        setIsLoaded(true);
    }

    return(
        <div>
            <div className="restaurant-page">
                <button onClick={() => history.goBack()}>Back</button>
                <h1>{restaurantData.restaurantName}</h1>
                <h5>{restaurantData.restaurantAddress}</h5>
                <br/>
                <h5>Hours</h5>
                <h6>{restaurantData.restaurantHours}</h6>
                <br/>
                <h5>Cuisine Type:</h5>
                <h6>{restaurantData.restaurantType}</h6>
                <br/>
                <h5>Contact Info</h5>
                <h6>Phone: {restaurantData.restaurantPhone}</h6>
                <h6>Website: <a href={restaurantData.restaurantWWW} target="_blank">{restaurantData.restaurantWWW}</a></h6>
                <br/>
                {fire.auth().currentUser ? 
                (
                    <button onClick={() => handleAddReview()}>
                        Add a review.
                    </button>
                    )
                    :
                    (
                    <div>
                        You must be <a className="add-link" onClick={() => handleLogin()}>logged in</a> to add a review..
                    </div>
                )}
            </div>
                <div className="review-area">
                    {reviewData ? 
                    (   
                        <div>
                            <h1 style={{paddingLeft:"2em",paddingTop:"2em",paddingBottom:"1em"}}>
                                Reviews
                            </h1>
                            {reviewData.length != 0 ? 
                            (
                            <div>
                                <ul className="review-container">
                                    {reviewData.map(review => 
                                        <li key={review}>
                                            <h3>{review.username}</h3>
                                            <div>{review.date}</div>
                                            <br />
                                            <div>Food Rating: {review.foodRating}/5</div>
                                            <div>Accommodation Comment: {review.accommodationComment}</div>
                                            <br/>
                                            <div>Accommodation Rating: {review.accommodationRating}/5</div>
                                            <div>Accommodation Comment: {review.accommodationComment}</div>
                                            <br/>
                                            <div>Accommodates For: {review.safeAllergy.map(allergy => 
                                                <li>- {allergy}</li>)}
                                            </div>
                                            <br/>
                                            <div>Be Aware Of: {review.carefulAllergy.map(allergy => 
                                                <li>- {allergy}</li>)}
                                            </div>
                                            <div></div>
                                        </li>
                                    )}
                                </ul>
                                <br/>
                            </div>
                            )
                            :
                            (
                                <h5 style={{paddingLeft:"4em"}}>No Reviews Yet</h5>
                            )}
                        </div>
                    )
                    :
                    (
                        <h1 style={{padding:"2em"}}>
                            Loading ...
                        </h1>
                    )}   
                </div>
        </div>
    );
}

export default RestaurantPage;