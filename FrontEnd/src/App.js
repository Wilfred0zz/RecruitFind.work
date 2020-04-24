import React, { Component } from 'react'

//import './dist/css/template.css'
import './App.css'

import Mainpage from './components/main_page/Mainpage';
import Toolbar from './components/main_page/Toolbar';
import AboutUs from './components/main_page/AboutUs';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="App-header"></header>
          <Toolbar/>
          <Mainpage/>
          <AboutUs/>
      </div>
    )
  }
}

export default App;
