import React, { Component } from 'react';
import './static/css/MainPageCSS.css';
import MainNavBar from '../navigation_bar_main/NavigationBarMain';
import RegisterForm from './../register_form/Register';
import officeImg from './static/images/office.jpeg';
import AboutUs from './About'
import { withStyles } from "@material-ui/core/styles";
//import DisplayPastQueries from './../all_queries/QueriesPage';
//import RecruiterQueryResults from './../recruiter_query_results/QueryResults';

import { Redirect } from 'react-router-dom';

const styles = theme => ({
  root: {
    backgroundColor: "red"
  }
});

class MainPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
      email: '',
      password: '',
      status: ''
    };
  }

  handleChange = (event) =>{
    this.setState({
      [event.target.name]: event.target.value
    })
  } 

  handleLogOut = async (event) => {
    try{
      const response = await fetch('/api/logout', {
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PUT'
      });

      const status = response.status;
      const result = await response.json();

      if (status === 400 || status === 500) {
        alert(result.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  confirmLogIn = async (event) => {
    event.preventDefault();
    const user = {
      "email": this.state.email, 
      "password": this.state.password
    }
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

      if (status === 400 || status === 500) {
        alert(result.error);
      } else {
        this.setState({
          isLoggedIn: true,
          status: result.status
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className = 'home'> 
      {
        this.state.isLoggedIn === true  
        ? [
            (
              this.state.status === 'candidate'
              ? <Redirect key="candidate" push to='/candidate_profile'/>
              : <Redirect key="recruiter" push to='/recruiter_profile'/>
            )
          ]
        : <div>
            <MainNavBar/>
            <main style={{marginTop:'64px'}}>
              <div className = 'main-page' id = 'main'>
                <h1 className='header' id='catch-phrase'>Don't be a slob, get a job</h1>  
                <div className='log-in'>
                  <h2 className="login-header">Log In</h2>
                  <form className='log-in-form'>
                    <div className='email-password'>
                      <label className='email'> Email: </label>
                      <input type='email' name='email' placeholder='Email' value={this.state.email} onChange={this.handleChange}/>
                      <label className='password'> Password: </label>
                      <input type='password' name='password' placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
                    </div>
                    <button className='log-in-button' onClick={this.confirmLogIn}>Log In</button>
                    <button className='log-in-button' onClick={this.handleLogOut}>Log Out</button>
                  </form>
                </div>
                <div id = 'registerForm'> <RegisterForm/> </div>
                <AboutUs/>
              </div>
            </main>
            <img src={officeImg} alt="officeImg"/>
          </div>
        }
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(MainPage);
