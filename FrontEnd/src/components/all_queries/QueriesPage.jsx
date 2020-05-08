import React, { Component } from 'react';
import './NewQueriesPage';
import NavigationBarRecruiter from './../recruiter_profile/navigation_bar_recruiter/NavigationBarRecruiter';
import {Link} from 'react-router-dom';


class DisplayPastQueries extends Component{
    constructor(props) {
    super(props);
    this.state = {
        isfetching: false,
        PastQueries : []
        };
    }
    fetchQueries = async (event) => {
        try {
            let response = await fetch('/api/fetchQueries', {
                method: 'GET',
              });
          
            const status = response.status; console.log(response);
            const result = await response.json(); console.log(result);
            if (status === 400 || status === 500) {
              console.log("reached error")
            } else {
              console.log(result);
                this.setState({
                    PastQueries : result.queries
                })
            }
          } catch (error) {
            console.log(error);
          }     
    }

    componentDidMount() {
        this.fetchQueries();
    }
    
    render(){
        console.log(this.state.PastQueries)
        return(
            <div>
                <NavigationBarRecruiter/>
                <div>
                    <Link to = "/new_query_page"><button>New Query?</button></Link>
                    <div>
                        <ul> 
                            {this.state.PastQueries.map((query) => (
                                <li key = {query.query_id}>
                                    {query.queryDate}
                                    {query.queryDescription}
                                    {query.queryPayment}
                                    {query.queryTitle}
                                </li>
                            ))}   
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}



export default DisplayPastQueries;

