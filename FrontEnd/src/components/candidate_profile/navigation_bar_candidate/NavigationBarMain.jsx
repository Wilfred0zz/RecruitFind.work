import React, { Component } from "react"
import { withStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import { Redirect } from 'react-router-dom';
import Logo from './../static/css/images/text.jpeg'

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
    backgroundColor: 'white'
  }
});

class NavigationBarMain extends Component {
    constructor(props){
        super(props);
        this.state = {
          isLoggedIn: false,
          email: '',
          password: '',
          status: ''
        };
    }

    handleChange = (event) =>{
        this.setState({
        [event.target.name]: event.target.value
        })
    } 

    confirmLogIn = async (event) => {
        event.preventDefault();
        
        const user = {
          "email": this.state.email, 
          "password": this.state.password
        }
    
        try{
          const response = await fetch('/api/login', {
            headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(user)
          });
    
          const status = response.status;
          const result = await response.json();
    
          if (status === 400 || status === 500) {
            alert(result.error);
          } else {
            this.setState({
              isLoggedIn: true,
              status: result.status
            })
          }
        } catch (error) {
          console.log(error);
        }
      }

render() {
    const { classes } = this.props;
    
    return (
    <div>
      { this.state.isLoggedIn === true  ? 
            [
            (
              this.state.status === 'candidate'
              ? <Redirect key="candidate" push to='/candidate_profile'/>
              : <Redirect key="recruiter" push to='/recruiter_profile'/>
            )
          ] :  
        <AppBar position="static" className={classes.toolBar}>
        <Toolbar>
            <img src={Logo} className={classes.logo}/>
            <Typography variant="h6" className={classes.title}>
              RecruitFind
            </Typography>
            <Button className={classes.buttons} color="inherit">
            Home Page
            </Button>
            <Button className={classes.buttons} color="inherit">About</Button>
            <Button className={classes.buttons} color="inherit">Contact</Button>
            <TextField
                InputProps={{
                    className: classes.input,
                }}
                placeholder='Email'
                name='email'
                type='email'
                size='small'
                value={this.state.email}
                variant='outlined'
                InputLabelProps={{
                shrink: true
                }}
                onChange={this.handleChange}
                required
            />
            <TextField
                InputProps={{
                    className: classes.input,
                }}
                size='small'
                placeholder='Password'
                name='password'
                type='password'
                value={this.state.password}
                variant='outlined'
                InputLabelProps={{
                shrink: true
                }}
                onChange={this.handleChange}
                required
            />
            <Button className={classes.buttons} color="inherit" onClick={this.confirmLogIn}>Login</Button>
        </Toolbar>
        </AppBar>
    }
    </div>
    );
}
}
export default withStyles(styles, { withTheme: true })(NavigationBarMain);