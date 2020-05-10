import React, { Component } from 'react';

class CandidateProfile extends Component {
  constructor(props){
    super(props)
    this.state = {
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

      skill_count:0,
      skills: [],
      skill_1: "",
      skill_2: "",
      skill_3: "",
      skill_4: "",
      skill_5: "",
      skill_6: "",
      skill_7: "",
      skill_8: "",
      skill_9: "",
      skill_10: "",

      // Edits
      skill_edit: false,
      experiences_edit: false,
      links_edit: false,
      candidate_edit: false,
    }
  }
  
  // in order to dynamizally create fields and options
  educationLevels = ['Some High School', 'High School Graduate/GED', 'Some College', "Associate's Degree", "Bachelor's Degree", "Master's Degree", "Doctoral or Professional Degree"]
  profileInterests=[];
  experiences = [];
  profileLinks = [];

  // CANDIDATE PROFILE INFO ––––––––––––––––––
  fetchCandidateInfo = async () => {
    const response = await fetch('/api/fetchCandidateProfileInfo')
    const status = response.status;
    
    if(status >= 400) {
      this.setState({
          is_logged_in: false
      }, () => {throw Error(alert("There is an error in getting candidate porfile information"))});
    } else {
      const result = await response.json();
      console.log(result);
      this.setState({
        candidate_current_position: result.candidate_current_position,
        candidate_description: result.candidate_description,
        candidate_highest_level_of_education: result.candidate_highest_level_of_education,
        candidate_school: result.candidate_school,
        name_of_interest_1: result.is_deleted_1,
        name_of_interest_2: result.is_deleted_2,
        name_of_interest_3: result.is_deleted_3,
      }, () => {
        console.log(this.state);
        // ensure we render appropriate number of interests in view
        this.checkNumberOfInterests();
        console.log("the # profile interests are: ", this.profileInterests.length);
        console.log("Candidate Profile Received");
      })
    }
  }

  checkNumberOfInterests = () => {
    for(let i = 1; i < 4; i++) {
      if(this.state[`name_of_interest_${i}`].length > 0){
        this.profileInterests.push(1);
      }
    }
  }

  // CANDIDATE EXPERIENCES –––––––––––––––––––
  fetchCandidateExperiences = async () => {
    const response = await fetch('/api/fetchCandidateExperiences');
    const status = response.status;

    if(status >= 400) {
      throw Error(alert('There is an error in getting candidate experiences information'))
    } else {
      const result = await response.json();
      for(let i = 1; i <= 5; i++){
        this.setState({
          [`description_${i}`]: result[`description_${i}`],
          [`end_date_${i}`]: result[`end_date_${i}`],
          [`present_${i}`]: result[`present_${i}`],
          [`role_title_${i}`]: result[`role_title_${i}`],
          [`start_date_${i}`]: result[`start_date_${i}`]
        })
      }
      console.log(this.state);
      this.checkNumberOfExperiences();
      console.log("Number of experiences is: ", this.experiences.length);
    }
  }

  checkNumberOfExperiences =  () => {
    for(let i = 1; i < 6; i++) {
      if(this.state[`description_${i}`].length > 0){
        this.experiences.push(1);
      }
    }
  }

  fetchCandidateSkills = async () => {
    const response = await fetch ('/api/fetchCandidateSkills')
    const status = response.status;

    if(status >= 400){
      throw Error(alert('There is an error in getting candidate experiences information'));
    }
    else {
      const result = await response.json();
      if(result.status_info === 'User Has No Skills!'){
        alert(result.status_info);
      }
      const values = Object.values(result);
      for(let i=1; i <= values.length/2; i++){
        this.setState({
          skills: [...this.state.skills, result[`skill_${i}`]]
        })
      }
      console.log(this.state);
      console.log("the number of skills is: ", this.state.skills.length);
    }
  }

  fetchCandidateLinks = async () => {
    const response = await fetch('/api/fetchCandidateLinks');
    const status = response.status;
    const result = await response.json();

    if(status >= 400){
      throw Error(alert(result.error));
    } else {
      for(let i = 1; i < 4; i++){
        this.setState({
          [`link_${i}`]: result[`link_${i}`],
          [`type_of_link_${i}`]: result[`type_of_link_${i}`],
        })
      }
      console.log(this.state);
      this.checkNumberOfLinks();
      console.log("The number of links are: ", this.profileLinks.length)
    }
  }

  checkNumberOfLinks = () =>{
    for(let i = 1; i < 4; i++) {
      if(this.state[`link_${i}`].length > 0){
        this.profileLinks.push(1);
      }
    }
  }

  componentDidMount = async () => {
    try {
      await this.fetchCandidateInfo();
      await this.fetchCandidateLinks();
      await this.fetchCandidateExperiences();
      await this.fetchCandidateSkills();
    } catch(error) {
      console.log(error)
    }
  }

  // change from view to edit mode for specific section of the profile
  handleEditClick = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: !this.state[event.target.name],
    })
  }
  // renderInterests = () => {
  //   for(let i = 1; i <= this.profileInterests; i++){
  //     return <p>{this.state[`name_of_interest_${i}`]}</p>
  //   }
  // }

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

  renderViewEndDate = (number) => {
    let end_date= `end_date_${number}`;
    let present= `present_${number}`;
    if(this.state[present]){
      return (
        <p>Currently Working</p>
      )
    }
    else{
      return (
        <div className='unchecked'>
          <span> End Date: {this.state[end_date]}</span>
        </div>
      )
    }
  }

  render() {
    return (
      <div className='candidate_profile'>
        {
          this.state.candidate_edit
          ? null
          : <div className='no_edit_candidate_profile'>
              <label>Position: </label>
              <span>{this.state.candidate_current_position}</span>
              <br/>
              <label>Description: </label>
              <span>{this.state.candidate_description}</span>
              <br/>
              <label>School: </label>
              <span>{this.state.candidate_school}</span>
              <br/>
              <label>Interests: </label>
              <br/>
              {
                this.state.name_of_interest_1.length > 1
                ? <span>{this.state.name_of_interest_1} </span>
                : null
              }
              {
                this.state.name_of_interest_2.length > 1
                ? <span>{this.state.name_of_interest_2} </span>
                : null
              }
              {
                this.state.name_of_interest_3.length > 1
                ? <span>{this.state.name_of_interest_3}</span>
                : null
              }
            </div>
        }
        <br/>
        {
          this.state.links_edit
          ? null
          : <div className='no_edit_candidate_links'>
              <label>Links:</label>
              {this.profileLinks.map((links, index) => {
                return(
                <div key={`link ${index+1}`}>
                  <label>{this.state[`type_of_link_${index+1}`]} </label>
                  <span>{this.state[`link_${index+1}`]}</span>
                </div>
              )})}
            </div>
        }
        <br/>
        {
          this.state.experiences_edit
          ? null
          : <div className='no_edit_candidate_experiences'>
              <label>Experiences: </label>
              {this.experiences.map((experience, index) => {
                  return (
                    <div key={index+1}>
                      <span>Experience {index+1}</span>
                      <br/>
                      <label>Position: </label>
                      <span>{this.state[`role_title_${index+1}`]}</span> 
                        <br/>
                      <label>Decription</label>
                      <span>{this.state[`description_${index+1}`]}</span>
                        <br/>
                      <label>Start Date: </label>
                      <span>{this.state[`start_date_${index+1}`]}</span>
                        <br/>
                      {this.renderViewEndDate(index+1)}
                    </div>
                  ) 
                })
              }
            </div>
        }
        <br/>
        <label>Skills: </label>
        {
          this.state.skill_edit
          ? null
          : <span className='no_edit_candidate_skills'>
              <span>{this.state.skills[1]}</span>
              {this.state.skills.map((skill, index) =>{
                if(index === 0){
                  return null;
                }
                else{
                  return <span> {this.state[`${index+1}`]}</span>
                }
              })}
            </span>
        }
      </div>
    )
  } 
}

export default CandidateProfile;
