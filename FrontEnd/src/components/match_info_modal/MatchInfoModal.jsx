import React, { Component } from "react";

//CONTEXT
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: 2,
    textAlign: 'center',
  },
  div: {
    height: '20em',
     overflowY: 'auto',
  },
});

const handleAccept = async (match_id) => {
  console.log(match_id);

  const match_id_obj = {
    "match_id": match_id
  }

  const acceptMatchResponse = await fetch('/api/acceptMatch', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(match_id_obj)
  });

  const status = acceptMatchResponse.status;

  if(status === 400 || status === 500){
    console.log("400 or 500 error")
  }
  else{
    console.log("successfully set match")
    document.location.reload();
  }
}

const MatchInfoModal = (props) => {
  const classes = useStyles();
  //console.log(props.matches.query_info ? props.matches.query_info[0] : null);
  const match_id = props.matches.match_id;
  const match_status = props.matches.match_status;
  const title = props.matches.query_info[0];
  const description = props.matches.query_info[1];
  const salary = props.matches.query_info[2];
  const date = props.matches.query_info[3];
  const recruiter_email = props.matches.recruiter_info ? props.matches.recruiter_info[0] : props.matches.candidate_info[0];
  const recruiter_firstName = props.matches.recruiter_info ? props.matches.recruiter_info[1] : props.matches.candidate_info[1];
  const recruiter_lastName = props.matches.recruiter_info ? props.matches.recruiter_info[2] : props.matches.candidate_info[2];
  const skills = props.matches.skills;

  const handleMore = (event, link) => {
    console.log(event);
    window.open(`/candidate_profile/${link}`, '_blank');
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.close}
    >
      <DialogContent>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <DialogTitle> 
              {'You matched with '}{recruiter_firstName}{" "}{recruiter_lastName}
            </DialogTitle>
          </Paper>
        </Grid>

          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <div className={classes.div}>
                {"Description"}<br/>{description}<br/>
                {"Salary"}<br/>{salary}<br/>
                {"Skills"}<br/>{skills.join(', ')}<br/>
              </div>
            </Paper>
          </Grid>

          {/* <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <div className={classes.div}>
                {"INSERT CANDIDATE PROFILE HERE"}
              </div>
            </Paper>
          </Grid> */}
          <Grid item xs={12}>
            { match_status === 'PENDING' && <Paper className={classes.paper}>
              Would you like to accept {recruiter_firstName}{" "}{recruiter_lastName}{'\'s '}
                  request?'
              <br/>
              <Button size="small" onClick={ (event) => handleMore(event, recruiter_email)}>Candidate Info</Button>
              <Button onClick={() => handleAccept(match_id)} size="small">Accept</Button>
            </Paper> }
            { match_status === 'ACCEPTED' && <Paper className={classes.paper}>
              You have accepted {recruiter_firstName}{" "}{recruiter_lastName}{'\'s '}
                  request.
              <br/>
              {'Contact Info'}<br/>{recruiter_email}
            </Paper> }
          </Grid>
      </Grid>
      </DialogContent>
        <DialogActions>
          <Button onClick={props.close} color="primary">
            Cancel
          </Button>
        </DialogActions>
    </Dialog>
    );  
}

export default MatchInfoModal;
