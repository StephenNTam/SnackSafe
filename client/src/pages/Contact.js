import React, {useState, useEffect} from 'react';
import { Form } from 'react-bootstrap';

//Contacts Page
function Contact() {
  const [contactData, setContactData] = useState({ name:"", email:"", text:"" });

  return (
    <div className="contact">
      <div className="contact-bg">
        <div className="search-bg">
          <h1>Contact Info</h1>
          <form className="contact-form">
            <br/>
            <label for="full-name" style={{padding:5}}>Full Name:</label>
            <br/>
              <input name="creator" id="creator" required
                  onChange={(evt) => {
                      contactData.name = evt.target.value;
                      setContactData(contactData)
                  }}></input>
            <br />
            <br/>
            <label for="email" style={{padding:5}}>EMail:</label>
            <br/>
              <input name="email" id="email" required
                onChange={(evt) => {
                    contactData.email = evt.target.value;
                    setContactData(contactData)
                }}></input>
            <br />
            <br/>
            <label for="myTextArea" style={{padding:5}}>Mesage:</label>
            <br/>
            <textarea id = "myTextArea" rows = "3" cols = "50" required 
                onChange={(evt) => {
                    contactData.text = evt.target.value;
                    setContactData(contactData)
                }}/>
            <br/>
            <button onClick={(evt) => {
                evt.preventDefault();
                const form = evt.currentTarget;
                    if (form.checkValidity() === false) {
                    return;
                }
                //ADD FETCH HANDLER
                }}>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
  
}

export default Contact;
