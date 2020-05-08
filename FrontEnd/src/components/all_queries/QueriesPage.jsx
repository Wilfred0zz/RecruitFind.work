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
        //this.timer = setInterval(() => this.fetchQueries(), 5000);
    }
    
    
    renderRedirect = false;

    render(){
        console.log(this.state.PastQueries)
        return(

            <div>
                <div>
                    
                    hello
                    <button onClick={this.renderRedirect= true}>New Query?</button>
                    <ul> 
                        {this.state.PastQueries.map((query) => (
                            <li key = {query.id}>
                                {query.queryDate}
                                {query.queryDescription}
                                {query.queryPayment}
                                {query.queryTitle}
                                {query.query_id}
                             </li>
                         ))
                        }   
                    </ul>
                </div>
            </div>
        )
        //if(this.state.renderRedirect== true){
          //  <Redirect to ='/NewQueriesPage'/>
        //}
    }
}
export default DisplayPastQueries;