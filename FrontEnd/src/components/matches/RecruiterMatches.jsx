import React, { Component } from 'react';

class Matches extends Component {
  constructor(props){
    super(props);
    this.state = {
      matches: {},
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
      console.log('error', response);
    } else {
      var result = await response.json();
      if(values){
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

  render() {
    return (
      
    )
  }

}

export default Matches;
