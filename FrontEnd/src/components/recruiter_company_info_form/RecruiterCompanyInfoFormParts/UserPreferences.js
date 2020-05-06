import React, { useContext } from "react";
import { UserContext } from "./UserContext";

//GENERAL
import { TextField, Grid } from "@material-ui/core";
import { InputLabel } from '@material-ui/core';

import Autocomplete from 'react-google-autocomplete';

//USER PREFERENCES
export default props => {
  const [state] = useContext(UserContext);
  const { company } = state;

  function handleGoogleChangeR(event){
    //console.log(event.address_components);
    const code = parseInt(event.address_components[6].long_name);
    const state = event.address_components[5].short_name;
    const address = event.address_components[0].long_name + ' ' + event.address_components[1].long_name;
    const country = event.address_components[6].short_name;
    const city = event.address_components[2].short_name;
    company.company_street_address = address;
    company.company_state = state;
    company.company_city = city;
    company.company_postal = code;
    company.company_country = country;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          placeholder='Type your Company name here'
          name='company_name'
          label='Company name'
          value={company.company_name}
          variant='outlined'
          InputLabelProps={{
            shrink: true
          }}
          required
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          placeholder='Type your position at your here'
          name='recruiter_position'
          label='Recruiter position'
          value={company.recruiter_position}
          variant='outlined'
          InputLabelProps={{
            shrink: true
          }}
          required
          fullWidth
        />
      </Grid>
      <Grid item xs={12} lg={6}> 
      <InputLabel shrink={true}> Enter your Company address </InputLabel>
        <Autocomplete
          style={{width: '50%'}}
          onPlaceSelected={(place) => {
            console.log(place);
            handleGoogleChangeR(place);
          }}
          types={['geocode', 'establishment']}
          componentRestrictions={{country: "us"}}/>  
      </Grid>
    </Grid>
  );
};
