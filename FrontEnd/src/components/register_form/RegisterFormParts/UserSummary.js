import React, { useContext, Fragment } from "react";
import { UserContext } from "./UserContext";
import { makeStyles } from "@material-ui/core/styles";

//GENERAL
import {
  Typography,
  Grid,
  Checkbox,
  FormControlLabel
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  summary: {
    padding: theme.spacing(3),
    border: "1px solid #ddd",
    marginBottom: theme.spacing(2)
  }
}));
// SUMMARY COMPONENT
export default props => {
  const classes = useStyles();
  const [state] = useContext(UserContext);
  const { first_name, last_name, gender, email, personal_street_address,
    personal_state,  personal_city, personal_postal, personal_country, 
    phone_number, status } = state.user;
  return (
    <Fragment>
      <Grid container className={classes.summary}>
        <Grid item xs={12}>
          <Typography variant='h6'>Confirm is the following information is correct</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6'>You are a {status} </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6'>First name</Typography>
          <Typography variant='body2'>{first_name}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6'>Last name</Typography>
          <Typography variant='body2'>{last_name}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6'>Email</Typography>
          <Typography variant='body2'>{email}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6'>Phone number</Typography>
          <Typography variant='body2'>{phone_number}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6'>Gender</Typography>
          <Typography variant='body2'>{gender}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6'>Address</Typography>
          <Typography variant='body2'>{personal_street_address}{', '}{personal_state}{', '}
             {personal_city}{', '}{personal_postal}{', '}{personal_country} </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.user.acceptTerms}
                required
                color='primary'
                name='acceptTerms'
              />
            }
            label='I accept terms and conditions'
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};
