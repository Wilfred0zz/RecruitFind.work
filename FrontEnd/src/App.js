import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';

import MainPage from './components/main_page/MainPage';
import CandidateRegisterProfile from './components/candidate_profile/CandidateRegisterProfile';
import RecruiterRegisterProfile from './components/recruiter_profile/RecruiterRegisterProfile';
import RecruiterProfile from './components/recruiter_profile/RecruiterProfile';
// import CandidateRegister from './components/';
//import RecruiterRegister from './components/register_recruiter/RegisterRecruiter';

function App() {
  const MainPageComponent = () => <MainPage/>
  const CandidateRegisterProfileComponent = () => <CandidateRegisterProfile/>
  const RecruiterRegisterProfileComponent = () => <RecruiterRegisterProfile/>
  const RecruiterProfileComponent = () => <RecruiterProfile/>
  return (
    <div className="App">
      <header className="App-header">
      </header>
      {/* Listing all routes that will be used in our application */}
      <Switch> 
        <Route exact path="/" render={MainPageComponent}/>
        <Route exact path="/candidate_register_profile" render={CandidateRegisterProfileComponent}/>
        <Route exact path='/recruiter_register_profile' render={RecruiterRegisterProfileComponent}/>
        <Route exact path='/recruiter_profile' render={RecruiterProfileComponent}/>
      </Switch>
    </div>
  );
}
export default App;
