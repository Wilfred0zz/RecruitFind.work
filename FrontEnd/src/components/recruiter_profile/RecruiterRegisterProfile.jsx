import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Autocomplete from 'react-google-autocomplete';
import { withStyles } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import { TextField } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import {MuiThemeProvider,createMuiTheme} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";



const muiBaseTheme = createMuiTheme();

const theme = ({
  form: {
    marginTop: '20px',
    background: '#F2F3F6',
    width: '600px',
    flexWrap: 'wrap',
    height: '35em',
    alignItems: 'center'
    },
  input: {
    height: 100,
  },
  alignItemsAndJustifyContent: {
    width: 500,
    height: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  input: {
    height: 100,
  },
  overrides: {
    MuiCard: {
      root: {
        "&.MuiEngagementCard--01": {
          marginTop: "7em",
          transition: "0.3s",
          maxWidth: 550,
          margin: "auto",
          boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
          "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
          },
          "& .MuiCardMedia-root": {
            paddingTop: "56.25%"
          },
          "& .MuiCardContent-root": {
            textAlign: "left",
            padding: muiBaseTheme.spacing.unit * 3
          },
          "& .MuiDivider-root": {
            margin: `${muiBaseTheme.spacing.unit * 3}px 0`
          },
          "& .MuiTypography--heading": {
            fontWeight: "bold"
          },
          "& .MuiTypography--subheading": {
            lineHeight: 1.8
          },
          "& .MuiAvatar-root": {
            display: "inline-block",
            border: "2px solid white",
            "&:not(:first-of-type)": {
              marginLeft: -muiBaseTheme.spacing.unit
            }
          }
        }
      }
    }
  }
});


class RecruiterRegisterProfile extends Component{
  constructor(props){
    super(props);
    this.state = { 
      // first_time_login: true,
      is_logged_in: true,
      recruiter_company_update: false,
      // Add personal information like location they live at, gender, and more if they wanna change
      recruiter_city: "",
      recruiter_company: "",
      recruiter_company_street_address: "",
      recruiter_country: "",
      recruiter_position: "",
      recruiter_postal: 0,
      recruiter_state: "",
    }
  }

  handleChange = (event) =>{
    this.setState({
      [event.target.name]: event.target.value
    })
  } 

  handleGoogleChange = (event) =>{
    if(!event.formatted_address || event.formatted_address.split(',').length <= 3) {
      alert('please enter a specific location');
      return;
    }
    let [ address, city, state_zip, country ] = event.formatted_address.split(',');
    city = city.substr(1);
    country = country.substr(1);
    state_zip = state_zip.substr(1);
    let [ state, code ] = state_zip.split(" ");
    // code = parseInt(code);
    this.setState({
      recruiter_company_street_address: address,
      recruiter_state: state,
      recruiter_city: city,
      recruiter_postal: code,
      recruiter_country: country
    })
  } 

  handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      "recruiter_company": this.state.recruiter_company,
      "recruiter_position": this.state.recruiter_position,
      "recruiter_company_street_address": this.state.recruiter_company_street_address,
      "recruiter_city": this.state.recruiter_city,
      "recruiter_postal": this.state.recruiter_postal,
      "recruiter_country": this.state.recruiter_country,
      "recruiter_state": this.state.recruiter_state,
      "is_deleted": false
    }

    try{
      const response = await fetch('/api/recruiterProfile', {
        headers:{
          // 'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
      });

      const status = response.status;
      const result = await response.json();

      if (status === 400 || status === 500) {
        alert(result.error);
      } else { // gather other information about the canddiate and update state to render it
        this.setState({
          recruiter_company_update: true
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  fetchRecruiterPersonalInfo= async () => {
    try{
      const response = await fetch('/api/fetchRecruiterPersonalInformation', {
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'GET',
      });
      let status = response.status;
      if(status === 401){
        this.setState({
          is_logged_in: false
        })
        return;
      }
      let result = await response.json();
  
      if (status >= 400) {
        // If I dont get an error it means user isn't logged in
        if(!result.error || result.error === 'User Not Authenticated!') {
          console.log("User doesn't exist or isn't logged in and should be redirected to login");
          this.setState({
            is_logged_in: false
          })
        }
        else {
          this.setState({
            didRegister: false
          })
          return;
        }
      } else { // user already has info so not the first time they are registering, so redirect them
        console.log(result);
        const { email, first_name, gender, last_name, personal_city, personal_country ,personal_postal, personal_state, personal_street_address, phone_number} = result;
        this.setState({
          email: email,
          first_name: first_name,
          gender: gender,
          last_name: last_name,
          personal_city: personal_city,
          personal_country: personal_country,
          personal_postal: personal_postal,
          personal_state: personal_state,
          personal_street_address: personal_street_address,
          phone_number: phone_number

        }, () => console.log(this.state.first_name, this.state.last_name))
        
      }

    } 
    catch(error) {
      console.log(error);
    }
  }


  // Fetch All Data, and see if any information exists
  // if it does set company_update tot rue cause it already exists
  fetchRecruiterCompanyInfo = async () => {
    try{
      const response = await fetch('/api/fetchRecruiterProfileInfo', {
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'GET',
      });

      const status = response.status;

      if (status === 400 || status === 500) {
        if(status === 401){
          this.setState({
            is_logged_in: false,
          })
        }
        var result = await response.json();
        // If I dont get an error it means user isn't logged in
        if(!result.error) {
          console.log("User doesn't exist or isn't logged in and should be redirected to login");
          this.setState({
            is_logged_in: false
          })
        }
      } else { // user already has info so not the first time they are registering, so redirect them
        // const { recruiter_city, recruiter_company, recruiter_company_street_address, recruiter_country, recruiter_position, recruiter_postal, recruiter_state } = result;
        this.setState({
          recruiter_company_update: true
        }, () => console.log(this.state))
      }
    } catch (error) {
      console.log(error);
    }
  }

  // need a fetch for candidate name, and description, etc.

  componentDidMount = async () => {
    await this.fetchRecruiterCompanyInfo();
  }

  render() {
    const{ classes } =this.props
    return (
      <MuiThemeProvider theme={createMuiTheme(theme)}>
      <div className='recruiter_profile'>
        { // Redirect them to main page to log in, if they aren't logged in
          !this.state.is_logged_in 
          ? <Redirect to='/'/>
          : null
        }
        <h1>Welcome Recruiter{/** Need to add name, API doesn't exist yet*/}</h1>
        {/* Check if the user registered for the first time by looking at update state*/}
        {!this.state.recruiter_company_update ? 
          <div className='create_recruiter_profile'>
             <Card className={"MuiEngagementCard--01"}>
              <CardContent className={"MuiCardContent-root"}>
                <Typography
                    className={"MuiTypography--heading"}
                    variant={"h4"}
                    gutterBottom>
                      <p>{this.state.first_name} {" "} {this.state.last_name}</p> 
                </Typography>
                <Divider className={"MuiDivider-root"} light />
              <form className='recruiter_company_info'>
                <TextField id="outlined-helperText" className='' label="Company Name" defaultValue="Enter Company"  variant="outlined" name='recruiter_company' onChange={this.handleChange}/>
                  <br/>
                  <br/>
                <TextField id="outlined-helperText" className='' label="Position" defaultValue="Position in Company" variant="outlined" name='recruiter_position' onChange={this.handleChange}/>
                  <br/>
                  <br/>
                <Autocomplete
                  required
                  style={{width:'60%', height:'100', fontSize: "1.2em"}}
                  onPlaceSelected={(place) => {
                    this.handleGoogleChange(place);
                  }}
                  types={['geocode', 'establishment']}
                  componentRestrictions={{country: "us"}}
                /> 
                  <br/>
                  <br/>
                <Button variant="outlined" onClick={this.handleSubmit}>Submit</Button> 
              </form>
              </CardContent>
            </Card>
          </div> 
        :
          <Redirect to="/recruiter_profile"/>
        }
      </div>
      </MuiThemeProvider> 
    )
  }
}

export default RecruiterRegisterProfile;
