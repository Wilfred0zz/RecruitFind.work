import React, { Component } from "react";
import { Redirect } from 'react-router-dom';

//CONTEXT
import Button from '@material-ui/core/Button';
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NavigationBarRecruiter from './../recruiter_profile/navigation_bar_recruiter/NavigationBarRecruiter';

const styles = theme => ({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
  }
});

class RecruiterQueryResults extends Component{
  constructor(props) {
    super(props);
    this.state = {
      is_logged_in: true,
      qualifiedCandidates : []
    };
  }

  componentDidMount = async () => {
    const queryInfo = {...this.props.state, query_date : new Date(Date.now()).toLocaleDateString()};
    console.log(queryInfo);

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
      // const result = await queryResponse.json();
      if (status === 400 || status === 500) {
        alert("Problem with query: ")
        // alert(result.error);
      } else {
        // console.log(result);
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
          if(status === 401){
            this.setState({
              is_logged_in: false,
            })
            return;
          }
          const result = await computeQueryResponse.json();
          const value = Object.values(result);
          console.log(result);
          value.pop();
          console.log("Value " , value);
          //pop end

          if (status === 400 || status === 500) {
            alert("Problem with computing: ")
            alert(result.error);
          } else {
            this.setState({
              qualifiedCandidates : value
            })
            console.log('Qualified Candidates: ', this.state.qualifiedCandidates)
            //console.log('Qualified Candidates 1: ', this.state.qualifiedCandidates[3])
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

  updateLogout = () => {
    this.setState({
      is_logged_in: false
    })
  }

  handleMore = (event, link) => {
    console.log(event);
    window.open(`/candidate_profile/${link}`, '_blank');
  }
  
  render(){
    const { classes } = this.props;
      return (
        <div>
          <NavigationBarRecruiter updateLogout={this.updateLogout}/>
          {
            this.state.is_logged_in
            ? null
            : <Redirect to='/'/>
          }
          <div>
            <Grid container spacing={4} className={classes.gridContainer} justify="center">
              {this.state.qualifiedCandidates.map((candidate, i) => (
              <Grid item xs={12} sm={6} md={3} key={'candidate' + i}>
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
                <Typography > {'Relevant Skills: '} 
                  {candidate[3]} {" "} {candidate[4]}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Accept</Button>
                <Button size="small">Reject</Button>
                <Button size="small" onClick={ (event) => this.handleMore(event, candidate[2])}>More</Button>
              </CardActions>
              </Card>
              </Grid>
              )
              )}
            </Grid>
            
          </div>
        </div>
        );  
  }
}

export default withStyles(styles)(RecruiterQueryResults);
