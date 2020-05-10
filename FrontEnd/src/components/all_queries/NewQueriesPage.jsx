import React, { Component } from 'react';
import NavigationBarRecruiter from './../recruiter_profile/navigation_bar_recruiter/NavigationBarRecruiter';
import {Link} from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete'; 
import TextField from '@material-ui/core/TextField';

class NewQueries extends Component{
    constructor(props){
        super(props);
        this.state = {
          skills : []
        } 
      }

      
      onChange = (event) =>{
        this.props.updateState({
          [event.target.name]: event.target.value
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
            // skill_count: this.state.skill_count - 1,
            skills: value,
            // skill_options: []
          }, this.parseSkills);
        } else if(this.state.skills.length >= 10){
          // event.target.value='';
          return alert('Only 10 allowed');
        } else if((type === 'create-option') && this.state.skills.length < 10){
          var data = event.target.value.toLowerCase();
          if(this.state.skills && (this.state.skills.filter(currentValue=>data===currentValue).length > 0)){
            return;
          }
          this.setState({ 
            // skill_count: this.state.skill_count + 1,
            skills: [...this.state.skills, value[value.length-1].toLowerCase()],
            // skill_options: []
          },this.parseSkills);
        } else {
          return;
        }
      }



      onSubmit = async(event) =>{
        event.preventDefault() 
      }
       
      
    render(){
      const{query_title, query_description, query_payment} =this.state
      return(
        <div className="NewQuery">
          <NavigationBarRecruiter/>
          <div>
              <form onSubmit={this.onSubmit} >
                  <label htmlFor ="query_title"> Title</label>
                  <input type="text" onChange={this.onChange} value={query_title} name="query_title" />  
                  <label htmlFor ="query_description">Description</label>
                  <input type="text" onChange={this.onChange} value={query_description} name="query_description" />
                  <label htmlFor ="query_payment">Payment </label>
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
                 <Link to = "/query_results_page"> <button>Submit</button> </Link>
              </form>
              <Link to = "/all_queries"><button>Cancel</button></Link>
            </div>
        </div>
      );
  }
}
export default NewQueries;