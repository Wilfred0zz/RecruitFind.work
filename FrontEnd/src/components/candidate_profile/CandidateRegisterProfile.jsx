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
      name_of_interest_1: "",
      name_of_interest_2: "",
      name_of_interest_3: "",
      interest_count: 1,

      link_count: 1,
      link_1: "",
      link_2: "",
      link_3: "",
      type_of_link_1: "",
      type_of_link_2: "",
      type_of_link_3: "",

      count: 1,
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

  // in order to dynamizally creatae fields and options
  educationLevels = ['Some High School', 'High School Graduate/GED', 'Some College', "Associate's Degree", "Bachelor's Degree", "Master's Degree", "Doctoral or Professional Degree"]
  experiences = [1];
  profileLinks = [1];
  profileInterests=[1];

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
  
  renderEndDate = (number) => {
    let end_date= `end_date_${number}`;
    let present= `present_${number}`;
    if(this.state[present]){
      return (
        <div>
          <input type='checkbox' name={present} checked onClick={this.handleCheckBox}/>
          <label>Present</label>
        </div>
      )
    }
    else{
      return (
        <div className='unchecked'>
          <input type='date' name={end_date} onChange={this.handleChange}/>
          <br/>
          <input type='checkbox' name={present} onClick={this.handleCheckBox}/>
          <label>Present</label>
        </div>
      )
    }
  }

  handleCandidateProfileSubmission = async () => {
    const candidateProfile = {
      "candidate_school": this.state.candidate_school,
      "candidate_highest_level_of_education": this.state.candidate_highest_level_of_education,
      "candidate_description": this.state.candidate_description,
      "candidate_current_position": this.state.candidate_current_position,
      "is_candidate_profile_deleted": false,
      "name_of_interest_1": this.name_of_interest_1,
      "is_deleted_1": false,
      "name_of_interest_2": this.name_of_interest_2,
      "is_deleted_2": false,
      "name_of_interest_3": this.name_of_interest_3,
      "is_deleted_3": false,
    }

    try {
      const response = fetch('/api/candidateProfile', {
        headers: {
          'Accept': 'application/JSON',
          'Content-Type': 'application/JSON'
        },
        method: 'POST',
        body: JSON.stringify(candidateProfile)
      })

      const status = response.status;
      const result = response.result;

      if(status === 400 || 500){

      }
      else { 
        console.log('Candidate Profile Created')
      }
    } catch(error){
        console.log(error);
    }
  }

  increaseNumberOfExperiences = (event) => {
    event.preventDefault();
    if(this.experiences.length <5 ){
      this.experiences.push(1);
      this.setState({
        count: this.state.count + 1
      });
    }
    else {
      return(alert("No more than 5 allowed"));
    }
  }

  deleteRecentExperience = (event) => {
    event.preventDefault();
    const size = this.experiences.length;
    const description = `description_${size}`;
    const title = `role_title_${size}`;
    const start_date = `start_date_${size}`;
    const end_date = `end_date_${size}`;
    const present = `present_${size}`;

    // to change disply and delete one experience field
    this.experiences.pop();

    this.setState({
      [description]: '',
      [title]: '',
      [start_date]: '',
      [end_date]: '',
      [present]: '',
      count: this.state.count -1
    })
    
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    // submission for candidate profile
    const candidateProfile = {
      "candidate_school": this.state.candidate_school,
      "candidate_highest_level_of_education": this.state.candidate_highest_level_of_education,
      "candidate_description": this.state.candidate_description,
      "candidate_current_position": this.state.candidate_current_position,
      "is_candidate_profile_deleted": false,
      "name_of_interest_1": this.name_of_interest_1,
      "is_deleted_1": false,
      "name_of_interest_2": this.name_of_interest_2,
      "is_deleted_2": false,
      "name_of_interest_3": this.name_of_interest_3,
      "is_deleted_3": false,
    }


  }

  increaseLinks = (event) => {
    event.preventDefault();
    if(this.profileLinks.length <= 3){
      this.profileLinks.push(1);
      this.setState({
        link_count: this.state.link_count + 1
      });
    }
    else{
      return (alert("No more then 3 links allowed"));
    }
  }

  deleteRecentLink = (event) => {
    event.preventDefault();
    const size = this.profileLinks.length;
    const link =`link_${size}`;
    const type_of_link = `type_of_link_${size}`;

    this.profileLinks.pop();

    this.setState({
      [link]: '',
      [type_of_link]: '',
      link_count: this.state.link_count - 1
    });
  }

  increaseInterests = (event) => {
    event.preventDefault();
    if(this.profileInterests.length <= 3) {
      this.profileInterests.push(1);
      this.setState({
        interest_count: this.state.interest_count + 1
      });
    }
    else{
      return (alert("No more then 3 interests allowed"));
    }
  }

  deleteRecentInterest = (event) => {
    event.preventDefault();
    const size = this.profileInterests.length;
    const interest = `name_of_interest_${size}`;
    const type = `type_of_link_${size}`;

    this.profileInterests.pop();

    this.setState({
      [interest]: '',
      interest_count: this.state.interest_count - 1
    });
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
              <div>
                {
                  this.profileInterests.map((interest, index) => {
                    return (
                      <input name={`name_of_interest_${index+1}`} onChange={this.handleChange}/>
                      )
                  })
                }
              </div>
              {/* Button to add another link */}
              {
                (this.profileInterests.length < 3)
                ? <button onClick={this.increaseInterests}>+</button>
                : null
              }
              {/* Button to delete most recent link */}
              {
                (this.profileInterests.length > 1)
                ? <button onClick={this.deleteRecentInterest}>-</button>
                : null
              }
            </div>
              <br/>
            
            <div className="candidate_links">
              <p> Links: </p>
              {
                this.profileLinks.map((link, index) => {
                  return (
                    <div key ={index}>
                      <label>Type of Link </label>
                      <input name={`type_of_link_${index+1}`} onChange={this.handleChange}/>
                      <br/>
                      <label>Link </label>
                      <input name={`link_${index+1}`} onChange={this.handleChange}/>
                    </div>
                  )
                })
              }
              {/* Button to add another link */}
              {
                (this.profileLinks.length < 3)
                ? <button onClick={this.increaseLinks}>+</button>
                : null
              }
              {/* Button to delete most recent link */}
              {
                (this.profileLinks.length > 1)
                ? <button onClick={this.deleteRecentLink}>-</button>
                : null
              }
            </div>
              <br/>
            
            <div className='Candidate Experiences'>
              {
                this.experiences.map((experienceNumber, index)=>{
                  return (
                    <div key={index+1}>
                      <p>Experience {index+1}</p>
                      <label>Position</label>
                      <input type='text' name={`role_title_${index+1}`} onChange={this.handleChange}/>
                        <br/>
                      <label>Decription</label>
                      <input type='text' name={`description_${index+1}`} onChange={this.handleChange}/>
                        <br/>
                      <label>Start Date</label>
                      <input type='date' name={`start_date_${index+1}`} onChange={this.handleChange}/>
                        <br/>
                      <label>End Date</label>
                      {this.renderEndDate(index+1)}
                    </div>
                  )  
                })
              }
              {/* Button to add another experience */}
              {
                (this.experiences.length < 5)
                ? <button onClick={this.increaseNumberOfExperiences}>+</button>
                : null
              }
              {/* Button to delete most recent experience */}
              {
                (this.experiences.length > 1)
                ? <button onClick={this.deleteRecentExperience}>-</button>
                : null
              }
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
      </div>
    )
  }
}

export default CandidateRegisterProfile;
