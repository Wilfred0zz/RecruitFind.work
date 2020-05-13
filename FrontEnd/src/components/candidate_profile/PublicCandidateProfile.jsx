import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class PublicCandidateProfile extends Component {
  constructor(props){
    super(props)
    this.state = {
      redirect: false,
      fetched_data: false,
      email_user: '',
      profileInterests: [],
      experiences: [],
      profileLinks: [],

      candidate_current_position: "",
      candidate_description: "",
      candidate_highest_level_of_education: "",
      candidate_school: "",
      name_of_interest_1: "",
      name_of_interest_2: "",
      name_of_interest_3: "",
      interest_count: 1,

      link_1: "",
      link_2: "",
      link_3: "",
      type_of_link_1: "",
      type_of_link_2: "",
      type_of_link_3: "",

      check_state: false,
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

      email: "",
      first_name: "",
      gender: "",
      last_name: "",
      personal_city: "",
      personal_country: "",
      personal_postal: 0,
      personal_state: "",
      personal_street_address: "",
      phone_number: "",
      status: "Candidate",
    }
  }
  
  getAllInformation = async (email) => {
    const data = {
      email: email
    }

    const response = await fetch('/api/fetchCandidatePage', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    });

    const status = response.status;
    if(status >= 400){
      if(status === 401){
        alert("Please Login");
        setTimeout(()=>{
          this.setState({
            redirect: true,
          }        
        )}, 2000)
      }
      const error = await response.json();
      if(!error.error){
        console.log("User doen't exist");
        return;
      }
      else{
        console.log(" I am in here", error.error);
        return;
      }
    }
    const result = await response.json();
    // console.log("testing", result);
    // console.log("the result", result[`name_of_interest_1`])
    // Candidate Info
    this.setState({
      email: result.email,
      first_name: result.first_name,
      gender: result.gender,
      last_name: result.last_name,
      personal_city: result.personal_city,
      personal_country: result.personal_country,
      personal_postal: result.personal_postal,
      personal_state: result.personal_state,
      personal_street_address: result.personal_street_address,
      phone_number: result.phone_number,
      candidate_current_position: result.candidate_current_position,
      candidate_description: result.candidate_description,
      candidate_highest_level_of_education: result.candidate_highest_level_of_education,
      candidate_school: result.candidate_school,
      name_of_interest_1: result.name_of_interest_1,
      name_of_interest_2: result.name_of_interest_2,
      name_of_interest_3: result.name_of_interest_3,

    }, () => this.checkNumberOfInterests());
    // Experiences
    for(let i = 1; i <= 5; i++){
      this.setState({
        [`description_${i}`]: result[`description_${i}`],
        [`end_date_${i}`]: result[`end_date_${i}`],
        [`present_${i}`]: result[`present_${i}`],
        [`role_title_${i}`]: result[`role_title_${i}`],
        [`start_date_${i}`]: result[`start_date_${i}`]
      })
    }
    this.checkNumberOfExperiences();
    // Skills
    for(let i=1; i <= 10; i++){
      if(`skill_${i}` in result){
        this.setState({
          skills: [...this.state.skills, result[`skill_${i}`]]
        })
      }
      else{
        break;
      }
      // Links
      for(let i = 1; i < 4; i++){
        this.setState({
          [`link_${i}`]: result[`link_${i}`],
          [`type_of_link_${i}`]: result[`type_of_link_${i}`],
        })
      }
      this.checkNumberOfLinks();
      // To render everything at once
      this.setState({
        fetched_data: true,
      })
    }
  }

  checkNumberOfInterests = () => {
    const temp = [];
    console.log(this.state);
    for(let i = 1; i < 4; i++) {
      if(this.state[`name_of_interest_${i}`].length > 0){
        temp.push(1);
      }
    }
    this.setState({
      profileInterests: temp
    })
  }

  checkNumberOfExperiences = () => {
    const temp = [];
    for(let i = 1; i < 6; i++) {
      if(this.state[`description_${i}`].length > 0){
        temp.push(1);
      }
    }
    this.setState({
      experiences: temp
    })
  }

  checkNumberOfLinks = () =>{
    const temp = [];
    for(let i = 1; i < 4; i++) {
      if(this.state[`link_${i}`].length > 0){
        temp.push(1);
      }
    }
    this.setState({
      profileLinks: temp
    })
  }

  componentDidMount = async () => {
    // alternative to getting URL
    // const result= window.location.href.split('/')
    // console.log(result[4]);
    console.log(this.props);
    if(this.props.email){
      var email = this.props.email;
      console.log("THe email at this point is: ", email)
    }
    else{
      var email = this.props.routeProps.match.params.email;
    }
    // const email = this.props.routeProps.match.params.email;
    // console.log(this.props.routeProps.match.params.email);
    console.log(email);
    try {
      await this.getAllInformation(email);
    } catch(error) {
      console.log(error)
    }
  }

  renderViewEndDate = (number) => {
    let end_date= `end_date_${number}`;
    let present= `present_${number}`;
    if(this.state[present]){
      return (
        <div>Currently Working</div>
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
      <div>
        {
          this.state.redirect
          ? <Redirect to='/'/>
          : null
        }
        {
          !this.state.fetched_data
          ? null
          : <div className='candidate_profile'>
              <p>This is the public profile</p>
              <div className='no_edit_candidate_profile'>
                <label>First Name: </label>
                <p>{this.state.first_name}</p>

                <label>Last Name:</label>
                <p>{this.state.last_name}</p>

                <label>Email: </label>
                <p>{this.state.email}</p>
                
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
              <br/>
              <div className='no_edit_candidate_links'>
                <label>Links:</label>
                {this.state.profileLinks.map((links, index) => {
                  return(
                  <div key={`link ${index+1}`}>
                    <label>{this.state[`type_of_link_${index+1}`]} - </label>
                    <span>{this.state[`link_${index+1}`]}</span>
                  </div>
                )})}
              </div>
              <br/>
              <div className='no_edit_candidate_experiences'>
                <label>Experiences: </label>
                {this.state.experiences.map((experience, index) => {
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
              <br/>
              <div className='no_edit_candidate_skills'>
                <label>Skills: </label>
                {this.state.skills.map((skill, index) =>{
                  return <span key={index}> {this.state.skills[`${index}`]}</span>
                })}
                <br/>
              </div>
            </div>
        }
      </div>
    )
  } 
}

export default PublicCandidateProfile;
