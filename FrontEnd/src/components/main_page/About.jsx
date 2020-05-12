import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  abtUs: {
    height: '20vh',
    padding: theme.spacing(2),
    textAlign: 'center',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
  abtUsDes:{
    height: '80vh',
  }
}));

export default function AboutUs() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Typography className={classes.abtUs}>About US</Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <Typography className={classes.abtUsDes}>HELP</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
