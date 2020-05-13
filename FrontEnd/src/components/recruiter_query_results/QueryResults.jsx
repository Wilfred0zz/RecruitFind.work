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
      query_id: '',
      qualifiedCandidates : [],
      didRegister: true
    };
  }

  componentDidMount = async () => {
    const queryInfo = {...this.props.state, query_date : new Date(Date.now()).toLocaleDateString()};
    

    const queryResponse =  await fetch('/api/query', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(queryInfo)
    });

    const status = queryResponse.status;   

    if(status === 401){
      this.setState({
        is_logged_in: false,
      })
      return;
    }
    if (status === 400 || status === 500) {
      this.setState({
        didRegister: false,
      })
      return;
      const result = await queryResponse.json();
      console.log(result.error);
      // alert(result.error);
    } else {
      // console.log(result);  
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
        const query_id = value.pop();
        
        
        this.setState({
          query_id : query_id
        })



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
        //const temp = JSON.parse(JSON.stringify(state));
      }
  };

  handleMore = (event, link) => {
    console.log(event);
    window.open(`/candidate_profile/${link}`, '_blank');
  }
  
  handleAccept = async (email) => {
    console.log(email);
    console.log(this.state.query_id);

    const data = {
      "candidate_email" : email,
      "query_id" : this.state.query_id
    }

    const acceptMatchResponse = await fetch('/api/match', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    });

    const status = acceptMatchResponse.status;

    if(status === 400 || status === 500){
      console.log("400 or 500 error")
    }
    else{
      console.log("successfully set match to " + email)
    }

  }

  render(){
    const { classes } = this.props;
      return (
        <div>
          {
            this.state.didRegister
            ? null
            : <Redirect to='/recruiter_register_profile'/>
          }
          <NavigationBarRecruiter updateLogout={this.updateLogout}/>
          {
            this.state.is_logged_in
            ? null
            : <Redirect to='/'/>
          }
          <br/>
          <br/>
          <br/>
          <br/>
          <div>
            <Grid container spacing={4} className={classes.gridContainer} justify="center">
              {this.state.qualifiedCandidates.map((candidate, index) => (
              <Grid item xs={12} sm={6} md={3} name={ candidate[2] } key={ candidate[2] }>
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
                <Typography > {'Interests: '}
                  { candidate[3] ? candidate[3] : '' }
                </Typography>
                <br />
                <Typography > {'Relevant Skills: '} 
                  { candidate[4] ? candidate[4].join(', ') : '' }
                </Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => this.handleAccept(candidate[2])} size="small">Accept</Button>
                <Button size="small">Reject</Button>
                <Button size="small" onClick={ (event) => this.handleMore(event, candidate[2])}>More</Button>
              </CardActions>
              </Card>
              </Grid>
              ))}
            </Grid>
            
          </div>
        </div>
        );  
  }
}

export default withStyles(styles)(RecruiterQueryResults);
