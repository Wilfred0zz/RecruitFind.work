import React, { Component } from 'react';
import officeImg from './static/office.jpg';
import Toolbar from './Toolbar';
import AboutUs from './AboutUs';

class MainPage extends Component {
  render() {
    return (
        <div className = 'home'> 
            <Toolbar />
            <div className = 'main-'page id = 'main'> >
              <h1 id='catchPhrase'>Don't be a slob, get a job</h1>
              <img id = 'officePic' src={officeImg} alt="office"/>
            </div>
            <AboutUs/>
        </div>
    )
  }
}

export default MainPage;