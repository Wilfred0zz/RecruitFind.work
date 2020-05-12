import React, { Component } from 'react';
import MatchesPage from './MatchesPage';
import { Redirect } from 'react-router-dom';
import NavigationBarCandidate from './../candidate_profile/navigation_bar_candidate/NavigationBarCandidate';

class Matches extends Component {
  constructor(props){
    super(props);
    this.state = {
      matches: {},
      is_logged_in: true,
    }
  }

  fetchAllMatches = async () => {
    const response = await fetch ('/api/fetchCandidateMatches',{
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET',
    })

    const status =  response.status;
    if(status >= 400){
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
        <NavigationBarCandidate updateLogout={this.updateLogout}/>
        <MatchesPage matches={this.state.matches}/>
      </div>
    )
  }

}

export default Matches;
