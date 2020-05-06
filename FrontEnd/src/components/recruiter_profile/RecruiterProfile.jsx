import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Autocomplete from 'react-google-autocomplete';
import NavigationBarRecruiter from './navigation_bar_recruiter/NavigationBarRecruiter';

class RecruiterProfile extends Component{
  constructor(props){
    super(props);
    this.state = { 
      is_logged_in: true,
      recruiter_company_update: false,
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

  handleEdit = () => {
    this.setState({
      recruiter_company_update: true 
    })
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
      const result = await response.json();

      if (status === 400 || status === 500) {
        // If I dont get an error it means user isn't logged in
        if(!result.error || result.error === 'User Not Authenticated!') {
          console.log("User doesn't exist or isn't logged in and should be redirected to login");
          this.setState({
            is_logged_in: false
          })
        }
      } else { // user already has info so not the first time they are registering, so redirect them
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

    try {
      const response = await fetch('/api/updateRecruiterProfileInfo',{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(data)
      });
      
      const status = response.status;
      const result = response.result;

      if(status === 400 || status === 500){
        console.log(result)
      }
      else{
        this.setState({
          recruiter_company_update: false
        })
      }
    } catch (error) {
       console.log(error);
    }
  }

  handleCancel = (event) => {
    event.preventDefault();
    this.setState({
      recruiter_company_update: false
    })
  }

  updateLogout = () => {
    this.setState({
      is_logged_in: false
    })
  }

  componentDidMount = async () => {
    await this.fetchRecruiterCompanyInfo();
  }

  render() {
    return (
      <div className='recruiter-profile'>
        { // Redirect them to main page to log in, if they aren't logged in
          !this.state.is_logged_in 
          ? <Redirect to='/'/>
          : null
        }
        <NavigationBarRecruiter updateLogout = {this.updateLogout}/>
        {this.state.recruiter_company_update ? 
          <div className='create_recruiter_profile'>
            <form className='recruiter_company_info'>
              <label> Company </label>
              <input name='recruiter_company' onChange={this.handleChange} value={this.state.recruiter_company}/>
              
              <label> Position </label>
              <input name='recruiter_position' onChange={this.handleChange} value={this.state.recruiter_position}/>

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
              <button onClick={this.handleCancel}>Cancel</button>
              <button onClick={this.handleSubmit}>Submit</button> 
            </form>
          </div> 
        :
        <div className='create_recruiter_profile'>
          <form className='recruiter_company_info'>
            <label> Company </label>
            <p>{this.state.recruiter_company}</p>
            
            <label> Position </label>
            <p>{this.state.recruiter_position}</p>

            <label> Location </label>
              <p>{this.state.recruiter_company_street_address}, {this.state.recruiter_city}, {this.state.recruiter_state} {this.state.recruiter_postal} {this.state.recruiter_country}</p>
            <button onClick={this.handleEdit}>Edit</button> 
          </form>
        </div> 
        }
      </div>
    )
  }
}

export default RecruiterProfile;
