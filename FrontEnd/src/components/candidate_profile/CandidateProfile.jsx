import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class CandidateProfile extends Component{
  constructor(props){
    super(props);
    this.state = { 
      "first_time_login": false,
      "is_logged_in": true,
      "candidate_current_position": "",
      "candidate_description": "",
      "candidate_highest_level_of_education": "",
      "candidate_school": "",
      "is_deleted_1": "",
      "is_deleted_2": "",
      "is_deleted_3": "",
      "name_of_interst_1": 0,
      "name_of_interst_2": 0,
      "name_of_interst_3": 0,
    }
  }

  educationLevels = ['Some High School', 'High School Graduate/GED', 'Some College', "Associate's Degree", "Bachelor's Degree", "Master's Degree", "Doctoral or Professional Degree"]

  handleChange = (event) =>{
    this.setState({
      [event.target.name]: event.target.value
    }, ()=> console.log(this.state))
  } 

  fetchCandidateInfo = () => {

  }

  fetchCandidateExperiences = () => {

  }

  fetchCandidateSkills = () => {

  }

  fetchCandidateLinks = () => {

  }

  // need a fetch for candidate name, and description, etc.

  // Fetch All Data, and see if any information exists
  // if it doesnt, then set edit to true, with input values
  // else set edit to false, and just render view
  componentDidMount = async () => {
    try{
      const response = await fetch('/api/fetchCandidateProfileInfo', {
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
        if(result.errors){
          this.setState({
            first_time_login: true,
          })
        }
        else {
          console.log("User doesn't exist or isn't logged in and should be redirected to login");
          this.setState({
            is_logged_in: false
          })
        }
      } else { // gather other information about the canddiate and update state to render it
        console.log("Please get rest of the information");
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className='candidate_profile'>
        { // Redirect them to main page to log in, if they aren't logged in
          !this.state.is_logged_in 
          ? <Redirect to='/'/>
          : null
        }
        <h1>Welcome Candidate{/** Need to add name, API doesn't exist yet*/}</h1>
        {/* Check if the user registered for the first time */}
        {this.state.first_time_login ? 
          <div className='create_candidate_profile'>
            <div className='candidate_profile_info'>
              <label> School </label>
              <input name='candidate_school' onChange={this.handleChange}/>
              
              <select name='candidate_highest_level_of_education' onChange={this.handleChange}>
                <option value="none" hidden>Select your education level</option> 
                {this.educationLevels.map((educationLevel) => {
                  return (
                    <option key={educationLevel} value={educationLevel}> {educationLevel}</option>
                  )
                })}
                <option value='other'>Other</option>
              </select>
              
              <label> About </label>
              <input name='candidate_description' onChange={this.handleChange}/>
              
              <label> Current Position </label>
              <input name='candidate_current_position' onChange={this.handleChange}/>

              <label> Interests </label>
              <input name='name_of_interest_1' onChange={this.handleChange}/>
              <input name='name_of_interest_2' onChange={this.handleChange}/>
              <input name='name_of_interest_3' onChange={this.handleChange}/>
            </div>
            <div className="">

            </div>

          </div> 
        :
          <div>
            User View  
          </div>
        
        }
        {/* <form className='candidate_profile'>
          <div className='candidate_information' id='candidate_information'>
            <div className="register-inputs">
              <label className='candidate_school'> School: </label>
              <input type='text' name='candidate_school' placeholder='School' onChange={handleChange}/>
              <p>What is your highest level of education</p>
              <select name='candidate_highest_level_of_education' onChange={handleChange}>
                <option value="none" hidden>Select your education level</option> 
                {educationLevels.map((educationLevel) => {
                  return (
                    <option key={educationLevel} value={educationLevel}> {educationLevel}</option>
                  )
                })}
                <option value='other'>Other</option>
              </select>

              <label className='candidate_description'> About: </label> <br></br>
              <input type='text' name='candidate_description' placeholder='Tell us more about you ...' onChange={handleChange}/>
              <label className='candidate_current_position'> Current Role: </label>
              <input type='text' name='candidate_current_position' placeholder='e.g: student or tutor ...' onChange={handleChange}/>
            </div>
          </div>
        </form> */}
      </div>
    )
  }
}

export default CandidateProfile;
