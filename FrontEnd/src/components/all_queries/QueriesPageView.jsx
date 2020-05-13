import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme)=>({
  root: {
    minWidth: 500,
    width: '70%',
    margin: 'auto',
  },
  cardcontent: {
    padding: 16,
    '&:last-child': {
      paddingBottom: 5,
    },
  }
  ,
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    textAlign: 'left',
    display: 'block',
    fontSize: '1.2em',
  },
  button: {
    textAlign: 'center',
    width: '130px',
    margin: 'auto',
    display: 'block',
  },
  date: {
    float: 'right',
    fontSize: 12,
    display: 'block'
  },
  payement: {
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 0,
    fontSize: 10,
    display: 'block',
  },
  description: {
    textAlign: 'left',
    fontSize: '.9em',
    display: 'block',
  },
}));

export default function QueriesPageView (props) {
  const classes = useStyles();
  const { PastQueries } = props;
  
  return (
    <div>
      <br/>
      <br/>
      <br/>
      <br/>
      <Button href='/new_query_page' variant="outlined" className={classes.button} color="primary">New Query</Button>
      {PastQueries.length > 0 
      ? <div>
          <ul>
            {PastQueries.map((query) => (
              <div key={query.query_id}>
              <Card className={classes.root} variant="outlined">
                <CardContent className={classes.cardcontent}>
                  <Typography className={classes.date} color="textSecondary">
                  {query.queryDate} 
                  </Typography>
                  <Typography className={classes.title}>
                  {query.queryTitle}
                  </Typography>
                  <Typography className={classes.description} component="p">
                  {query.queryDescription}
                  </Typography>
                  <Typography className={classes.payement} color="textSecondary" component="p">
                    Payement: {query.queryPayment}
                  </Typography>
                </CardContent>
              </Card>
              <br/>
              </div>
            ))}
          </ul>
        </div>
      : <p id="no-queries" style={{textAlign:"center"}}>No Past Queries</p>}
    </div>
  )
}
