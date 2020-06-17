import React, { Component } from 'react';
import './NewQueriesPage';
import NavigationBarRecruiter from '../recruiter_profile/navigation_bar_recruiter/NavigationBarRecruiter';
import { Redirect } from 'react-router-dom';
import QueriesPageView from './QueriesPageView';

class DisplayPastQueries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isfetching: false,
      PastQueries: [],
      is_logged_in: true,
    };
  }
  
  fetchQueries = async (event) => {
    try {
      let response = await fetch('/api/fetchQueries', {
        method: 'GET',
      });

      const status = response.status; 
      if(status === 401){
        this.setState({
          is_logged_in: false,
        })
        return;
      }
      const result = await response.json();

      if (status === 400 || status === 500) {
        console.log(result.error)
      } else {
        this.setState({
          PastQueries: result.queries
        })
        
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentWillMount() {
    this.fetchQueries();
  }

  updateLogout = () => {
    this.setState({
      is_logged_in: false
    })
  }

  render() {
    return (
      <div>
        {
          this.state.is_logged_in
          ? null
          : <Redirect to='/'/>
        }
        <NavigationBarRecruiter updateLogout={this.updateLogout}/>
        {
          this.state.is_logged_in
          ? null
          : <Redirect to='/'/>
        }
        <QueriesPageView PastQueries={this.state.PastQueries} state={this.props.state} updateState={this.props.updateState}/>
      </div>
    )
  }
}

export default DisplayPastQueries;
