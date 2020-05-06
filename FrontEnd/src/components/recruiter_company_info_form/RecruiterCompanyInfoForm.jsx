import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
//REGISTER FORM
import CompanyInfoForm from "./RecruiterCompanyInfoFormParts";
//HEADER
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';

//CONTEXT
import UserContextProvider from "./RecruiterCompanyInfoFormParts/UserContext";

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "25vh",
    alignContent: "stretch",
    [theme.breakpoints.down("sm")]: {
      alignContent: "flex-start"
    },
    backgroundColor:'white',
    width: '70%',
    borderRadius:"1%",
  },
  header1: {
    padding: theme.spacing(5, 5, 2, 0)
  },
  header2:{
    padding: theme.spacing(0, 5, 0, 0)
  }
}));
function RecruiterCompanyInfoForm() {
  const classes = useStyles();
  return (
    <UserContextProvider>
      <Box className={classes.root}>
        <Grid item xs={12}>
          <Typography className={classes.header1} variant='h5'>Company information</Typography>
          <Typography className={classes.header2} variant='h6'>Tell us information about your role and your company so we can find
            right candidates for you!</Typography>
        </Grid>
        <Grid item xs={12}>
          <CompanyInfoForm />
        </Grid>
      </Box>
    </UserContextProvider>
  );
}

export default RecruiterCompanyInfoForm;
