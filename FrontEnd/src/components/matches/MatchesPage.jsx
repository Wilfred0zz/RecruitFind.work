import React from 'react';
import Button from '@material-ui/core/Button';
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';

import MatchInfoModal from './../match_info_modal/MatchInfoModal'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  columns: {
    textAlign: "center"
  },
  div: {
    height: '20em',
     overflowY: 'auto',
  },
}));

const MatchesPage = (props) => {
  const classes = useStyles();
  const { matches } = props;
  const [ matchState, setMatchState ] = React.useState({});
  const [open, setOpen] = React.useState(false);
  //console.log("THIS IS MATCHES: ")
  //console.log(matches);

  const handleOpen = (match) => {
    setOpen(true);
    setMatchState(match);
    //console.log("HANDLE OPEN")
  };
  
  const handleClose = () => {
    setOpen(false);
    //console.log("HANDLE FALSE")
  };


  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.paper}>MATCHES</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className={classes.paper}>PENDING</div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className={classes.paper}>ACCEPTED</div>
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* handles rendering of pending matches */}
        {
            Object.keys(matches).map((match, i) => {

              //console.log(match);

              const match_id = matches[match].match_id;
              const match_status = matches[match].match_status;
              const title = matches[match].query_info[0];
              const description = matches[match].query_info[1];
              const salary = matches[match].query_info[2];
              const date = matches[match].query_info[3];
              const recruiter_email = matches[match].recruiter_info[0];
              const recruiter_firstName = matches[match].recruiter_info[1];
              const recruiter_lastName = matches[match].recruiter_info[2];
              const skills = matches[match].skills;

              //lmao it works
              // console.log(match_id + match_status + title + description+
              //   salary + date + recruiter_email+recruiter_firstName+recruiter_lastName+skills);

              return(match_status === "PENDING" ? 
                <Card key = {match_id}>
                  <CardContent>
                    <Typography > {'You matched with '}{recruiter_firstName}{" "}{recruiter_lastName}</Typography>
                    <br />
                    <Typography > {'Role: '}{title}</Typography>
                    <br />
                    <Typography > {'Description: '}{description}</Typography>
                    <br />
                    <Typography > {'Matched skills: '}{skills}</Typography>
                  </CardContent>
                  
                  <CardActions>
                    <Button onClick={() => handleOpen(matches[match])} size="small">More Info</Button>
                  </CardActions>
                </Card> : null
              )
            })
          }
          
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* Handles rendering of accepted matches */}
          {
            Object.keys(matches).map((match, i) => {
              const match_id = matches[match].match_id;
              const match_status = matches[match].match_status;
              const title = matches[match].query_info[0];
              const description = matches[match].query_info[1];
              const salary = matches[match].query_info[2];
              const date = matches[match].query_info[3];
              const recruiter_email = matches[match].recruiter_info[0];
              const recruiter_firstName = matches[match].recruiter_info[1];
              const recruiter_lastName = matches[match].recruiter_info[2];
              const skills = matches[match].skills;

              //lmao it works
              // console.log(match_id + match_status + title + description+
              //   salary + date + recruiter_email+recruiter_firstName+recruiter_lastName+skills);

              return(match_status === "ACCEPTED" ? 
                <Card key = {match_id}>
                  <CardContent>
                    <Typography > {'You matched with '}{recruiter_firstName}{" "}{recruiter_lastName}</Typography>
                    <br />
                    <Typography > {'Role: '}{title}</Typography>
                    <br />
                    <Typography > {'Description: '}{description}</Typography>
                    <br />
                    <Typography > {'Skills: '}{skills}</Typography>
                    <br />
                    <Typography > {'Contact: '}{recruiter_email}</Typography>
                  </CardContent>
                  
                  <CardActions>
                  <Button onClick={() => handleOpen(matches[match])} size="small">More Info</Button>
                  </CardActions>
                </Card> : null
              )
            })
          }
        </Grid>
      </Grid>
      {open ? <MatchInfoModal open={open} close={handleClose} matches={matchState}/> : null}
    </div>
  )
}

export default MatchesPage;
