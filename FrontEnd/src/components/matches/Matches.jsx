import React, { Component } from 'react';

class Matches extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  fetchAllMatches = async () => {
    
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
