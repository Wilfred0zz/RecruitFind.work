import React, { Component } from 'react';
import NavigationBarRecruiter from './../recruiter_profile/navigation_bar_recruiter/NavigationBarRecruiter';
import {Link, Redirect} from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete'; 
import TextField from '@material-ui/core/TextField';

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
    console.log(this.state.skills);
    this.setState({
      moveOn : true
    });
  }
        
  render(){
    const{query_title, query_description, query_payment} = this.state
    return(
      <div className="NewQuery">
        <NavigationBarRecruiter updateLogout={this.updateLogout}/>
        {
          this.state.is_logged_in
          ? null
          : <Redirect to='/'/>
        }
        {
          this.state.moveOn 
          ? <Redirect push to = "/query_results_page"/> 
          : <div> 
              <div>
                <form onSubmit={this.onSubmit} >
                  <label htmlFor="query_title"> Title</label>
                  <input type="text" onChange={this.onChange} value={query_title} name="query_title" />  
                  <label htmlFor="query_description">Description</label>
                  <input type="text" onChange={this.onChange} value={query_description} name="query_description" />
                  <label htmlFor="query_payment">Payment </label>
                  <input type="text" onChange={this.onChange} value={query_payment} name="query_payment" />
                  <Autocomplete
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
                        label="skills"                     
                        placeholder="skill"                   
                      />                 
                    )}               
                  />
                  <button onClick = {this.onSubmit} >Submit</button>
                </form>
                <Link to="/all_queries"><button>Cancel</button></Link>
              </div>
          </div>
        }
      </div>
    )
  }
}

export default NewQueries;
