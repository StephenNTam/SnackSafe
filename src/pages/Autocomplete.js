import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Autocomplete(prop){
    const history = useHistory();
    const [activeOptions, setActiveOptions] = useState(0);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [showOptions, setShowOptions] = useState(false);
    const [userInput, setUserInput] = useState('');

    const handleSearch = () => {
      if(filteredOptions != []){
        setUserInput('');
        history.push({
          pathname: "/result",
          search: `?search=${userInput}`,
          state: { options: {filteredOptions}, data: { prop }, userInput: {userInput} },
        });
      }
    }

    const handleClickOrEnter = (e) => {
      history.push({
        pathname: "/result",
        search: `?search=${e}`,
        state: { options: {e}, data: { prop }, userInput: {userInput} }
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
      var options = [];
      if(prop.type === "rest"){
        options = grabNames(prop);
      } else {
        options = prop.options;
      }
        
        setUserInput(e.currentTarget.value);

        const filteredOptions = options.filter(
          (optionName) =>
            optionName.toLowerCase().indexOf(userInput.toLowerCase()) > -1  
        );
        setActiveOptions(0);
        setFilteredOptions(filteredOptions.slice(0,7));
        setShowOptions(true);
        setUserInput(e.currentTarget.value)
    }

    const onClick = (e) => {
        setActiveOptions(0);
        setFilteredOptions([]);
        setShowOptions(false);
        setUserInput("");
        handleClickOrEnter(e.currentTarget.innerText);
      };

    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            setActiveOptions(0);
            setShowOptions(false);
            setUserInput("")
            handleClickOrEnter(filteredOptions[activeOptions]);
          } else if (e.keyCode === 38) {
            if (activeOptions === 0) {
              return;
            }
            setActiveOptions(activeOptions - 1);
          } else if (e.keyCode === 40) {
            if (activeOptions === filteredOptions.length - 1) {
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
            if(prop.type === "rest"){
              optionList = (
                <div className="no-options">
                  <em style={{marginLeft:"25%"}}>Cannot find restaurant.</em>
                </div>
              );
            } else {
              optionList = (
                <div className="no-options">
                  <em style={{marginLeft:"25%"}}>Cannot find Allergy.</em>
                </div>
              );
            }
          }
        }

        return(
          <React.Fragment>
            <div className="search">
              <input
                type="text"
                className="search-box"
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={userInput}
              />
              {prop.type === "rest" ? 
              (
                <button type="" value="" className="search-btn" onClick={() => {handleSearch()}}></button>
              )
              :
              (
                <div></div>
              )}
            </div>
            {optionList}
          </React.Fragment>
        );
} 

export default Autocomplete;