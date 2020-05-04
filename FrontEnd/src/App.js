import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';

import MainPage from './components/main_page/MainPage';
//import CandidateRegister from './components/register_candidate/';
//import RecruiterRegister from './components/register_recruiter/RegisterRecruiter';

function App() {
  const MainPageComponent = () => <MainPage/>
  return (
    <div className="App">
      <header className="App-header">
      </header>
      {/* Listing all routes that will be used in our application */}
      <Switch> 
        <Route exact path="/" render={MainPageComponent}/>
      </Switch>
    </div>
  );
}
export default App;
