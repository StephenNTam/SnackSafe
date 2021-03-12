import React, { useState, useEffect } from 'react'
import fire from '../fire';
import { useHistory } from 'react-router-dom';

function Result(prop) {
    const history = useHistory();

    const search = history.location.state.options

    if(search.filteredOptions){
        console.log("filtered")
    } else {
        console.log(search)
    }


    return (
        <div className="error-page">
            <h1>Searched: {  }</h1>
        </div>
  );
}

export default Result;