import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import AboutUsInfo from './AboutUsInfo'
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  abtUs: {
    height: '18vh',
    padding: theme.spacing(2),
    textAlign: 'center',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
  abtUsDes:{
    backgroundColor: 'white',
    height: '75vh',
    paddingTop: '10vh',
    paddingLeft : '20vh',
    paddingRight : '20vh',
    justifyContent: "center"
  },
  cards: {
    paddingTop: '2vh',
    paddingLeft : '2vh',
    paddingRight : '2vh',
    justifyContent: "center",
  },
  card: {
    width: 200,
    height: 250,
    margin: '2vh',
  },
  media: {
    height: 125,
  },
  theTeam:{
    paddingTop: '3vh',
  }
}));

const AboutUs = () => {
  const classes = useStyles();
  const teamArr = AboutUsInfo.team;
  //console.log(teamArr);

  return (
    <div className={classes.root}>
      <Grid container>
        {/* Top half */}
        <Grid item xs={12}>
          <Typography className={classes.abtUs}>About US</Typography>
        </Grid>
        {/* Text in middle */}
        <Grid item xs={12} className={classes.abtUsDes}>
          <Typography variant="h4"> FIND THE RIGHT PERSON FOR THE JOB </Typography>
          <Typography>  {AboutUsInfo.abtUsText} </Typography>
            
            {/* Our Profiles lmao */}
            <Grid item xs={12} className={classes.theTeam}><Typography variant="h5"> {"The team"}</Typography></Grid>
            <Grid container className={classes.cards}>
              {teamArr.map((teammember) => (
                <Card key={teammember.name} className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image={teammember.picture}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {teammember.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {teammember.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Grid>
        </Grid>


      </Grid>
    </div>
  );
}

export default AboutUs;
