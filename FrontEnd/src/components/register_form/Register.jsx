import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
//REGISTER FORM
import RegisterForm from "./RegisterFormParts";
//HEADER
//CONTEXT
import UserContextProvider from "./RegisterFormParts/UserContext";

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "100vh",
    alignContent: "stretch",
    [theme.breakpoints.down("sm")]: {
      alignContent: "flex-start"
    },
    width: '75%',
    borderRadius:"1%",
  }
}));

function Register(props) {
  const classes = useStyles();
  return (
    <UserContextProvider className={classes.content}>
      <Box container className={classes.root}>
        <RegisterForm/>
      </Box>
    </UserContextProvider>
  );
}
export default Register;
