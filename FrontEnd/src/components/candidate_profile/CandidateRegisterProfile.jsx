import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CandidateProfile from './CandidateProfile';

class CandidateRegisterProfile extends Component{
  constructor(props){
    super(props);
    this.state = { 
      first_time_login: true,
      is_logged_in: true,
      candidate_current_position: "",
      candidate_description: "",
      candidate_highest_level_of_education: "",
      candidate_school: "",
      name_of_interst_1: "",
      name_of_interst_2: "",
      name_of_interst_3: "",

      link_1: "",
      link_2: "",
      link_3: "",
      type_of_link_1: "",
      type_of_link_2: "",
      type_of_link_3: "",

      description_1: "",
      description_2: "",
      description_3: "",
      description_4: "",
      description_5: "",
      end_date_1: "",
      end_date_2: "",
      end_date_3: "",
      end_date_4: "",
      end_date_5: "",
      present_1: false,
      present_2: false,
      present_3: false,
      present_4: false,
      present_5: false,
      role_title_1: "",
      role_title_2: "",
      role_title_3: "",
      role_title_4: "",
      role_title_5: "",
      start_date_1: "",
      start_date_2: "",
      start_date_3: "",
      start_date_4: "",
      start_date_5: "",
    }
  }

  educationLevels = ['Some High School', 'High School Graduate/GED', 'Some College', "Associate's Degree", "Bachelor's Degree", "Master's Degree", "Doctoral or Professional Degree"]

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    }, ()=> console.log(this.state))
  } 

  handleCheckBox = (event) => {
    // event.preventDefault();
    console.log([event.target.name] , !this.state[event.target.name])
    this.setState({
      [event.target.name]: !this.state[event.target.name]
    }, () => console.log('I have touched the box: ', this.state))
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
        if(result.error){
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
              <br/>
              <label> About </label>
              <input name='candidate_description' onChange={this.handleChange}/>
                <br/>
              <label> Current Position </label>
              <input name='candidate_current_position' onChange={this.handleChange}/>
                <br/>
              <label> Interests (Note not all of them have to be filled)</label>
              <input name='name_of_interest_1' onChange={this.handleChange}/>
              <input name='name_of_interest_2' onChange={this.handleChange}/>
              <input name='name_of_interest_3' onChange={this.handleChange}/>
            </div>
              <br/>
            <div className="candidate_links">
              <p> Links: (Up to 3 allowed, not required) </p>

              <label>Type of Link </label>
              <input name='type_of_link_1' onChange={this.handleChange}/>
              <br/>
              <label>Link </label>
              <input name='link_1' onChange={this.handleChange}/>
              <br/>
              <label>Type of Link </label>
              <input name='type_of_link_2' onChange={this.handleChange}/>
              <br/>
              <label>Link </label>
              <input name='link_2' onChange={this.handleChange}/>
              <br/>
              <label>Type of Link </label>
              <input name='type_of_link_3' onChange={this.handleChange}/>
              <br/>
              <label>Link </label>
              <input name='link_3' onChange={this.handleChange}/>
            </div>
              <br/>
            <div className='Candidate Experiences'>
              <p>Experience 1</p>
              <label>Position</label>
              <input type='text' name='role_title_1' onChange={this.handleChange}/>
                <br/>
              <label>Decription</label>
              <input type='text' name='description_1' onChange={this.handleChange}/>
                <br/>
              <label>Start Date</label>
              <input type='date' name='start_date_1' onChange={this.handleChange}/>
                <br/>
              <label>End Date</label>
              {
                this.state.present_1 
                ? <div>
                    <input type='checkbox' name='present_1' onClick={this.handleCheckBox}/>
                    <label>Enter a Custom Date</label>
                  </div>
                : <div className='unchecked'>
                    <input type='date' name='end_date_1' onChange={this.handleChange}/>
                    <br/>
                    <input type='checkbox' name='present_1' onClick={this.handleCheckBox}/>
                    <label>Present</label>
                  </div>
              }
              
                <br/>
              

            </div>
              <br/>
            <div className='skills'>
                Skills
            </div>
          </div> 
        :
          <div>
            <CandidateProfile/> 
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

export default CandidateRegisterProfile;
