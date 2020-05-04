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
    personal_state,  personal_city, personal_postal, personal_country, phone_number} = state.user;
  const { company_name, recruiter_position, company_street_address, company_state, company_city,
    company_postal, company_country } = state.company;
  return (
    <Fragment>
      <Grid container className={classes.summary}>
        <Grid item xs={12}>
          <Typography variant='h3'>Summary</Typography>
          <Typography variant='h4'>Personal Information</Typography>
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
              {/* Displaying Company Information */}
      <Grid item xs={12}>
        <Typography variant='h4'>Company Information</Typography>
      </Grid>
      <Grid item xs={12}>
          <Typography variant='h6'>Company name</Typography>
          <Typography variant='body2'>{company_name}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6'>Recruiter position</Typography>
          <Typography variant='body2'>{recruiter_position}</Typography>
        </Grid>
      <Grid item xs={12}>
          <Typography variant='h6'>Company Address</Typography>
          <Typography variant='body2'>{company_street_address}{', '}{company_state}{', '}
             {company_city}{', '}{company_postal}{', '}{company_country} </Typography>
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
