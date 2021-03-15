import React, { useState, useEffect } from 'react'
import fire from '../fire';
import '../App.css';
import Autocomplete from './Autocomplete';

//Main Screen Page
function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [restaurantData, setRestaurantData] = useState();

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
        <Autocomplete options = {restaurantData} />
      </div>
    </div>
  );
}

export default Home;
