import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Autocomplete from 'react-google-autocomplete';
import RecruiterExistsProfile from './RecruiterExistsProfile';

class RecruiterProfile extends Component{
  constructor(props){
    super(props);
    this.state = { 
      first_time_login: true,
      is_logged_in: true,
      recruiter_company_updated: false,
      // Add personal information like location they live at, gender, and more if they wanna change
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
    }, ()=> console.log(this.state))
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

  handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      "recruiter_company": this.state.recruiter_company,
      "recruiter_position": this.state.recruiter_position,
      "recruiter_company_street_address": this.state.recruiter_company_street_address,
      "recruiter_city": this.state.recruiter_city,
      "recruiter_postal": this.state.recruiter_postal,
      "recruiter_country": this.state.recruiter_country,
      "recruiter_state": this.state.recruiter_state,
      "is_deleted": false
    }

    try{
      const response = await fetch('/api/recruiterProfile', {
        headers:{
          // 'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
      });
      // console.log(response);
      const status = response.status;
      const result = await response.json();

      if (status === 400 || status === 500) {
        console.log("this is the result, ", data)
      } else { // gather other information about the canddiate and update state to render it
        this.setState({
          recruiter_company_updated: true
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  fetchRecruiterCompanyInfo = async (event) => {

  }

  // need a fetch for candidate name, and description, etc.

  // Fetch All Data, and see if any information exists
  // if it doesnt, then set edit to true, with input values
  // else set edit to false, and just render view
  componentDidMount = async () => {
    try{
      const response = await fetch('/api/fetchRecruiterProfileInfo', {
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'GET',
      });

      const status = response.status;
      const result = await response.json();

      if (status === 400 || status === 500) {
        // alert(result.error);
        // If I get an error I need to check the error message
        if(!result.error) {
          console.log("User doesn't exist or isn't logged in and should be redirected to login");
          this.setState({
            is_logged_in: false
          })
        }
      } else { // update state
        const { recruiter_city, recruiter_company, recruiter_company_street_address, recruiter_country, recruiter_position, recruiter_postal, recruiter_state } = result;
        this.setState({
          recruiter_city: recruiter_city,
          recruiter_company: recruiter_company,
          recruiter_company_street_address: recruiter_company_street_address,
          recruiter_country: recruiter_country,
          recruiter_position: recruiter_position,
          recruiter_postal: recruiter_postal,
          recruiter_state: recruiter_state
        }, () => console.log(this.state))
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className='recruiter_profile'>
        { // Redirect them to main page to log in, if they aren't logged in
          !this.state.is_logged_in 
          ? <Redirect to='/'/>
          : null
        }
        <h1>Welcome Recruiter{/** Need to add name, API doesn't exist yet*/}</h1>
        {/* Check if the user registered for the first time */}
        {!this.state.recruiter_company_updated ? 
          <div className='create_recruiter_profile'>
            <form className='recruiter_company_info'>
              <label> Company </label>
              <input name='recruiter_company' onChange={this.handleChange}/>
              
              <label> Position </label>
              <input name='recruiter_position' onChange={this.handleChange}/>

              <label> Location </label>
              <Autocomplete
                required
                style={{width:'50%'}}
                onPlaceSelected={(place) => {
                  console.log(place);
                  this.handleGoogleChange(place);
                }}
                types={['geocode', 'establishment']}
                componentRestrictions={{country: "us"}}
              /> 
              <button onClick={this.handleSubmit}>Submit</button> 
            </form>
          </div> 
        :
          <div>
            <RecruiterExistsProfile/>
          </div>
        
        }
      </div>
    )
  }
}

export default RecruiterProfile;
