import React, { Component } from 'react';

class CandidateProfile extends Component{
  constructor(props){
    super(props);
    this.state = { 

    }
  }

  handleChange = (event) =>{
    this.setState({
      [event.target.name]: event.target.value
    }, ()=> console.log(this.state))
  } 

  render() {
    return (
      <div className='register-candidate'>
        <h1>Welcome Candidate</h1>
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
