import React, { Component } from 'react';
import NavigationBarRecruiter from './../recruiter_profile/navigation_bar_recruiter/NavigationBarRecruiter';
import {Link} from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete'; 
import TextField from '@material-ui/core/TextField';

class NewQueries extends Component{
    constructor(props){
        super(props);
        this.state = { query_title: "",
          query_description: "",
          query_payment: "",
          query_date: "",
          skills: [],
          desired_skill_1: "",
          desired_skill_2: "",
          desired_skill_3: "",
          desired_skill_4: "",
          desired_skill_5: "",
          desired_skill_6: "",
          desired_skill_7: "",
          desired_skill_8: "",
          desired_skill_9: "",	
          desired_skill_10: "",
        }
      }
       refreshPage() {
        window.location.reload(false);
      }

      setDate =async() =>{
        this.setState({query_date:new Date(Date.now()).toLocaleDateString()})
      }
      
      onChange = (event) =>{
        this.setState({
          [event.target.name]: event.target.value
        },  console.log(this.state))
      }
      
          // To decrease count or increase count based on skill added
      modifySkill = (event, value, type) => {
        // value contains the selected inputs over time
        if(type === 'remove-option'){
          this.setState({ 
            // skill_count: this.state.skill_count - 1,
            skills: value,
            // skill_options: []
          });
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
          });
        } else {
          return;
        }
      }


      handleSkillSubmission = async () => {
        // console.log(this.state)
        if(!this.state.skills || this.state.skills.length < 1){
          // return(alert("Please enter atleast one skill"));
          throw(Error(alert("Please enter atleast one skill")));
        }
        const body = {};
        for(let i = 0; i < this.state.skills.length; i++){
          // console.log("length: ", this.state.skills.length)
          body[`desired_skill${i}`] = this.state.skills[i];
        }
          // console.log
          const response = await fetch('/api/query',{
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(body)
          })
          
          const status = response.status;
          const result = await response.json();

          if(status >= 400) {
            console.log(result);
            throw Error(`error in skill_`);
          }
          else{
            console.log(`Successfully added skill_`);
          }
        
      }

      onSubmit = async(event) =>{
        event.preventDefault();
        await this.setDate();
        try {
          const response = await fetch('/api/query', {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: 'POST',
              body: JSON.stringify(this.state)
            });
        
          const status = response.status;   
          const result = await response.json();
    
          if (status === 400 || status === 500) {
            alert(result.error);
          } else {
            console.log(result.status_info);
          }
        } catch (error) {
          console.log(error);
        }
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
                  <button onClick={this.refreshPage}>Submit</button>
              </form>
              <Link to = "/all_queries"><button>Cancel</button></Link>
            </div>
        </div>
      )
   }
}

export default NewQueries;