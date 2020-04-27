import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class MainPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      isLoggedIn: false,
      email: '',
      password: ''
    };
  }

  handleChange=(event)=>{
    this.setState({
      [event.target.name]: event.target.value
    }, ()=>console.log(this.state))
  } 

  confirmLogIn=(event)=>{
    // prevent default form action
    event.preventDefault();
    console.log("Im In");
    axios.post(`/api/login`, { "email": this.state.email, "password": this.state.password})
    .then((response) => {
        console.log(response);
    })
    .catch((error)=>{
        console.log(error);
    });
  }

  render() {
    return (
      <div className = 'home'> 
        <div className = 'main-page' id = 'main'>
          <h1 id='catch-phrase'>Don't be a slob, get a job</h1>  
          <div className='log-in'>
            <h4>Log In</h4>
            <form className='log-in-form'>
              <div className='email-password'>
                <label className='email'> Email: </label>
                <input type='text' name='email' placeholder='Email' onChange={this.handleChange}/>
                <label className='password'> Password: </label>
                <input type='text' name='password' placeholder="Password" onChange={this.handleChange}/>
              </div>
              <button onClick={this.confirmLogIn}>Log In</button>
            </form>
          </div>
          <h4 id='log-in'>Sign Up</h4>
          <h5> Are you a Recruiter</h5>
          <Link to='/register_recruiter'>
            <button>Recruiter</button>
          </Link>
          <h5> or a Candidate</h5>
          <Link to='/register_candidate'>
            <button>Candidate</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default MainPage;
