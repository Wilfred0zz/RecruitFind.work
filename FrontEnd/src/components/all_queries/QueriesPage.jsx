import React, { Component } from 'react';
import './FetchQueriesButton';
import { Redirect } from 'react-router-dom';
import './NewQueriesPage';

class DisplayPastQueries extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            pastQueries : []
        };
    }

    fetchQueries = async (e) => {
        
        try {
            let response = await fetch('/api/fetchQueries', {
                method: 'GET',
              });
          
            const status = response.status;  
            const result = await response.json(); console.log(response);
            if (status === 400 || status === 500) {
              console.log("reached error")
            } else {
                console.log(result);
                this.setState({pastQueries : result})
            }
          } catch (error) {
            console.log(error);
          }     
    }

    componentDidMount() {
        this.fetchQueries();
    }
    
    renderRedirect = false;

    render(){
        return(
            <div>
                <div>
                    <ul> 
                        {this.state.pastQueries.map((query) => (
                            <li key = {query.id}>
                                {query.queryDate}
                                {query.queryDescription}
                                {query.queryPayment}
                                {query.queryTitle}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}
export default DisplayPastQueries;