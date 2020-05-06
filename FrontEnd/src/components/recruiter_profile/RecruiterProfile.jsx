import React, { Component } from 'react';

class RecruiterProfile extends Component{
  constructor(props){
    super(props);
    this.state = { 
      first_time_login: true,
      is_logged_in: true,
      recruiter_company_updated: false,
      // Add personal information like location they live at, gender, and more if they wanna change
      company_edit: false,
      recruiter_city: "",
      recruiter_company: "",
      recruiter_company_street_address: "",
      recruiter_country: "",
      recruiter_position: "",
      recruiter_postal: 0,
      recruiter_state: "",
    }
  }
  
  handleChange = (event) =>{
    this.setState({
      [event.target.name]: event.target.value
    })
  } 
  
  handleGoogleChange = (event) =>{
    if(!event.formatted_address || event.formatted_address.split(',').length <= 3) {
      alert('please enter a specific location');
      return;
    }
    let [ address, city, state_zip, country ] = event.formatted_address.split(',');
    city = city.substr(1);
    country = country.substr(1);
    state_zip = state_zip.substr(1);
    let [ state, code ] = state_zip.split(" ");
    // code = parseInt(code);
    this.setState({
      recruiter_company_street_address: address,
      recruiter_state: state,
      recruiter_city: city,
      recruiter_postal: code,
      recruiter_country: country
    })
  } 
  render() {
    return (
      <div className='recruiter-profile'>

        Hello World
      </div>
    )
  }
}

export default RecruiterProfile;
