import React from 'react';

import { Provider } from 'react-redux';
import store from './store/index';
import './App.css';

import Mainpage from './components/main_page/Mainpage';
import Toolbar from './components/main_page/Toolbar';
import AboutUs from './components/main_page/AboutUs';

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
