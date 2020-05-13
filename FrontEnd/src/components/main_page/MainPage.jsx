import React, { Component } from 'react';
import MainNavBar from '../navigation_bar_main/NavigationBarMain';
import RegisterForm from './../register_form/Register';
import officeImg from './static/images/office.jpeg';
import AboutUs from './About'
import { TextField, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
//import DisplayPastQueries from './../all_queries/QueriesPage';
//import RecruiterQueryResults from './../recruiter_query_results/QueryResults';
import { Redirect } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = () => ({
  root:{
    height: '100vh',
    position: 'absolute',
    top: 0,
    height: '100%',
    left:0,
  },
  form: {
    paddingTop: '13vh',
  },
  img : {
    zIndex: -1,
    width: '100%',
    position: 'absolute',
    top: 0,
    height: '100%',
    left:0,
  },
  slogan:{
    textAlign:'center',
    paddingTop: '25vh',
    color: 'white',
    paddingLeft: '10vh',
    paddingRight: '10vh',
  }
});

class MainPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <MainNavBar/>
        <Grid container>
        <Grid item xs={12} sm={6} className={classes.slogan}>
          <Typography variant="h2"> Don't be a slob, get a job </Typography>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.form}>
          <RegisterForm/>
        </Grid>
          
        </Grid>
        <AboutUs/>
        <img className={classes.img} src={officeImg} alt="officeImg"/>
      </div>
    )
  }
}
export default withStyles(styles)(MainPage);
