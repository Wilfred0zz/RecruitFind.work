import React, { Component } from 'react';
import officeImg from './static/office.jpg';

class Mainpage extends Component {
  render() {
    return (
        <div className = 'main-'page id = 'main'> 
            <h1 id='catchPhrase'>Don't be a slob, get a job</h1>
            <img id = 'officePic' src={officeImg}/>
        </div>
    )
  }
}

export default Mainpage;
