import React, { Component } from 'react';

class MainPageContainer extends Component {
  constructor(props){
    super(props);

    this.state = {
      isLoggedIn: false
    };
  }

  

  render() {
    return (
      <div className = 'home'> 
        <div className = 'main-page' id = 'main'>
          <h1 id='catchPhrase'>Don't be a slob, get a job</h1>  
          <h2 id='signin'> Sign In</h2>
        </div>
      </div>
    )
  }
}

export default MainPageContainer;
