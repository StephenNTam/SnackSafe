import React from 'react';
import { useHistory } from 'react-router-dom';
import Autocomplete from './Autocomplete';

function Result() {
    const history = useHistory();

    var search = history.location.state.options;
    const restaurantData = history.location.state.data.prop.options;

    console.log(restaurantData)

    const handleLinkClick = (rest) => {
        var splitstr = rest.split("~");
        var name = splitstr[0];
        var address = splitstr[1];

        restaurantData.map(temp => {
            if(temp.restaurantName == name && temp.restaurantAddress == address){
                history.push({
                    pathname: "/restaurantpage",
                    search: `?restaurant=${name}`,
                    state: { data: temp },
                });
            }
        })
    }

    const handleAdd = () => {
        history.push({
            pathname: "/contribute"
        });
    }

    if(search.filteredOptions){
        console.log(search.filteredOptions)
    } else {
        console.log(search.e)
    }

    return (
        <div className="result-page">
            <Autocomplete options = {restaurantData} />
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
                            <li className="result-list-items" onClick={() => handleLinkClick(search.e)}>
                                {search.e}
                            </li>
                        </ul>
                    </div>
                )}
            </div>
            <div style={{marginLeft:"5em"}}>Don't see your restaurant? <a className="add-link" onClick={() => handleAdd()}>Add it!</a></div>
        </div>
  );
}

export default Result;