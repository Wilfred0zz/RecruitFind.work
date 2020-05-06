import React, { Component } from 'react';
import './css/NavigationBarRecruiter.css';

class NavigationBarRecruiter extends Component {
  
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
      } else {
        this.props.updateLogout();
        console.log("Successfully logged out");
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
      <header className='navbar'>
      <nav className='navbar-options'>
        <div className='navbar-items'>
          <ul>
            <li><a href='/recruiter_profile'> Profile </a></li>
            <li><a href='/'> Searches </a></li>
            <li><a href='/'> Matches </a></li>
            <li><button onClick={this.handleLogOut}>Log Out</button></li>
          </ul>
        </div>
      </nav>
      </header>
      </div>
    )
  }
};

export default NavigationBarRecruiter;
