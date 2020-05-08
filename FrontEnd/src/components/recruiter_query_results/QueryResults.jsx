import React, { Component } from "react";

//CONTEXT
import Button from '@material-ui/core/Button';

class RecruiterQueryResults extends Component{
  constructor(props) {
    super(props);
    this.state = {
        qualifiedCandidates : []
        };
    }

  handleClickOpen = async () => {
  
    const queryInfo = {
      "query_title": "Software Engineer",
      "query_description": "L4 Software Engineer At Google",
      "query_payment": "100-160k",
      "query_date": "04-30-2020",
      "desired_skill_1": "",
      "desired_skill_2": "",
      "desired_skill_3": "",
      "desired_skill_4": "",
      "desired_skill_5": "",
      "desired_skill_6": "",
      "desired_skill_7": "",
      "desired_skill_8": "",
      "desired_skill_9": "",	
      "desired_skill_10": "diving",
      "is_deleted": false 
    }

    try {
      const queryResponse =  await fetch('/api/query', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(queryInfo)
      });
  
    const status = queryResponse.status;   
    const result = await queryResponse.json();

    if (status === 400 || status === 500) {
      alert("Problem with query: ")
      alert(result.error);
    } else {
      console.log(result);

      try {    
        const computeQueryResponse = await fetch('/api/computeQuery', {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: 'POST',
              body: JSON.stringify(queryInfo)
            });
        
          const status = computeQueryResponse.status;   
          const result = await computeQueryResponse.json();
    
          const value = Object.values(result);
          console.log("Value " , value);

          if (status === 400 || status === 500) {
          alert("Problem with computing: ")
          alert(result.error);
          
          } else {
            this.setState({
              qualifiedCandidates : value
            }
          )
          console.log('Qualified Candidates: ', this.state.qualifiedCandidates)
          console.log('Qualified Candidates 1: ', this.state.qualifiedCandidates[1][0])
            //const temp = JSON.parse(JSON.stringify(state));
          }
        } catch (error) {
          console.log(error);
        }
      //const temp = JSON.parse(JSON.stringify(state));
    }
  } catch (error) {
    console.log(error);
  }
      
  };
  
  render(){
    return (
      <div>
        <Button onClick={this.handleClickOpen}> Matches more info modal </Button>
         <ul> 
            {this.state.qualifiedCandidates.map((candidate, i) => {
              if(i > 4){
                return null;
              }else{
                return(
                  <li key = {candidate+i}>
                    {candidate }
                    {candidate[0]}
                  </li>
                )
              }
            })}
            </ul>
      </div>
  );
  }
}

export default RecruiterQueryResults;