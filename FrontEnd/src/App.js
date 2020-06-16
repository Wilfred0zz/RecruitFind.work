import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';

import MainPage from './components/main_page/MainPage';
import CandidateRegisterProfile from './components/candidate_profile/CandidateRegisterProfile';
import CandidateProfile from './components/candidate_profile/CandidateProfile';
import RecruiterRegisterProfile from './components/recruiter_profile/RecruiterRegisterProfile';
import RecruiterProfile from './components/recruiter_profile/RecruiterProfile';
import QueriesPage from './components/all_queries/QueriesPage';
import NewQueriesPage from './components/all_queries/NewQueriesPage';
import RecruiterQueryResults from './components/recruiter_query_results/QueryResults';
import PublicCandidateProfile from './components/candidate_profile/PublicCandidateProfile';
import NewQueries from './components/all_queries/NewQueriesPage';
// import AboutUs from './components/about_us/about_us'

import CandidateMatches from './components/matches/CandidateMatches';
import RecruiterMatches from './components/matches/RecruiterMatches';
import QueriesPageView from './components/all_queries/QueriesPageView';
// import CandidateRegister from './components/';
//import RecruiterRegister from './components/register_recruiter/RegisterRecruiter';

class App extends Component{
    constructor(props){
    super(props);
    this.state = { 
      query_title: "",
      query_description: "",
      query_payment: "",
      query_date: "",
      desired_skill_1: "",
      desired_skill_2: "",
      desired_skill_3: "",
      desired_skill_4: "",
      desired_skill_5: "",
      desired_skill_6: "",
      desired_skill_7: "",
      desired_skill_8: "",
      desired_skill_9: "",	
      desired_skill_10: "",
    }
  }

  updateState = (object) =>{
    this.setState({...object})
  }

  render(){
    const MainPageComponent = () => <MainPage/>
    const CandidateRegisterProfileComponent = () => <CandidateRegisterProfile/>;
    const CandidateProfileComponent = () => <CandidateProfile/>
    const RecruiterRegisterProfileComponent = () => <RecruiterRegisterProfile/>
    const RecruiterProfileComponent = () => <RecruiterProfile/>
    const QueriesPageComponent = () => <QueriesPage state ={this.state}/>
    const NewQueriesPageComponent = () => <NewQueriesPage state={this.state} updateState={this.updateState}/>
    const RecruiterQueryResultsComponent = () => <RecruiterQueryResults state={this.state} />
    // need to pass in this to get access to history, otherwise need to use window.location.href
    const PublicCandidateProfileComponent = (routerProps) => <PublicCandidateProfile routeProps={routerProps}/>
    // const AboutUsComponent = () => <AboutUs/>
    const CandidateMatchesComponent = () => <CandidateMatches/>
    const RecruiterMatchesComponent = () => <RecruiterMatches/>

    return (
      <div className="App">
        <header className="App-header">
        </header>
        {/* Listing all routes that will be used in our application */}
        <Switch> 
          <Route exact path="/" render={MainPageComponent}/>
          <Route exact path="/candidate_profile" render={CandidateProfileComponent}/>
          <Route path="/candidate_profile/:email" component={PublicCandidateProfileComponent}/>
          <Route exact path="/candidate_register_profile" render={CandidateRegisterProfileComponent}/>
          <Route exact path="/recruiter_register_profile" render={RecruiterRegisterProfileComponent}/>
          <Route exact path="/recruiter_profile" render={RecruiterProfileComponent}/>
          <Route exact path="/all_queries" render={QueriesPageComponent}/>
          <Route exact path="/new_query_page" render={NewQueriesPageComponent}/>
          <Route exact path="/query_results_page" render={RecruiterQueryResultsComponent}/>
          {/* <Route exact path="/about_us" render={AboutUsComponent}/> */}
          <Route exact path="/candidate_matches" render={CandidateMatchesComponent}/>
          <Route exact path="/recruiter_matches" render={RecruiterMatchesComponent}/>
        </Switch>
      </div>
    );
  }
}
export default App;
