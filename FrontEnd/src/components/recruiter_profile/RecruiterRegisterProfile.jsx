import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Autocomplete from 'react-google-autocomplete';

class RecruiterRegisterProfile extends Component{
  constructor(props){
    super(props);
    this.state = { 
      // first_time_login: true,
      is_logged_in: true,
      recruiter_company_update: false,
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

      const status = response.status;
      const result = await response.json();

      if (status === 400 || status === 500) {
        alert(result.error);
      } else { // gather other information about the canddiate and update state to render it
        this.setState({
          recruiter_company_update: true
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Fetch All Data, and see if any information exists
  // if it does set company_update tot rue cause it already exists
  fetchRecruiterCompanyInfo = async () => {
    try{
      const response = await fetch('/api/fetchRecruiterProfileInfo', {
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'GET',
      });

      const status = response.status;

      if (status === 400 || status === 500) {
        if(status === 401){
          this.setState({
            is_logged_in: false,
          })
        }
        var result = await response.json();
        // If I dont get an error it means user isn't logged in
        if(!result.error) {
          console.log("User doesn't exist or isn't logged in and should be redirected to login");
          this.setState({
            is_logged_in: false
          })
        }
      } else { // user already has info so not the first time they are registering, so redirect them
        // const { recruiter_city, recruiter_company, recruiter_company_street_address, recruiter_country, recruiter_position, recruiter_postal, recruiter_state } = result;
        this.setState({
          recruiter_company_update: true
        }, () => console.log(this.state))
      }
    } catch (error) {
      console.log(error);
    }
  }

  // need a fetch for candidate name, and description, etc.

  componentDidMount = async () => {
    await this.fetchRecruiterCompanyInfo();
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
        {/* Check if the user registered for the first time by looking at update state*/}
        {!this.state.recruiter_company_update ? 
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
                  this.handleGoogleChange(place);
                }}
                types={['geocode', 'establishment']}
                componentRestrictions={{country: "us"}}
              /> 
              <button onClick={this.handleSubmit}>Submit</button> 
            </form>
          </div> 
        :
          <Redirect to="/recruiter_profile"/>
        }
      </div>
    )
  }
}

export default RecruiterRegisterProfile;
