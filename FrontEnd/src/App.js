import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';

import MainPage from './components/main_page/MainPage';
import CandidateProfile from './components/candidate_profile/CandidateProfile';
import RecruiterRegisterProfile from './components/recruiter_profile/RecruiterRegisterProfile';
import RecruiterProfile from './components/recruiter_profile/RecruiterProfile';
import QueriesPage from './components/all_queries/QueriesPage';
// import CandidateRegister from './components/';
//import RecruiterRegister from './components/register_recruiter/RegisterRecruiter';

function App() {
  const MainPageComponent = () => <MainPage/>
  const CandidateProfileComponent = () => <CandidateProfile/>
  const RecruiterRegisterProfileComponent = () => <RecruiterRegisterProfile/>
  const RecruiterProfileComponent = () => <RecruiterProfile/>
  const QueriesPageComponent = () => <QueriesPage/>
  return (
    <div className="App">
      <header className="App-header">
      </header>
      {/* Listing all routes that will be used in our application */}
      <Switch> 
        <Route exact path="/" render={MainPageComponent}/>
        <Route exact path="/candidate_profile" render={CandidateProfileComponent}/>
        <Route exact path='/recruiter_register_profile' render={RecruiterRegisterProfileComponent}/>
        <Route exact path='/recruiter_profile' render={RecruiterProfileComponent}/>
        <Route exact path= '/all_queries' render={QueriesPageComponent}/>
      </Switch>
    </div>
  );
}
export default App;
