import React, { Component } from 'react';
import MatchesPage from './MatchesPage'
import NavigationBarCandidate from '../candidate_profile/navigation_bar_candidate/NavigationBarCandidate'


class Matches extends Component {
  constructor(props){
    super(props);
    this.state = {
      matches: {},
      loading: false,
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
    console.log(status);

    if(status >= 400){
      console.log('error', response);
    } else {
      var result = await response.json();
      if(result){
        this.setState({
          matches: result,
        })
      }
    }
  }

  componentDidMount = () => {
    try{
      this.fetchAllMatches();
    } catch(error) {
      console.log(error);
    }
  } 

  render() {
    return (
      <div>
        <NavigationBarCandidate/>
        <MatchesPage matches={this.state.matches}/>
      </div>
    )
  }

}

export default Matches;
