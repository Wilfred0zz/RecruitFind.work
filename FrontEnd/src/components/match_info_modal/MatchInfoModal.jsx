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

const MatchInfoModal = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  console.log(props);
  //console.log(isOpen);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogContent>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <DialogTitle> {}</DialogTitle>
          </Paper>
        </Grid>

          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <div className={classes.div}>
                {"csacas"}
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
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
    </Dialog>
    );  
}

export default MatchInfoModal;
