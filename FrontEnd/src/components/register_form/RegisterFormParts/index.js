import React, { Fragment, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
//MY MODULES
import UserDetails from "./UserDetails";
//GENERAL
import { Box, Snackbar, SnackbarContent, Typography } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import { Redirect } from "react-router-dom";

//FORM
import Button from "@material-ui/core/Button";
//CONTEXT
import { UserContext } from "./UserContext";

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(8, 12)
    },
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(4, 6)
    },
    borderRadius:"1%",
    backgroundColor:'white',
  },
  center: {
    textAlign: "center"
  },
  content: {
    padding: theme.spacing(3, 3, 3, 3)
  },
  buttonsContainer: {
    margin: theme.spacing(2, 0)
  },
  button: {
    marginRight: theme.spacing(2)
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  message: {
    display: "flex",
    alignItems: "center"
  },
  icon: {
    marginRight: theme.spacing(1)
  }
}));

//MAIN COMPONENT
export default props => {
  const [completed, setCompleted] = React.useState(false);
  const classes = useStyles();
  const [errors] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [state, setState] = useContext(UserContext);

  const handleCloseSnackbar = () => {
    setOpen(false);
  };

  const handleLogin = async () => {
    const user = {
      "email": state.user.email, 
      "password": state.user.password
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
        console.log("Successfully logged in");
      }
    } catch (error) {
      alert("there is an error");
      console.log(error);
    } 
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCompleted();
    
    const PersonalInfo = {
      "email": state.user.email, 
      "password": state.user.password, 
      "first_name": state.user.first_name, 
      "last_name": state.user.last_name, 
      "personal_street_address": state.user.personal_street_address, 
      "personal_city": state.user.personal_city,
      "personal_state": state.user.personal_state, 
      "personal_postal": state.user.personal_postal, 
      "personal_country": state.user.personal_country, 
      "phone_number": state.user.phone_number, 
      "status": state.user.status, 
      "gender": state.user.gender
    }

    try {
      const response = await fetch('/api/register', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify(PersonalInfo)
        });
    
      const status = response.status;   
      const result = await response.json();

      if (status === 400 || status === 500) {
        alert(result.error);
      } else {
        console.log(result.status_info);
        // get the user logged in if registration is a success
        await handleLogin();
        // update state in order to lead to profile page on redirect
        const temp = JSON.parse(JSON.stringify(state));
        temp.user.isRegistered = true;
        setState(temp);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleError = e => {
    errors[e.target.name] = e.target.validationMessage;
    setState({ ...state, errors: { ...errors } });
    setOpen(true);
  };

  const handleChange = e => {
    //PASSWORD MATCHING
    if (
      e.target.name === "confirmPassword" &&
      e.target.value !== state.user.password
    ) {
      e.target.setCustomValidity("Passwords are not matching");
    } else {
      e.target.setCustomValidity("");
    }
    if (e.target.name === "password") {
      const confirm = e.target.form.querySelector(
        "input[name='confirmPassword']"
      );
      // WHEN WE CHANGE PASSWORD, WE WANT TO VALIDATE CONFIRM PASSWORD AS WELL
      if (e.target.value === state.user.confirmPassword) {
        delete errors[confirm.name];
        confirm.setCustomValidity("");
      } else {
        confirm.setCustomValidity("Passwords are not matching");
        errors[confirm.name] = confirm.validationMessage;
      }
    }
    if (e.target.validity.valid) {
      //OTHER ELEMENTS
      delete errors[e.target.name];
    } else {
      errors[e.target.name] = e.target.validationMessage;
    }
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setState({
      ...state,
      user: { ...state.user, [e.target.name]: value },
      errors: { ...errors },
      company: { ...state.company, [e.target.name]: value },
    });

  };
  return ( 
    <div>
    
    {/* put into component for easier reading later
      This is to either redirect user on login to either candidate profile
      or recruiter profile
      needed to add key because it was giving a warning of list children having keys
      */}
    { state.user.isRegistered === true ? 
    [(
        state.user.status === 'candidate' ? 
        <Redirect key="candidate" push to='/candidate_profile' state={ state.user.first_time = 'true' } /> :
        <Redirect key="recruiter" push to='/recruiter_register_profile'/> 
    )]: null }

    <Fragment>
      {!completed && (
        <Box className={classes.root}>
            <Typography> Register </Typography>
            <form
              onSubmit={handleSubmit}
              onInvalid={handleError}
              onChange={handleChange}
              className={classes.content}
            >
              <UserDetails/>
              <Button
                type='submit'
                className={classes.button}
                variant='contained'
                color='primary'
              >
                Submit
              </Button>
            </form>
        </Box>
      )}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        resumeHideDuration={3000}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        open={open}
      >
        <SnackbarContent
          className={(classes.error, classes.error)}
          message={
            <span className={classes.message}>
              <ErrorIcon className={classes.icon} />
              {"Please correct the data"}
            </span>
          }
        />
      </Snackbar>
      {completed && (
        <Box className={(classes.root, classes.center)}>
        </Box>
      )}
    </Fragment>
    </div>
  );
};
