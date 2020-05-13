import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Logo from '../../navigation_bar_main/static/images/text.jpeg'

const styles = theme => ({
  toolBar: {
    position: "fixed",
    width: "100%",
    left: 0,
    top: 0,
    flexGrow: 1,
    backgroundColor: 'black',
  },
  logo: {
    position: "absolute",
    left: -40,
    maxWidth:'250%',
    height: '250%',
    paddingRight: '100%',
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    paddingLeft: '3.5%'
  },
  buttons: {
    marginRight: '1vh'
  },
  form: {
      display: 'inline',
  },
  input: {
    height: 26,
    backgroundColor: 'white',
    borderRadius: 0,
    marginRight: '2vh',
  }
});

class NavigationBarMain extends Component {
  constructor(props){
    super(props);
    this.state = {
      is_logged_in: true,
      email: '',
      password: '',
      status: ''
    };
  }

  handleLogOut = async (event) => {
    try{
      const response = await fetch('/api/logout', {
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PUT'
      });

      const status = response.status;
      const result = await response.json();

      if (status === 400 || status === 500) {
        alert(result.error);
      } else {
        // console.log(this.props);
        //this.props.updateLogout();
        this.setState({
          is_logged_in: false
        })
        console.log("Successfully logged out");
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        { 
          this.state.is_logged_in 
          ? <AppBar position="static" className={classes.toolBar}>
            <Toolbar>
              <img src={Logo} className={classes.logo} alt='RecruitFind'/>
              <Typography variant="h6" className={classes.title}>
                RecruitFind
              </Typography>
              <Button className={classes.buttons} href='recruiter_profile' color="inherit">Profile</Button>
              <Button className={classes.buttons} href='all_queries' color="inherit">Searches</Button>
              <Button className={classes.buttons} href='recruiter_matches' color="inherit">Matches</Button>
              <Button className={classes.buttons} onClick={this.handleLogOut} color='inherit'>Log Out</Button>
            </Toolbar>
          </AppBar>
          : <Redirect push to='/'/>
        }
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(NavigationBarMain);