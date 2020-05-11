import React, { Component } from 'react';

class Matches extends Component {
  constructor(props){
    super(props);
    this.state = {
      matches: [],
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
    const result = await response.json();

    if(status >= 400){

    } else {
      
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
      <div className='Matches'>
        
      </div>
    )
  }

}

export default Matches;
