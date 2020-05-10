import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

class CandidateRegisterProfile extends Component{
  constructor(props){
    super(props);
    this.state = { 
      submit_pushed: false,

      candidate_info_update: false,
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
  experiences = [1];
  profileLinks = [1];
  profileInterests=[1];

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  } 

  handleCheckBox = (event) => {
    const data = event.target.name;
    const value = `end_date_${event.target.name[event.target.name.length-1]}`;
    this.setState({
      [event.target.name]: !this.state[event.target.name]
    }, () => {
      if(this.state[data] === true){
        this.setState({
          [value]: ''
        })
      }
    })
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

    // to change display and delete one experience field
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

    this.profileInterests.pop();

    this.setState({
      [interest]: '',
      interest_count: this.state.interest_count - 1
    });
  }

  // for future use when wanna use api
  handleSkill = async (event, value) => {
    // console.log("Im in the network", event.target.value)
    // if(this.state.skills.length >= 9){
    //   event.target.value='';
    //   return alert('Too Many Skills')
    // }
    console.log( "the value at this moment is ", value)
    if(!event.target.value){
      this.setState({
        skills: value || []
      });
    } else if(event.target.value.length < 3 || event.target.value===0){
      return;
    } else if(event.target.value.length >= 3){
      try {
        const response = await fetch(`http://api.dataatwork.org/v1/skills/autocomplete?contains=${event.target.value}`,{
          headers: {
            "Accept": 'application/json',
          }
        });
  
        const status = response.status;
        const result = await response.json();
        console.log("This is the result", result)
        if(status >= 400){
          console.log(result.error);
        }
        else{
          this.setState({
            skill_options: result.map(skill => skill.normalized_skill_name)
          })
        }
  
      }catch(error){
        console.log(error);
      }
    }
  }

  // To decrease count or increase count based on skill added
  modifySkill = (event, value, type) => {
    // value contains the selected inputs over time
    if(type === 'remove-option'){
      this.setState({ 
        // skill_count: this.state.skill_count - 1,
        skills: value,
        // skill_options: []
      });
    } else if(this.state.skills.length >= 10){
      // event.target.value='';
      return alert('Only 10 allowed');
    } else if((type === 'create-option') && this.state.skills.length < 10){
      var data = event.target.value.toLowerCase();
      if(this.state.skills && (this.state.skills.filter(currentValue=>data===currentValue).length > 0)){
        return;
      }
      this.setState({ 
        // skill_count: this.state.skill_count + 1,
        skills: [...this.state.skills, value[value.length-1].toLowerCase()],
        // skill_options: []
      });
    } else {
      return;
    }

    // delete previous optins so they dont appear again
    // this.setState({
    //   skill_options: []
    // })    
  }
  
  handleCandidateProfileSubmission = async () => {
    const candidateProfile = {
      "candidate_school": this.state.candidate_school,
      "candidate_highest_level_of_education": this.state.candidate_highest_level_of_education,
      "candidate_description": this.state.candidate_description,
      "candidate_current_position": this.state.candidate_current_position,
      "is_candidate_profile_deleted": false,
      "name_of_interest_1": this.state.name_of_interest_1,
      "is_deleted_1": false,
      "name_of_interest_2": this.state.name_of_interest_2,
      "is_deleted_2": false,
      "name_of_interest_3": this.state.name_of_interest_3,
      "is_deleted_3": false
    }
    
    const response = await fetch('/api/candidateProfile', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(candidateProfile)
    })

    const status = response.status;
    const result = await response.json();

    if(status === 400 || status === 500){
      console.log(result, "this is my error")
      throw Error("Fix your candidate profile information");
    }
    else { 
      console.log('Candidate Profile Created');
    }
  }

  handleLinkSubmission = async () => {
    const links = {
      "type_of_link_1": this.state.type_of_link_1,
      "link_1": this.state.link_1,
      "is_deleted_1": false,
      "type_of_link_2": this.state.type_of_link_2,
      "link_2": this.state.link_2,
      "is_deleted_2": false,
      "type_of_link_3": this.state.type_of_link_3,
      "link_3": this.state.link_3,
      "is_deleted_3": false
    }
    
    // checking if the data is paired properly {link type, and link}

    const response = await fetch('/api/candidateLinks', {
      headers: {
        'Accept': 'application/json',
        "Content-Type": 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(links)
    });

    const status = response.status;
    const result = await response.json();

    if(status === 400 || status === 500){
      console.log(result.error);
      throw Error("Fix your links");
    }
    else{
      console.log("Links have been created");
    }
  }

  handleExperiencesSubmission = async () => {
    const experiencess = {
      "role_title_1": this.state.role_title_1,
      "description_1": this.state.description_1,
      "start_date_1": this.state.start_date_1,
      "end_date_1": this.state.end_date_1,
      "present_1": this.state.present_1,
      "is_deleted_1": false,
      
      "role_title_2": this.state.role_title_2,
      "description_2": this.state.description_2,
      "start_date_2": this.state.start_date_2,
      "end_date_2": this.state.end_date_2,
      "present_2": this.state.present_2,
      "is_deleted_2": false,
      
      "role_title_3": this.state.role_title_3,
      "description_3": this.state.description_3,
      "start_date_3": this.state.start_date_3,
      "end_date_3": this.state.end_date_3,
      "present_3": this.state.present_3,
      "is_deleted_3": false,
      
      "role_title_4": this.state.role_title_4,
      "description_4": this.state.description_4,
      "start_date_4": this.state.start_date_4,
      "end_date_4": this.state.end_date_4,
      "present_4": this.state.present_4,
      "is_deleted_4": false,
      
      "role_title_5": this.state.role_title_5,
      "description_5": this.state.description_5,
      "start_date_5": this.state.start_date_5,
      "end_date_5": this.state.end_date_5,
      "present_5": this.state.present_5,
      "is_deleted_5": false
    }

    const response = await fetch('/api/candidateExperiences', {
      headers: {
        'Accept': 'application/json',
        "Content-Type": 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(experiencess)
    });

    const status = response.status;
    const result = await response.json();

    if(status === 400 || status === 500){
      console.log(result.error);
      throw Error(alert("Fix your Experiences bro, go get a job"));
    }
    else{
      console.log("Experiences have been created");
      return true;
    }
  }

  handleSkillSubmission = async () => {
    if(!this.state.skills || this.state.skills.length < 1){
      throw(Error(alert("Please enter atleast one skill")));
    }

    for(let i = 0; i < this.state.skills.length; i++){
      const skill = {
        "skill": this.state.skills[i].toLowerCase(),
        "is_deleted": false
      }
      const response = await fetch('/api/candidateSkills',{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(skill)
      })
      
      const status = response.status;
      const result = await response.json();

      if(status >= 400) {
        if(!result.status_info === 'Candidate Already Has That Skill!'){
          console.log(result);
          throw Error(`error in skill_${i}`);
        }
      }
      else{
        console.log(`Successfully added skill_${i}`);
      }
    }
    
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    for(let i = 1; i <= 3; i++){
      if(this.state[`type_of_link_${i}`].length > 0 || this.state[`link_${i}`].length > 0){
        if(!(this.state[`type_of_link_${i}`].length > 0 && this.state[`link_${i}`].length > 0)){
          (alert('Please fill in both fields for your links'));
          return;
        }
      }
    }

    for(let i = 1; i <= 5; i++){
      if (this.state[`role_title_${i}`].length > 0 || this.state[`description_${i}`].length > 0 || this.state[`start_date_${i}`].length > 0 || this.state[`end_date_${i}`].length > 0 || this.state[`present_${i}`] === true){
        if (this.state[`role_title_${i}`].length > 0 && this.state[`description_${i}`].length > 0 && this.state[`start_date_${i}`].length > 0 && (this.state[`end_date_${i}`].length > 0 || this.state[`present_${i}`] === true)){
          if(this.state[`end_date_${i}`].length > 0 && this.state[`end_date_${i}`]<this.state[`start_date_${i}`]){
            alert('End Date must be after Start Date');
            return;
          }
          continue;
        }  
        else {
          (alert(`Please fill out all the fields in Experience ${i}`));
          return;
        }
      }
    }

    this.setState({
      submit_pushed: true,
    })

    try {
      await this.handleExperiencesSubmission();
      await this.handleLinkSubmission();
      await this.handleCandidateProfileSubmission();
      await this.handleSkillSubmission();
      this.setState({
        candidate_info_update: true
      });
    }catch(error){
      this.setState({
        submit_pushed: false
      }, () =>  console.log("Please be sure all inputs are appropraitely entered"));
    }
  }

  // Fetch All Data, and see if any information exists
  // if it doesnt, then set update to false, with input values
  // else set update to true, and just render view via redirect
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
      if(status === 401) {
        this.setState({
          is_logged_in: false
        });
        return
      }

      const result = await response.json();

      if (status >= 400) {
        // If I get an error I need to check the error message
        if(result.error){
          console.log(result.error);
        }
        else {
          console.log("User doesn't exist or isn't logged in and should be redirected to login");
          this.setState({
            is_logged_in: false
          })
        }
      } else { // user exists and should be redirected to personal profile
          this.setState({
            candidate_info_update: true
          });
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
        {!this.state.candidate_info_update ? 
          <div className='create_candidate_profile'>
            <div className='candidate_profile_info'>
              <label> Current Position </label>
              <input name='candidate_current_position' onChange={this.handleChange}/>
                <br/>
              <label> Description </label>
              <input name='candidate_description' onChange={this.handleChange}/>
                <br/>
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
              <label> Interests (Note not all of them have to be filled)</label>
              <div>
                {
                  this.profileInterests.map((interest, index) => {
                    return (
                      <input key={index+1} name={`name_of_interest_${index+1}`} onChange={this.handleChange}/>
                      )
                  })
                }
              </div>
              {/* Button to add another interest */}
              {
                (this.profileInterests.length < 3)
                ? <button onClick={this.increaseInterests}>+</button>
                : null
              }
              {/* Button to delete most recent interest */}
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
                    <div key ={index + 1}>
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
                this.experiences.map((experience, index)=>{
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
              <Autocomplete
                multiple // allows multiple entries
                limitTags={10} // only 10 displayed in input box
                freeSolo // add entries not in provided options
                disableClearable={true} // remove delete all option
                value={this.state.skills} // make sure that the extra inputs more than 10 dont show
                size='small' // dispaly small
                id="multiple-limit-tags" // id for this component
                options={[]} // provide no options
                onChange={this.modifySkill} // when a user presses enter this function occurs
                renderInput={params => ( //display for all entered inputs
                  <TextField
                    {...params}
                    variant="outlined"
                    label="skills"
                    placeholder="skill"
                  />
                )}
              />
            </div>
            {
              this.state.submit_pushed 
              ? <p>Please wait while we double check all the information</p>
              : null
            }
            <button onClick={this.handleSubmit}>Submit</button>
          </div> 
        :
          <div>
            <Redirect to='/candidate_profile'/>
          </div>
        }
      </div>
    )
  }
}

export default CandidateRegisterProfile;
