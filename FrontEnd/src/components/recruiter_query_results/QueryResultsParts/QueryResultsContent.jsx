import React, { useContext } from "react";

//CONTEXT
import { MatchContext } from "./QueryResultStates";
import Button from '@material-ui/core/Button';

export default props => {
  const [state] = useContext(MatchContext);
  //const [open, setOpen] = React.useState(false);
  //const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = async () => {
    console.log("TESTING: " + state.job_description);

    const queryInfo = {
      "query_title": "Software Engineer",
      "query_description": "L4 Software Engineer At Google",
      "query_payment": "100-160k",
      "query_date": "04-30-2020",
      "desired_skill_1": "c++",
      "desired_skill_2": "python",
      "desired_skill_3": "java",
      "desired_skill_4": "flask",
      "desired_skill_5": "javascript",
      "desired_skill_6": "react-native",
      "desired_skill_7": "angular",
      "desired_skill_8": "diving",
      "desired_skill_9": "react",	
      "desired_skill_10": "backend development",
      "is_deleted": false    
    }

    console.log(queryInfo);
    try {
      const response = await fetch('/api/computeQuery', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify(queryInfo)
        });
    
      const status = response.status;   
      const result = await response.json();

      if (status === 400 || status === 500) {
        alert(result.error);
      } else {
        console.log(result);
        //const temp = JSON.parse(JSON.stringify(state));
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
      <div>
        <Button onClick={handleClickOpen}> Matches more info modal </Button>
        
      </div>
  );
};