import React, { useContext } from "react";
//GENERAL
import { TextField, Grid } from "@material-ui/core";
//CONTEXT
import { UserContext } from "./UserContext";
import Autocomplete from 'react-google-autocomplete';
import { InputLabel } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

const genders = [
  {
    value: 'Male',
    label: 'Male',
  },
  {
    value: 'Female',
    label: 'Female',
  },
  {
    value: 'Other',
    label: 'Other',
  }
];

export default props => {
  const [gender, setGender] = React.useState('');
  const [state] = useContext(UserContext);
  const { user, errors } = state;
  const dateLimit = new Date();
  dateLimit.setFullYear(dateLimit.getFullYear() - 18);

  const handleGenderChange = (event) => {
    setGender(event.target.value);
    user.gender = event.target.value;
  };

  function handleGoogleChangeP(event){
    console.log(event.address_components);
    const code = parseInt(event.address_components[6].long_name);
    const state = event.address_components[5].short_name;
    const address = event.address_components[0].long_name + ' ' + event.address_components[1].long_name;
    const country = event.address_components[6].short_name;
    const city = event.address_components[2].short_name;
    user.personal_street_address = address;
    user.personal_state = state;
    user.personal_city = city;
    user.personal_postal = code;
    user.personal_country = country;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          placeholder='Type your first name here'
          name='first_name'
          label='First name'
          value={user.first_name}
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
          placeholder='Type your last name here'
          name='last_name'
          label='Last name'
          value={user.last_name}
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
          placeholder='Type your email here'
          name='email'
          label='Email'
          value={user.email}
          type='email'
          variant='outlined'
          margin='normal'
          InputLabelProps={{
            shrink: true
          }}
          error={!!errors["email"]}
          required
          fullWidth
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          placeholder='Type your password here'
          name='password'
          label='Password'
          value={user.password}
          type='password'
          variant='outlined'
          margin='normal'
          InputLabelProps={{
            shrink: true
          }}
          required
          error={!!errors["password"]}
          inputProps={{
            minLength: 6,
            maxLength: 20
          }}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          placeholder='Re-type your password here'
          label='Password'
          name='confirmPassword'
          value={user.confirmPassword}
          type='password'
          variant='outlined'
          margin='normal'
          InputLabelProps={{
            shrink: true
          }}
          error={!!errors["confirmPassword"]}
          inputProps={{
            minLength: 6,
            maxLength: 20
          }}
          required
          fullWidth
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          type='phone_number'
          name='phone_number'
          id='phone_number'
          label='Phone number'
          defaultValue={user.phone_number}
          placeholder="xxx-xxx-xxxx"
          variant='outlined'
          margin='normal'
          InputLabelProps={{
            shrink: true
          }}
          
        />
      </Grid>
      <Grid item xs={12} lg={6}>
      <InputLabel shrink={true}> Enter your gender</InputLabel>
      <TextField
          required
          id="select-gender"
          select
          label="Select"
          name='gender'
          onChange={handleGenderChange}
          value={gender}
          helperText="Select your gender"
        >
          {genders.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} lg={6}> 
        <InputLabel shrink={true}> Enter your personal address </InputLabel>
        <Autocomplete
          name = 'googleapiP'
          required
          style={{width:'50%'}}
          onPlaceSelected={(place) => {
            console.log(place);
            handleGoogleChangeP(place);
          }}
          types={['geocode', 'establishment']}
          componentRestrictions={{country: "us"}}/>  
      </Grid>
    </Grid>
  );
};
