import React, { Component } from 'react';

class RecruiterProfile extends Component{
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
        <h1>Welcome Recruiter</h1>
      </div>
    )
  }
}

export default RecruiterProfile;
