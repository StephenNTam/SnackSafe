import React, { useState } from 'react'
import fire from '../fire';
import '../App.css';
import Allergies from '../variables/allergies';
import Autocomplete from './Autocomplete';

//Main Screen Page
function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [restaurantData, setRestaurantData] = useState();
  const [searchType, setSearchType] = useState("restaurant");

  const db = fire.firestore();

  async function getRestaurants(){
    const rd = await db.collection("restaurants").get();
    setRestaurantData(rd.docs.map(doc => doc.data()))
  }

  if(!isLoaded){
    getRestaurants()
    setIsLoaded(true)
  }

  return (
    <div className="home">
      <div className="home-bg">
        <h1 style={{marginTop:"1em",fontSize:"50px",color:"#00b4cc",WebkitTextStrokeColor:"white",WebkitTextStrokeWidth:"2px"}}>Find a Restaurant</h1>
        <label for="serachType" style={{fontSize:"25px",padding:5,fontWeight:"bolder",color:"#00b4cc",WebkitTextStrokeColor:"white",WebkitTextStrokeWidth:"1px"}}>Search Type:</label><br/>
        <select name="searchType" id="searchType" required
                onChange={(evt) => {
                    var typeValue = evt.target.value;
                    setSearchType(typeValue);
                }}>
                <option value="restaurant">Restaurants/Location</option>
                <option value="allergy">Allergies</option>
        </select>
        {searchType === "restaurant" ?
        (
          <Autocomplete options = {restaurantData} type="rest" rd={restaurantData} />
        )
        :
        (
          <Autocomplete options = {Allergies} type="all" rd={restaurantData} />
        )}
      </div>
    </div>
  );
}

export default Home;
