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
    event.preventDefault();
    fetch.post(`/api/login`, { "email": this.state.email, "password": this.state.password})
    .then((response) => {
      // if(response.data.status === true)
      //   console.log("I have logged in", response.data.status_info);
      // else {
      //   this.setState({
      //     email: '',
      //     password: ''
      //   })
      //   alert("error: " + response.data.status_info);
      // }
      console.log(response);
    })
    .catch(err=>{
      alert(err);
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
                <input type='text' name='email' placeholder='Email' value={this.state.email} onChange={this.handleChange}/>
                <label className='password'> Password: </label>
                <input type='text' name='password' placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
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
