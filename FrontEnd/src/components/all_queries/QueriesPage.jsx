import React, { Component } from 'react';
import './NewQueriesPage';
import NavigationBarRecruiter from './../recruiter_profile/navigation_bar_recruiter/NavigationBarRecruiter';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';


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
      const result = await response.json(); console.log(result);

      if (status === 400 || status === 500) {
        console.log(result.error)
      } else {
        console.log(result);
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
        <NavigationBarRecruiter updateLogout={this.updateLogout}/>
        {/* handle logout */}
        {
          this.state.is_logged_in
          ? null
          : <Redirect to='/'/>
        }
        <div>
          <Link to="/new_query_page"><button>New Query?</button></Link>
          {this.state.PastQueries.length > 0 
          ? <div>
                <ul>
                  {this.state.PastQueries.map((query) => (
                    <li key={query.query_id}>
                      {query.queryDate} {" "}
                      {query.queryDescription} {" "}
                      {query.queryPayment}{" "}
                      {query.queryTitle}
                    </li>
                  ))}
                </ul>
            </div>
          : <p>No Past Queries</p>}
        </div>
      </div>
    )
  }
}

export default DisplayPastQueries;
