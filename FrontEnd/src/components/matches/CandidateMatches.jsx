import React, { Component } from 'react';
import MatchesPage from './MatchesPage'

class Matches extends Component {
  constructor(props){
    super(props);
    this.state = {
      matches: {},
      loading: false,
    }
  }

  fetchAllMatches = async () => {
    this.setState({
      loading: true,
    })
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
          loading: false,
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
      { this.state.loading ? <div> lodaing </div> : <MatchesPage matches={this.state.matches}/> }
      </div>
    )
  }

}

export default Matches;
