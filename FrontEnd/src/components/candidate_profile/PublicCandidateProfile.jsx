import React, { Component } from 'react';

class PublicCandidateProfile extends Component {
  constructor(props){
    super(props)
    console.log("what is in my props: ",props)
    this.state = {
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
    // console.log(email)
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
        throw Error(alert("You aren't authoritzed"));
      }
      else if(!response){
        throw Error(alert("Cannot Access Candidate Data"))
      }
      else{
        throw Error(await response.json().error);
      }
    }
    const result = await response.json();
    console.log("testing", result);
    console.log("the result", result[`name_of_interest_1`])
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
      name_of_interest_1: result.name_of_interst_1,
      name_of_interest_2: result.name_of_interst_2,
      name_of_interest_3: result.name_of_interst_3,

    }, () => console.log(this.state));
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
  // CANDIDATE PROFILE INFO ––––––––––––––––––
  fetchCandidateInfo = async () => {
    const response = await fetch('/api/fetchCandidateProfileInfo')
    const status = response.status;
    
    if(status >= 400) {
      const result = await response.json();
      console.log(result);
      if(result.error === 'Candidate Profile Does Not Exist!'){
        this.setState({
          didRegister: false
        })
      }
      else{
        this.setState({
          is_logged_in: false
        }, () => {(alert("There is an error in getting candidate porfile information"))});
      }
    } else {
      const result = await response.json();

      this.setState({
        candidate_current_position: result.candidate_current_position,
        candidate_description: result.candidate_description,
        candidate_highest_level_of_education: result.candidate_highest_level_of_education,
        candidate_school: result.candidate_school,
        name_of_interest_1: result.is_deleted_1,
        name_of_interest_2: result.is_deleted_2,
        name_of_interest_3: result.is_deleted_3,
      }, () => {
        //ensure object contianing number of interests is empty before pushing into it
        if(this.state.profileInterests){
          this.state.profileInterests = [];
        }
        // ensure we render appropriate number of interests in view
        this.checkNumberOfInterests();
      })
    }
  }

  fetchCandidatePersonalInfo = async () => {
    try{
      let response = await fetch('/api/fetchCandidatePersonalInformation', {
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'GET'
      });
      let status = response.status;
      let result = await response.json();
      if(status>= 400){
        throw Error(alert('There is an error in getting candidate Personal Information'))
      }else{
        console.log(result)
        const{email, first_name, gender, last_name, personal_city, personal_country ,personal_postal, personal_state, personal_street_address, phone_number} = result;
        this.setState({
          email:email,
          first_name: first_name,
          gender: gender,
          last_name: last_name,
          personal_city: personal_city,
          personal_country: personal_country,
          personal_postal: personal_postal,
          personal_state: personal_state,
          personal_street_address: personal_street_address,
          phone_number:phone_number,
        })
      }
    }catch(error){
      console.log(error);
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
      //ensure object contianing number of experienes is empty before pushing into it
      if(this.state.experiences){
        this.state.experiences = [];
      }
      this.checkNumberOfExperiences();
    }
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

  // Candidate Skills ––––––––––––––––––––––––
  fetchCandidateSkills = async () => {
    const response = await fetch ('/api/fetchCandidateSkills')
    const status = response.status;
    if(status >= 400){
      throw Error(alert('There is an error in getting candidate experiences information'));
    }
    else {
      if(this.state.skills){
        this.setState({
          skills: []
        })
      }
      this.setState({
        delete_skills: []
      })
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
    }
  }

  // Candidate Links –––––––––––––––––––––––––
  fetchCandidateLinks = async () => {
    const response = await fetch('/api/fetchCandidateLinks');
    const status = response.status;
    const result = await response.json();

    if(status >= 400){
      throw Error(result.error);
    } else {
      for(let i = 1; i < 4; i++){
        this.setState({
          [`link_${i}`]: result[`link_${i}`],
          [`type_of_link_${i}`]: result[`type_of_link_${i}`],
        })
      }
      //ensure object contianing number of links is empty before pushing into it
      if(this.state.profileLinks){
        this.state.profileLinks = [];
      }
      this.checkNumberOfLinks();
    }
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
    // console.log('props => ' + JSON.stringify(this.props.match.params))
    // console.log(this.props);
    // this.setState({
    //   email_user: 'adad'
    // }, () => console.log(this.props))
    // console.log(window.location.href)

    // const result= window.location.href.split('/')
    // console.log(result[4]);

    // console.log(values.email) // "top"


    // console.log(this.props.match)
    // const queryString = window.location.search;
    // const urlParams = new URLSearchParams(queryString);
    // const email = urlParams['email'];
    // console.log(email);
    const email = this.props.routeProps.match.params.email;

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
          <input type='date' name={end_date} onChange={this.handleChange} value={this.state[end_date]}/>
          <br/>
          <input type='checkbox' name={present} onClick={this.handleCheckBox}/>
          <label>Present</label>
        </div>
      )
    }
  }

  render() {
    return (
      <div className='candidate_profile'>
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
          {/* <label>Interests: </label>
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
          } */}
        </div>
        <br/>
        {/* <div className='no_edit_candidate_links'>
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
      </div> */}
      </div>
    )
  } 
}

export default PublicCandidateProfile;
