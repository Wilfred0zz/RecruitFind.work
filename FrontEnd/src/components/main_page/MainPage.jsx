import React, { Component, useReducer } from 'react';
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

  handleChange = (event) =>{
    this.setState({
      [event.target.name]: event.target.value
    }, ()=>console.log(this.state))
  } 

  confirmLogIn = async (event) =>{
    event.preventDefault();
    const user = {
      "email": this.state.email, 
      "password": this.state.password
    }
    // if(user.email === '') {
    //   alert("Please enter email")
    //   return;
    // }
    // else if (user.password === ''){
    //   alert ("Please enter password")
    //   return;
    // }
    
    // axios.post(`/api/login`, { "email": this.state.email, "password": this.state.password})
    // .then((response) => {
      // if(response.data.status === true)
      //   console.log("I have logged in", response.data.status_info);
      // else {
      //   this.setState({
      //     email: '',
      //     password: ''
      //   })
      //   alert("error: " + response.data.status_info);
      // }
    //   console.log(response);
    // })
    // .catch(err=>{
    //   console.log(err);
    // });
    try{
      const response = await fetch('/api/login', {
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(user)
      });

      const status = response.status;
      const result = await response.json();
      console.log('the response is', result)

      if (status >= 400) {
        // alert("Your password or email is incorrect. Please try again");
        alert(result.error);
      } else {
        console.log("user exists", result.status);
      }
    } catch (error) {
      console.log(error);
    }
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
                <input type='email' name='email' placeholder='Email' value={this.state.email} onChange={this.handleChange}/>
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
