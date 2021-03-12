import React, { useState, useEffect } from 'react'
import fire from '../fire';
import '../App.css';
import Autocomplete from './Autocomplete';

//Main Screen Page
function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [restaurantData, setRestaurantData] = useState()
  const [targetSearch, setTargetSearch] = useState("")

  const db = fire.firestore();

  async function getRestaurants(){
    const rd = await db.collection("restaurants").get();
    setRestaurantData(rd.docs.map(doc => doc.data()))
  }

  if(!isLoaded){
    getRestaurants()
    setIsLoaded(true)
  }

  console.log(restaurantData);
  console.log(targetSearch);

  return (
    <div className="home">
      <div className="home-bg">
        <Autocomplete options = {restaurantData} />
      </div>
    </div>
  );
}

export default Home;
