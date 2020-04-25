import React from 'react';
import {Route, Switch} from 'react-router-dom';
import NewPaths from './components/Test Stuff/newpaths';
import './App.css';

import MainPage from './components/main_page/MainPage';

function App() {
  const Routing = () => <NewPaths/>
  const MainPageComponent = () => <MainPage/>

  return (
    <div className="App">
      <header className="App-header">
      </header>
      {/* Listing all routes that will be used in our application */}
      <Switch> 
        <Route exact path="/" render={MainPageComponent}/>
        <Route exact path="/newpaths" render={Routing}/> 
      </Switch>

     
    </div>
  );
}

export default App;
