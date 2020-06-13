import React, { Component } from 'react';
import NavigationBarRecruiter from './../recruiter_profile/navigation_bar_recruiter/NavigationBarRecruiter';
import { Redirect } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete'; 
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';

const styles = (theme) => ({
  root: {
    width: '14em',
    float: 'left',
    marginLeft: '5em',
    marginRight: '50%',
    marginBottom: '1em',
  },
  form: {
    marginTop: '20px',
    background: '#F2F3F6',
    width: '600px',
    margin: 'auto',
    height: '35em'
  },
  description: {
    width: '70%',
    float: 'left',
    marginLeft: '5em',
    marginRight: '50%',
    marginBottom: '1em',
  },
  input: {
    height: 100,
  },
  skill: {
    marginLeft: '5em',
    width: '70%',
  },
});

class NewQueries extends Component{
  constructor(props){
    super(props);
    this.state = {
      skills : [],
      moveOn : false,
      is_logged_in: true,
    } 
  }

  onChange = (event) =>{
    this.props.updateState({
      [event.target.name]: event.target.value
    })
  }

  updateLogout = () => {
    this.setState({
      is_logged_in: false
    })
  }

  parseSkills = () =>{
    const body = {};
    for(let i = 0; i < 10; i++){
      // console.log("length: ", this.state.skills.length)
      body[`desired_skill_${i+1}`] = this.state.skills[i] || '';
    }
    this.props.updateState({...body});
  }
      
  // To decrease count or increase count based on skill added
  modifySkill = (event, value, type) => {
    // value contains the selected inputs over time
    if(type === 'remove-option'){
      this.setState({ 
        skills: value,
      }, this.parseSkills);
    } else if(this.state.skills.length >= 10){
      return alert('Only 10 allowed');
    } else if((type === 'create-option') && this.state.skills.length < 10){
      var data = event.target.value.toLowerCase();
      if(this.state.skills && (this.state.skills.filter(currentValue=>data===currentValue).length > 0)){
        return;
      }
      this.setState({ 
        skills: [...this.state.skills, value[value.length-1].toLowerCase()],
      },this.parseSkills);
    } else {
      return;
    }
  }

  onSubmit = async(event) =>{
    event.preventDefault() 
    if(this.props.state.query_title === "" || !this.props.state.query_title){
      return(alert('Need a title'));
    }
    if(this.props.state.query_description === "" || !this.props.state.query_description){
      return(alert('Need a description'));
    }
    if(this.state.skills.length === 0 || !this.state.skills){
      return(alert('Need at least one skill'));
    }
    this.setState({
      moveOn : true
    });
  }

  render(){
    const { classes } = this.props;
    const { query_title, query_description, query_payment } = this.state
    return(
      <div className="NewQuery" id="background_new_query">
        <NavigationBarRecruiter updateLogout={this.updateLogout}/>
        {
          this.state.is_logged_in
          ? null
          : <Redirect to='/'/>
        }
        <br/>
        <br/>
        <br/>
        <br/>
        {
          this.state.moveOn 
          ? <Redirect push to = "/query_results_page"/> 
          :
          
          <div>
          <Modal disablePortal disableEnforceFocus
  disableAutoFocus
  open>
            <div> 
            <br/>
            <br/>
            <br/>
              <div>
                <Paper elevation={2}  className={classes.form}>
                  <br/>
                <h3 style={{textAlign: 'center'}}>Job Posting</h3>
                <form onSubmit={this.onSubmit} >
                  <br/>
                  <TextField variant="outlined" className={classes.root} size='small' type="text" onChange={this.onChange} value={query_title} name="query_title" label="Title"/>
                  <TextField variant="outlined" className={classes.root} size='small' type="text" onChange={this.onChange} value={query_payment} name="query_payment" label="Payment"/>                                    
                  <TextField variant="outlined" className={classes.description} size='small' type="text" onChange={this.onChange} value={query_description} name="query_description" label="Description" InputProps={{className: classes.input,}} multiline/>                  
                  {/* <label htmlFor="query_title"> Title</label>
                  <input type="text" onChange={this.onChange} value={query_title} name="query_title" />   */}
                  {/* <label htmlFor="query_description">Description</label>
                  <input type="text" onChange={this.onChange} value={query_description} name="query_description" />
                  <label htmlFor="query_payment">Payment </label>
                  <input type="text" onChange={this.onChange} value={query_payment} name="query_payment" /> */}
                  <Autocomplete
                    className={classes.skill}
                    multiple // allows multiple entries                 
                    limitTags={10} // only 10 displayed in input box                 
                    freeSolo // add entries not in provided options                 
                    disableClearable={true} // remove delete all option                 
                    size='small' // dispaly small                 
                    id="multiple-limit-tags" // id for this component                 
                    options={[]} // provide no options
                    value={this.state.skills}
                    onChange={this.modifySkill} // when a user presses enter this function occurs                 
                    renderInput={params => ( //display for all entered inputs                   
                      <TextField 
                        {...params}                     
                        variant="outlined"                     
                        label="Skills"                     
                        placeholder="skill-Press enter to input skill press submit when done"                   
                      />                 
                    )}               
                  />
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <Button style={{marginLeft: '220px'}} onClick = {this.onSubmit} >Submit</Button>
                  <Button href='/all_queries'>Cancel</Button>
                </form>
                </Paper>
                
              </div>
          </div>
          </Modal>
          </div>
        }
      </div>
    )
  }
}

NewQueries.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewQueries);