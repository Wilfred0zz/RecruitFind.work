import React, { Component } from 'react';
import './FetchQueriesButton';
import { Redirect } from 'react-router-dom';
import './NewQueriesPage';

class DisplayPastQueries extends Component{
    constructor(props) {
    super(props);
    this.state = {
        isfetching: false,
        PastQueries : []
        };
    }
    fetchQueries = async (e) => {
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
              UserPastQueries => {
                  this.setState({PastQueries : UserPastQueries})
              }
            }
          } catch (error) {
            console.log(error);
          }     
    }

    componentDidMount() {
        this.fetchQueries();
        this.timer = setInterval(() => this.fetchQueries(), 5000);
    }
    
    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }
    
    renderRedirect = false;

    render(){
        if(cookie= ''){
            throw new Error('Error no cookie id token')
        }else if(this.fetchQueries() == '')
        {
            document.write('There are no past queries')
        }else
        return(
            <div>
                <div>
                    <button onClick={this.renderRedirect= true}>New Query?</button>
                    <ul> 
                        {this.state.PastQueries.map((query) => (
                            <li key = {query_info.id}>
                                {query.queryDate}
                                {query.queryDescription}
                                {query.queryPayment}
                                {query.queryTitle}
                                {query.id}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
        if(this.state.renderRedirect== true){
            <Redirect to ='/NewQueriesPage'/>
        }
    }
}
export default DisplayPastQueries;