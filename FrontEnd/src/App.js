import React from 'react';
import logo from './logo.svg';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

import styled from 'styled-components';

import Mainpage from './components/Mainpage';
import Toolbar from './components/Toolbar';
import AboutUs from './components/AboutUs';
//import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
        </header>
        <Toolbar/>
        <Mainpage/>
        <AboutUs/>
      </div>
    </Provider>
  );
}

export default App;
