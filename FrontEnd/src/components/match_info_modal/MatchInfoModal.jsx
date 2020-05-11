import React, { Component } from "react";

//CONTEXT
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  div: {
    height: '20em',
     overflowY: 'auto',
  },
});

class MatchInfoModal extends Component{
  constructor(props) {
    super(props);
    this.state = {
      job_title: 'test title match with ______',
      job_description: 'test description',
      fetch_cand_prof: false,
      recruiter_contact: "",
      candidate_contact: '',
      isOpen: false,
  }
}

  handleClickOpen = () => {
    console.log("TESTING: " + this.state.job_description)
    this.setState({ 
      isOpen: true,
    })

    //fetch the job description
  };

  handleClose = () => {
    this.setState({ 
      isOpen: false,
    })
  };

  render(){
    const { classes } = this.props;

      return (
      <div className={classes.root}>
        <Button onClick={this.handleClickOpen}> Matches more info modal </Button>
        
        <Dialog	
          open={this.state.isOpen}
          onClose={this.handleClose}
        >
        <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <DialogTitle>{this.state.job_title} {" Match"}</DialogTitle>
            </Paper>
          </Grid>

            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <div className={classes.div}>
                  {"INSERT JOB DESCRIPTION HERE"}
                </div>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <div className={classes.div}>
                  {"INSERT CANDIDATE PROFILE HERE"}
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>{'CONTACT'}</Paper>
            </Grid>
        </Grid>
        </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
        );  
  }
}

export default withStyles(styles)(MatchInfoModal);
