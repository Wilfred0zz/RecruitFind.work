import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './static/css/MainPageCSS.css';
import './../navigation_bar/NavigationBar';
import NavBar from './../navigation_bar/NavigationBar';

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
    event.preventDefault();
    axios.post(`/api/login`, { "email": this.state.email, "password": this.state.password})
    .then((response) => {
      if(response.data.status === true)
        console.log("I have logged in", response.data.status_info);
      else {
        this.setState({
          email: '',
          password: ''
        })
        alert("error: " + response.data.status_info);
      }
    });
  }

  render() {
    return (
      <div className = 'home'> 
        <NavBar/>
        <main style={{marginTop:'64px'}}>
        <div className = 'main-page' id = 'main'>
          <h1 className='header' id='catch-phrase'>Don't be a slob, get a job</h1>  
          <div className='log-in'>
            <h2 className="login-header">Log In</h2>
            <form className='log-in-form'>
              <div className='email-password'>
                <label className='email'> Email: </label>
                <input type='text' name='email' placeholder='Email' value={this.state.email} onChange={this.handleChange}/>
                <label className='password'> Password: </label>
                <input type='text' name='password' placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
              </div>
              <button className='log-in-button' onClick={this.confirmLogIn}>Log In</button>
            </form>
            <h3 className='OR-option'>================== OR ==================</h3>
          </div>
          <h2 id='log-in' className="sign-up">Sign Up</h2>
          <Link to='/register_recruiter'>
            <button className='recruiter-button'>
              <h3> Are you a Recruiter? </h3>
              Recruiter
            </button>
          </Link>
          <Link to='/register_candidate'>
            <button className='candidate-button'>
              <h3> Are you a Candidate?</h3>Candidate
              </button>
          </Link>
        </div>
        </main>
      </div>
    )
  }
}

export default MainPage;
