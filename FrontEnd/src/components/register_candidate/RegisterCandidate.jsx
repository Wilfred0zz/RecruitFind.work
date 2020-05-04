import React, { Component } from 'react';
import Autocomplete from 'react-google-autocomplete';

import { Redirect } from 'react-router-dom';

class CandidateRegister extends Component{
  constructor(props){
    super(props);
    this.state = { 
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      gender: '',
      personal_street_address: '',
      personal_state: '',
      personal_city: '',
      personal_postal: 0,
      personal_country: '',
      phone_number: ''
    }
  }

  handleChange = (event) =>{
    this.setState({
      [event.target.name]: event.target.value
    })
  } 

  handleGoogleChange = (event) =>{
    const code = parseInt(event.address_components[7].long_name);
    const state = event.address_components[5].short_name;
    const address = event.address_components[0].long_name + ' '+ event.address_components[1].long_name;
    const country = event.address_components[6].short_name;
    const city = event.address_components[2].short_name;
    this.setState({
      "personal_street_address": address, 
      "personal_city": city,
      "personal_state": state, 
      "personal_postal": code, 
      "personal_country": country, 
    })
  }

  redirectCandidateProfile = async (event) =>{
    event.preventDefault();
    console.log('form filled');
    const user = {
      "email": this.state.email, 
      "password": this.state.password, 
      "first_name": this.state.first_name, 
      "last_name": this.state.last_name, 
      "personal_street_address": this.state.personal_street_address, 
      "personal_city": this.state.personal_city,
      "personal_state": this.state.personal_state, 
      "personal_postal": this.state.personal_postal, 
      "personal_country": this.state.personal_country, 
      "phone_number": this.state.phone_number, 
      "status": "candidate", 
      "gender": this.state.gender
    }
    
    try {
      const response = await fetch('/api/register', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify(user)
        });
      console.log(JSON.stringify(user));
      const status = response.status;   
      const result = await response.json();

      if (status === 400 || status === 500) {
        alert(result.error);
      } else {
        console.log(result.status_info);
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className='register-candidate'>
        <h1>Welcome Candidate</h1>
        <div className="register-inputs">
          <form className='log-in-form'>
              <div className='personal-information'>
                <label className='first_name'> First Name: </label>
                <input type='text' name='first_name' placeholder='First Name' onChange={this.handleChange}/>
                <label className='last_name'> Last Name: </label>
                <input type='text' name='last_name' placeholder='Last Name' onChange={this.handleChange}/>
                <label className='email'> Email: </label>
                <input type='text' name='email' placeholder='Email' onChange={this.handleChange}/>
                <label className='password'> Password: </label>
                <input type='text' name='password' placeholder="Password" onChange={this.handleChange}/>
                <select onChange={this.handleChange} name='gender'>
                  <option value="none" hidden> 
                    gender
                  </option> 
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
                  <option value='Other'>Other</option>
                </select>
                <p> Address </p>
                {/* Google Places API to return a location information */}
                <Autocomplete
                  style={{width: '50%'}}
                  onPlaceSelected={(place) => {
                    console.log(place);
                    this.handleGoogleChange(place);
                  }}
                  types={['geocode', 'establishment']}
                  componentRestrictions={{country: "us"}}/>

                <p> Contact </p>
                <label className='phone_number'> Phone Number: </label>
                <input type='tel' name='phone_number' placeholder='xxx-xxx-xxxx' onChange={this.handleChange}/>
              </div>
              <button onClick={this.redirectCandidateProfile}>Register</button>
            </form>
        </div>
      </div>
    )
  }
}

export default CandidateRegister;
