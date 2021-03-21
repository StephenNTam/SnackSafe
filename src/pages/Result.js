import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Autocomplete from './Autocomplete';
import fire from '../fire';

function Result() {
    const history = useHistory();

    const db = fire.firestore();

    var search = history.location.state.options;
    const restaurantData = history.location.state.data.prop.options;
    const rd = history.location.state.data.prop.rd;
    const type = history.location.state.data.prop.type;


    const [reviews, setReviews] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleLinkClick = (rest) => {
        console.log(rest)
        var splitstr = rest.split("~");
        var name = splitstr[0];
        var address = splitstr[1];

        rd.map(temp => {
            if(temp.restaurantName == name && temp.restaurantAddress == address){
                history.push({
                    pathname: "/restaurantpage",
                    search: `?restaurant=${name}`,
                    state: { data: temp },
                });
            }else{
                console.log("restaurant not found")
            }
        })
    }

    async function getReviews(){
        const rd = await db.collection("reviews").get();
        setReviews(rd.docs.map(doc => doc.data()))
      }

    const handleAdd = () => {
        history.push({
            pathname: "/contribute"
        });
    }

    const getRestByAll = () => {
        var temp = [];
        reviews.map(review => {
            if(review.safeAllergy.includes(search.e)){
                if(!temp.includes(review.restaurantID)){
                    temp.push(review.restaurantID.replace("+","~"))
                }
            }
        });
        console.log(temp)
        return temp;
    }

    if(search.filteredOptions){
        console.log(search.filteredOptions)
    } else {
        console.log(search.e)
    }

    if(!isLoaded){
        getReviews();
        setIsLoaded(true);
    }

    return (
        <div className="result-page">
            <Autocomplete options = {restaurantData} type={type} />
            <div className="result-list">
                {Array.isArray(search.filteredOptions) ? 
                    (
                    <div>
                        <h3 style={{marginLeft:"2em"}}>Recommended Restaurants: </h3>
                        <ul className="result-list-container">
                        {search.filteredOptions.map(restaurants => {
                            console.log(restaurants)
                            return(
                                <li className="result-list-items" onClick={() => handleLinkClick(restaurants)}>
                                    {restaurants}
                                </li>
                            );
                        }
                        )}
                        </ul>
                    </div>
                    )
                    :
                    (
                        <div>
                            <h3 style={{marginLeft:"2em"}}>Searched for: {search.e}</h3>
                            <ul className="result-list-container">
                                {type == "rest" ? 
                                (
                                <li className="result-list-items" onClick={() => handleLinkClick(search.e)}>
                                    {search.e}
                                </li>
                                )
                                :
                                (
                                <div>{reviews ? 
                                    (
                                    <div>
                                        {getRestByAll().map(restaurants => {
                                            return(
                                            <li className="result-list-items" onClick={() => handleLinkClick(restaurants)}>
                                                {console.log(restaurants)}
                                                {restaurants}
                                            </li>
                                            );
                                        })}
                                    </div>
                                    )
                                    :
                                    (
                                    <div>
                                        Loading ...
                                    </div>
                                    )}
                                </div>
                                )}
                            </ul>
                        </div>
                    )
                }
            </div>
            <div style={{marginLeft:"5em"}}>Don't see your restaurant? <a className="add-link" onClick={() => handleAdd()}>Add it!</a></div>
        </div>
  );
}

export default Result;