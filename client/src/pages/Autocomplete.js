import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Autocomplete(prop){
    console.log(prop.options)

    const history = useHistory();
    const [activeOptions, setActiveOptions] = useState(0);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [showOptions, setShowOptions] = useState(false);
    const [userInput, setUserInput] = useState('');

    const handleSearch = () => {
      history.push({
        pathname: "/result",
        search: `?search=${userInput}`,
        state: { options: {filteredOptions} }
      });
    }

    const handleClickOrEnter = (e) => {
      history.push({
        pathname: "/result",
        search: `?search=${e}`,
        state: { options: {e} }
      });
    }

    const grabNames = (list) => {
      var nameOptions = []
      for(var i = 0; i < list.options.length; i++){
        nameOptions.push(list.options[i].restaurantName.concat("~".concat(list.options[i].restaurantAddress)))
      }
      return nameOptions;
    }

    const onChange = (e) => {
        const options = grabNames(prop);
        
        setUserInput(e.currentTarget.value);

        const filteredOptions = options.filter(
          (optionName) =>
            optionName.toLowerCase().indexOf(userInput.toLowerCase()) > -1  
        );

        setActiveOptions(0);
        setFilteredOptions(filteredOptions);
        setShowOptions(true);
        setUserInput(e.currentTarget.value)
    }

    const onClick = (e) => {
        setActiveOptions(0);
        setFilteredOptions([]);
        setShowOptions(false);
        setUserInput(e.currentTarget.innerText);
        handleClickOrEnter(e.currentTarget.innerText);
      };

    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            setActiveOptions(0);
            setShowOptions(false);
            setUserInput(filteredOptions[activeOptions])
            handleClickOrEnter();
          } else if (e.keyCode === 38) {
            if (activeOptions === 0) {
              return;
            }
            setActiveOptions(activeOptions - 1);
          } else if (e.keyCode === 40) {
            if (activeOptions === filteredOptions.length - 1) {
              console.log(activeOptions);
              return;
            }
            setActiveOptions(activeOptions + 1);
          }
        };

        let optionList;
        if (showOptions && userInput) {
          if (filteredOptions.length) {
            optionList = (
              <ul className="options">
                {filteredOptions.map((optionName, index) => {
                  let className;
                  if (index === activeOptions) {
                    className = 'option-active';
                  }
                  return (
                    <li className={className} key={optionName} onClick={onClick}>
                      {optionName}
                    </li>
                  );
                })}
              </ul>
            );
          } else {
            optionList = (
              <div className="no-options">
                <em>No Option!</em>
              </div>
            );
          }
        }

        return(
          <React.Fragment>
            <h1 style={{marginTop:"1em",fontSize:"50px",color:"#00b4cc",WebkitTextStrokeColor:"white",WebkitTextStrokeWidth:"2px"}}>Find a Restaurant</h1>
            <div className="search">
              <input
                type="text"
                className="search-box"
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={userInput}
              />
              <button type="" value="" className="search-btn" onClick={() => {handleSearch()}}></button>
            </div>
            {optionList}
          </React.Fragment>
        );
} 

export default Autocomplete;