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
    }
  }
  
  // in order to dynamizally create fields and options
  educationLevels = ['Some High School', 'High School Graduate/GED', 'Some College', "Associate's Degree", "Bachelor's Degree", "Master's Degree", "Doctoral or Professional Degree"]
  profileInterests=[1];

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
    for(let i = 2; i < 4; i++) {
      if(this.state[`name_of_interest_${i}`].length > 0){
        this.profileInterests.push(1);
      }
    }
  }

  fetchCandidateExperiences = () => {
      
  }

  fetchCandidateSkills = () => {

  }

  fetchCandidateLinks = () => {

  }

  componentDidMount = async () => {
    try {
      await this.fetchCandidateInfo();
    } catch(error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div>
        Hello Candidate
      </div>
    )
  } 
}

export default CandidateProfile;
