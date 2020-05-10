import React, { Component } from "react";

//CONTEXT
import Button from '@material-ui/core/Button';
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const styles = theme => ({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px"
  }
});

class RecruiterQueryResults extends Component{
  constructor(props) {
    super(props);
    this.state = {
        qualifiedCandidates : []
        };
    }

  componentDidMount = async () => {
  
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
          value.pop();
          console.log("Value " , value);
          //pop end

          if (status === 400 || status === 500) {
          alert("Problem with computing: ")
          alert(result.error);
          
          } else {
            this.setState({
              qualifiedCandidates : value
            }
          )
          console.log('Qualified Candidates: ', this.state.qualifiedCandidates)
          console.log('Qualified Candidates 1: ', this.state.qualifiedCandidates[1][2])
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
    const { classes } = this.props;
    if(this.qualifiedCandidates !== undefined){
      return (
        <Grid container spacing={4} className={classes.gridContainer} justify="center">
            {this.state.qualifiedCandidates.map((candidate, i) => (
            <Grid item xs={12} sm={6} md={3}>
            <Card>
            <CardContent>
              <AccountCircleIcon className={classes.svg_icons}/>
              <br/>
              <Typography > {'First Name: '}{candidate[0]} </Typography>
              <br />
              <Typography > {'Last Name: '}{candidate[1]} </Typography>
              <br />
              <Typography > {'Email: '} {candidate[2]} </Typography>
              <br />
              <Typography > {'Relavent Skills: '} 
                {candidate[3]} {candidate[4]}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Accept</Button>
              <Button size="small">Reject</Button>
              <Button size="small">More</Button>
            </CardActions>
            </Card>
            </Grid>
          )
          )}
        </Grid>
        );
    } else {
      return(
        <Typography > {'There are no matching candidates'} </Typography>
      );
    }
    

  }
}

export default withStyles(styles)(RecruiterQueryResults);