import React, { Component } from 'react';
import MatchesPage from './MatchesPage';
import NavigationBarRecruiter from './../recruiter_profile/navigation_bar_recruiter/NavigationBarRecruiter';
import { Redirect } from 'react-router-dom';

class Matches extends Component {
  constructor(props){
    super(props);
    this.state = {
      matches: {},
      is_logged_in: true,
    }
  }

  fetchAllMatches = async () => {
    const response = await fetch ('/api/fetchRecruiterMatches',{
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET',
    })

    const status =  response.status;
    if(status >= 400){
      if(status === 401){
        this.setState({
          is_logged_in: false,
        })
        return;
      }
      console.log('error', response);
    } else {
      var result = await response.json();
      if(result){
        this.setState({
          matches: result
        })
      }
    }
  }

  componentDidMount = async () => {
    try{
      await this.fetchAllMatches();
    } catch(error) {
      console.log(error);
    }
  } 

  updateLogout = () => {
    this.setState({
      is_logged_in: false
    })
  }

  render() {
    return (
      <div>
        {
          this.state.is_logged_in
          ? null
          : <Redirect to='/'/>
        }
        <NavigationBarRecruiter updateLogout={this.updateLogout}/>
        <MatchesPage matches={this.state.matches} status="recruiter"/>
      </div>
    )
  }

}

export default Matches;
