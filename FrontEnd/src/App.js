import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';

import MainPage from './components/main_page/MainPage';
import CandidateRegister from './components/register_candidate/RegisterCandidate';
import RecruiterRegister from './components/register_recruiter/RegisterRecruiter';

function App() {
  const MainPageComponent = () => <MainPage/>
  const CandidateRegisterComponent = () => <CandidateRegister/>
  const RecruiterRecruiterComponent = () => <RecruiterRegister/>
  return (
    <div className="App">
      <header className="App-header">
      </header>
      {/* Listing all routes that will be used in our application */}
      <Switch> 
        <Route exact path="/" render={MainPageComponent}/>
        <Route exact path='/register_candidate' render={CandidateRegisterComponent}/>
        <Route exact path='/register_recruiter' render={RecruiterRecruiterComponent}/>
      </Switch>

     
    </div>
  );
}

export default App;
